import { AiTool } from '@/types/type';
import { Training, Lesson } from '@/types/training';
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
    return this.request<AiTool>(`/tools/${id}`);
  }

  /**
   * Récupère un outil par son slug
   */
  async getToolBySlug(slug: string): Promise<AiTool> {
    return this.request<AiTool>(`/tools/${slug}`);
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
