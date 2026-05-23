import { AiTool } from '@/types/type';
import { ToolRepository } from '@/lib/repositories/tool.repository';
import { CreateToolInput, UpdateToolInput, ToolFilter, PaginatedResponse } from '@/lib/schemas/tool.schema';

export class ToolService {
  private repository: ToolRepository;

  constructor() {
    this.repository = new ToolRepository();
  }

  /**
   * Récupère tous les outils avec filtres et pagination
   */
  async getTools(filters?: ToolFilter): Promise<PaginatedResponse<AiTool>> {
    const { data, total } = await this.repository.findAll(filters);
    
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Récupère un outil par son ID
   */
  async getToolById(id: string): Promise<AiTool> {
    const tool = await this.repository.findById(id);
    
    if (!tool) {
      throw new Error('Outil non trouvé');
    }

    return tool;
  }

  /**
   * Récupère un outil par son slug
   */
  async getToolBySlug(slug: string): Promise<AiTool> {
    const tool = await this.repository.findBySlug(slug);
    
    if (!tool) {
      throw new Error('Outil non trouvé');
    }

    return tool;
  }

  /**
   * Récupère les outils en vedette
   */
  async getFeaturedTools(limit: number = 4): Promise<AiTool[]> {
    return this.repository.findFeatured(limit);
  }

  /**
   * Récupère les derniers outils ajoutés
   */
  async getLatestTools(limit: number = 8): Promise<AiTool[]> {
    return this.repository.findLatest(limit);
  }

  /**
   * Récupère les outils similaires basés sur les catégories
   */
  async getRelatedTools(toolId: string, limit: number = 6): Promise<AiTool[]> {
    const tool = await this.getToolById(toolId);
    
    if (!tool.categories || tool.categories.length === 0) {
      return this.getFeaturedTools(limit);
    }

    return this.repository.findRelatedByCategories(tool.categories, toolId, limit);
  }

  /**
   * Calcule le score de popularité d'un outil
   * Business Logic: Algorithme de scoring
   */
  calculatePopularityScore(tool: AiTool): number {
    // Exemple d'algorithme métier
    let score = 0;
    
    if (tool.is_featured) score += 50;
    if (tool.pricing === 'Gratuit') score += 20;
    if (tool.description_long) score += 10;
    if (tool.logo_url) score += 5;
    if (tool.ban_url) score += 5;
    
    return score;
  }

  /**
   * Vérifie si un outil est populaire
   * Business Logic: Règle métier de popularité
   */
  isPopular(tool: AiTool): boolean {
    const score = this.calculatePopularityScore(tool);
    return score >= 50 && tool.is_featured === true;
  }

  /**
   * Crée un nouvel outil
   * Business Logic: Validation et règles métier
   */
  async createTool(input: CreateToolInput): Promise<AiTool> {
    // Règle métier: Vérifier que le slug n'existe pas déjà
    const exists = await this.repository.exists(input.slug);
    if (exists) {
      throw new Error('Un outil avec ce slug existe déjà');
    }

    // Règle métier: Générer un slug si non fourni
    if (!input.slug) {
      input.slug = this.generateSlug(input.name);
    }

    // Règle métier: Les nouveaux outils ne sont pas en vedette par défaut
    const toolData = {
      ...input,
      is_featured: false,
    };

    return this.repository.create(toolData);
  }

  /**
   * Met à jour un outil existant
   */
  async updateTool(id: string, input: UpdateToolInput): Promise<AiTool> {
    // Vérifier que l'outil existe
    await this.getToolById(id);

    // Si le slug change, vérifier qu'il n'existe pas déjà
    if (input.slug) {
      const tool = await this.repository.findById(id);
      if (tool && tool.slug !== input.slug) {
        const exists = await this.repository.exists(input.slug);
        if (exists) {
          throw new Error('Un outil avec ce slug existe déjà');
        }
      }
    }

    return this.repository.update(id, input);
  }

  /**
   * Supprime un outil
   */
  async deleteTool(id: string): Promise<void> {
    // Vérifier que l'outil existe
    await this.getToolById(id);
    
    return this.repository.delete(id);
  }

  /**
   * Génère un slug à partir d'un nom
   * Utilitaire métier
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Valide si un outil peut être mis en vedette
   * Business Logic: Règles de mise en vedette
   */
  canBeFeatured(tool: AiTool): boolean {
    return !!(
      tool.name &&
      tool.description_short &&
      tool.description_long &&
      tool.logo_url &&
      tool.website_url &&
      tool.categories &&
      tool.categories.length > 0
    );
  }
}
