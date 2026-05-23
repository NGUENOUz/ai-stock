import { Training, Lesson } from '@/types/training';
import { TrainingRepository } from '@/lib/repositories/training.repository';
import { 
  CreateTrainingInput, 
  UpdateTrainingInput, 
  TrainingFilter, 
  PaginatedResponse 
} from '@/lib/schemas/training.schema';

export class TrainingService {
  private repository: TrainingRepository;

  constructor() {
    this.repository = new TrainingRepository();
  }

  /**
   * Récupère toutes les formations avec filtres et pagination
   */
  async getTrainings(filters?: TrainingFilter): Promise<PaginatedResponse<Training>> {
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
   * Récupère une formation par son ID
   */
  async getTrainingById(id: string): Promise<Training> {
    const training = await this.repository.findById(id);
    
    if (!training) {
      throw new Error('Formation non trouvée');
    }

    return training;
  }

  /**
   * Récupère une formation par son slug
   */
  async getTrainingBySlug(slug: string): Promise<Training> {
    const training = await this.repository.findBySlug(slug);
    
    if (!training) {
      throw new Error('Formation non trouvée');
    }

    return training;
  }

  /**
   * Récupère les formations en vedette
   */
  async getFeaturedTrainings(limit: number = 4): Promise<Training[]> {
    return this.repository.findFeatured(limit);
  }

  /**
   * Récupère les dernières formations ajoutées
   */
  async getLatestTrainings(limit: number = 8): Promise<Training[]> {
    return this.repository.findLatest(limit);
  }

  /**
   * Récupère les leçons d'une formation
   */
  async getTrainingLessons(trainingId: string): Promise<Lesson[]> {
    // Vérifier que la formation existe
    await this.getTrainingById(trainingId);
    
    return this.repository.findLessonsByTrainingId(trainingId);
  }

  /**
   * Récupère une leçon spécifique
   */
  async getLessonById(lessonId: string): Promise<Lesson> {
    const lesson = await this.repository.findLessonById(lessonId);
    
    if (!lesson) {
      throw new Error('Leçon non trouvée');
    }

    return lesson;
  }

  /**
   * Vérifie si l'utilisateur a accès à une formation
   * Business Logic: Règles d'accès
   */
  hasAccess(training: Training, isLoggedIn: boolean, isPremiumUser: boolean): boolean {
    // Formation gratuite + connecté = accès
    if (!training.isPremium && isLoggedIn) {
      return true;
    }
    
    // Formation premium + utilisateur premium = accès
    if (training.isPremium && isPremiumUser) {
      return true;
    }
    
    return false;
  }

  /**
   * Vérifie si l'utilisateur peut voir une leçon
   * Business Logic: Règles d'accès aux leçons
   */
  canViewLesson(lesson: Lesson, hasFullAccess: boolean): boolean {
    return hasFullAccess || lesson.isFreePreview;
  }

  /**
   * Calcule la durée totale formatée
   * Business Logic: Formatage
   */
  formatDuration(durationMinutes: number): string {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  /**
   * Calcule le prix d'affichage
   * Business Logic: Formatage prix
   */
  formatPrice(price: number): string {
    return price === 0 ? 'Gratuit' : `${price} €`;
  }

  /**
   * Crée une nouvelle formation
   * Business Logic: Validation et règles métier
   */
  async createTraining(input: CreateTrainingInput): Promise<Training> {
    // Règle métier: Vérifier que le slug n'existe pas déjà
    if (input.slug) {
      const exists = await this.repository.exists(input.slug);
      if (exists) {
        throw new Error('Une formation avec ce slug existe déjà');
      }
    }

    // Règle métier: Générer un slug si non fourni
    const slug = input.slug || this.generateSlug(input.title);

    const trainingData = {
      ...input,
      slug,
      is_featured: false,
    };

    return this.repository.create(trainingData);
  }

  /**
   * Met à jour une formation existante
   */
  async updateTraining(id: string, input: UpdateTrainingInput): Promise<Training> {
    // Vérifier que la formation existe
    await this.getTrainingById(id);

    // Si le slug change, vérifier qu'il n'existe pas déjà
    if (input.slug) {
      const training = await this.repository.findById(id);
      if (training && training.slug !== input.slug) {
        const exists = await this.repository.exists(input.slug);
        if (exists) {
          throw new Error('Une formation avec ce slug existe déjà');
        }
      }
    }

    return this.repository.update(id, input);
  }

  /**
   * Supprime une formation
   */
  async deleteTraining(id: string): Promise<void> {
    // Vérifier que la formation existe
    await this.getTrainingById(id);
    
    return this.repository.delete(id);
  }

  /**
   * Génère un slug à partir d'un titre
   * Utilitaire métier
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Valide si une formation peut être mise en vedette
   * Business Logic: Règles de mise en vedette
   */
  canBeFeatured(training: Training): boolean {
    return !!(
      training.title &&
      training.shortDescription &&
      training.longDescription &&
      training.imageUrl &&
      training.instructor &&
      training.lessons &&
      training.lessons.length > 0
    );
  }
}
