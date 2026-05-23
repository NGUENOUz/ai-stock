import { supabase } from '../supabase/supabaseClient';
import { AiTool } from '@/types/type';
import { ToolFilter } from '../schemas/tool.schema';

export class ToolRepository {
  private tableName = 'ai_tools';

  async findAll(filters?: ToolFilter): Promise<{ data: AiTool[]; total: number }> {
    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact' });

    // Filtres de recherche
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description_short.ilike.%${filters.search}%`);
    }

    if (filters?.categories && filters.categories.length > 0) {
      query = query.overlaps('categories', filters.categories);
    }

    if (filters?.pricing && filters.pricing.length > 0) {
      query = query.in('pricing', filters.pricing);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    // Tri
    const sortBy = filters?.sort_by || 'created_at';
    const sortOrder = filters?.sort_order === 'asc' ? { ascending: true } : { ascending: false };
    query = query.order(sortBy, sortOrder);

    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as AiTool[],
      total: count || 0,
    };
  }

  async findById(id: string): Promise<AiTool | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as AiTool | null;
  }

  async findBySlug(slug: string): Promise<AiTool | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as AiTool | null;
  }

  async findFeatured(limit: number = 4): Promise<AiTool[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as AiTool[];
  }

  async findLatest(limit: number = 8): Promise<AiTool[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as AiTool[];
  }

  async findRelatedByCategories(
    categories: string[],
    excludeId: string,
    limit: number = 6
  ): Promise<AiTool[]> {
    if (!categories || categories.length === 0) {
      return this.findFeatured(limit);
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .overlaps('categories', categories)
      .neq('id', excludeId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as AiTool[];
  }

  async create(tool: Partial<AiTool>): Promise<AiTool> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(tool)
      .select()
      .single();

    if (error) throw error;
    return data as AiTool;
  }

  async update(id: string, tool: Partial<AiTool>): Promise<AiTool> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(tool)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as AiTool;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async exists(slug: string): Promise<boolean> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('id')
      .eq('slug', slug)
      .single();

    return !error && data !== null;
  }
}
