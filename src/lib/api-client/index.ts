import { AiTool } from '@/types/type';
import { Training, Lesson } from '@/types/training';
import { ToolFilter, PaginatedResponse } from '../schemas/tool.schema';
import { TrainingFilter, PaginatedResponse as TrainingPaginatedResponse } from '../schemas/training.schema';
import { ApiResponse } from '../schemas/api.schema';
import mockToolsData from '@/bd/mock-tools.json';
import { ToolFilter, PaginatedResponse } from '../schemas/tool.schema';
import { TrainingFilter, PaginatedResponse as TrainingPaginatedResponse } from '../schemas/training.schema';
import { ApiResponse } from '../schemas/api.schema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || 'Une erreur est survenue');
    }

    return data.data as T;
  }

  /**
   * Récupère tous les outils avec filtres
   */
  async getTools(filters?: Partial<ToolFilter>): Promise<PaginatedResponse<AiTool>> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.categories) params.append('categories', filters.categories.join(','));
    if (filters?.pricing) params.append('pricing', filters.pricing.join(','));
    if (filters?.is_featured !== undefined) params.append('is_featured', String(filters.is_featured));
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.sort_by) params.append('sort_by', filters.sort_by);
    if (filters?.sort_order) params.append('sort_order', filters.sort_order);

    const queryString = params.toString();
    const endpoint = `/tools${queryString ? `?${queryString}` : ''}`;

    return this.request<PaginatedResponse<AiTool>>(endpoint);
  }

  /**
   * Récupère les outils en vedette
   */
  async getFeaturedTools(limit: number = 4): Promise<AiTool[]> {
    return this.request<AiTool[]>(`/tools/featured?limit=${limit}`);
  }

  /**
   * Récupère les derniers outils
   */
  async getLatestTools(limit: number = 8): Promise<AiTool[]> {
    return this.request<AiTool[]>(`/tools/latest?limit=${limit}`);
  }

  /**
   * Récupère un outil par son ID ou slug
   */
  async getToolById(id: string): Promise<AiTool> {
    const tool = (mockToolsData as any[]).find(t => t.id === id);
    if (!tool) throw new Error("Outil introuvable");
    return this.mapMockToDetail(tool);
  }

  /**
   * Récupère un outil par son slug
   */
  async getToolBySlug(slug: string): Promise<AiTool> {
    const tool = (mockToolsData as any[]).find(t => t.slug === slug);
    if (!tool) throw new Error("Outil introuvable");
    return this.mapMockToDetail(tool);
  }

  private mapMockToDetail(tool: any): any {
    return {
      ...tool,
      tagline: tool.tagline || "L'outil IA indispensable pour votre entreprise.",
      description_long: tool.description_long || `${tool.description_short} Découvrez comment ${tool.name} peut transformer votre workflow grâce à ses fonctionnalités d'intelligence artificielle de pointe. Rejoignez des milliers d'utilisateurs satisfaits.`,
      ban_url: tool.ban_url || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
      website_url: tool.website_url || "https://example.com",
      pricing: tool.pricing_type || "Freemium",
      rating: tool.rating || +(Math.random() * 1.5 + 3.5).toFixed(1),
      views: Math.floor(Math.random() * 5000) + 500,
      upvotes: Math.floor(Math.random() * 2000) + 100,
      verified: true,
      highlights: ["Accès immédiat", "Support prioritaire", "Mises à jour régulières", "Communauté active"],
      features: [
        { title: "Interface intuitive", desc: "Une prise en main rapide et simplifiée pour tous." },
        { title: "Performance optimale", desc: "Des temps de réponse ultra rapides." },
        { title: "Sécurité maximale", desc: "Vos données sont cryptées et protégées." }
      ],
      use_cases: [
        { title: "Pour les indépendants", desc: "Gagnez un temps précieux au quotidien." },
        { title: "Pour les équipes", desc: "Collaborez facilement sur vos projets." }
      ],
      benefits: ["Support 24/7", "Export illimité", "Accès API", "Formation incluse"],
      pricing_details: { priceMonthly: "29€", priceDetails: "Facturé annuellement" },
      stats: { users: "10k+", reviews: 150, uptime: "99.9%", accuracy: "98%" }
    };
  }

  // ==================== TRAININGS ====================

  /**
   * Récupère toutes les formations avec filtres
   */
  async getTrainings(filters?: Partial<TrainingFilter>): Promise<TrainingPaginatedResponse<Training>> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.language) params.append('language', filters.language);
    if (filters?.price) params.append('price', filters.price);
    if (filters?.is_featured !== undefined) params.append('is_featured', String(filters.is_featured));
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.sort_by) params.append('sort_by', filters.sort_by);
    if (filters?.sort_order) params.append('sort_order', filters.sort_order);

    const queryString = params.toString();
    const endpoint = `/trainings${queryString ? `?${queryString}` : ''}`;

    return this.request<TrainingPaginatedResponse<Training>>(endpoint);
  }

  /**
   * Récupère les formations en vedette
   */
  async getFeaturedTrainings(limit: number = 4): Promise<Training[]> {
    return this.request<Training[]>(`/trainings/featured?limit=${limit}`);
  }

  /**
   * Récupère les dernières formations
   */
  async getLatestTrainings(limit: number = 8): Promise<Training[]> {
    return this.request<Training[]>(`/trainings/latest?limit=${limit}`);
  }

  /**
   * Récupère une formation par son ID
   */
  async getTrainingById(id: string): Promise<Training> {
    return this.request<Training>(`/trainings/${id}`);
  }

  /**
   * Récupère les leçons d'une formation
   */
  async getTrainingLessons(trainingId: string): Promise<Lesson[]> {
    return this.request<Lesson[]>(`/trainings/${trainingId}/lessons`);
  }

  /**
   * Récupère une leçon spécifique
   */
  async getLessonById(trainingId: string, lessonId: string): Promise<Lesson> {
    return this.request<Lesson>(`/trainings/${trainingId}/lessons/${lessonId}`);
  }
}

// Export d'une instance singleton
export const apiClient = new ApiClient();
