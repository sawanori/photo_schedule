import { supabase } from './supabase'
import { PhotoShootEvent } from '@/types/event'

export const api = {
  // イベントの取得（カレンダー表示用）
  async fetchEvents(): Promise<PhotoShootEvent[]> {
    const { data, error } = await supabase
      .from('photo_shoot_events')
      .select(`
        *,
        photographers!fk_photographer (
          id,
          name,
          email,
          phone
        )
      `)
      .order('shooting_date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
    return data || [];
  },

  // イベントの作成
  async createEvent(event: Partial<PhotoShootEvent>) {
    const { data, error } = await supabase
      .from('photo_shoot_events')
      .insert([event])
      .select(`
        *,
        photographers!fk_photographer (
          id,
          name,
          email,
          phone
        )
      `);
    
    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }
    return data[0];
  },

  // イベントの更新
  async updateEvent(id: string, event: Partial<PhotoShootEvent>) {
    console.log('API received update data:', event); // デバッグログ
    
    // 送信データから start と end を除外
    const { start, end, ...updateData } = event as any;
    
    try {
      const { data, error } = await supabase
        .from('photo_shoot_events')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          photographers!fk_photographer (
            id,
            name,
            email,
            phone
          )
        `);
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Update successful:', data); // デバッグログ
      return data[0];
    } catch (error) {
      console.error('Error in updateEvent:', error);
      throw error;
    }
  },

  // イベントの削除
  async deleteEvent(id: string) {
    const { error } = await supabase
      .from('photo_shoot_events')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}