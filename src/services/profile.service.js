import { supabase } from '../lib/supabase';

export const profileService = {
  /**
   * Fetch user profile from public.profiles
   * @param {string} userId - Auth user ID
   */
  async getCurrentProfile(userId) {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Failed to get current profile:', err);
      return null;
    }
  },

  /**
   * Update current user profile
   * @param {string} userId - Auth user ID derived from session
   * @param {{ full_name?: string, preferred_language?: string }} updates
   */
  async updateCurrentProfile(userId, updates) {
    if (!userId) return { success: false, error: 'User ID is required' };

    const payload = {};
    if (updates.full_name !== undefined) payload.full_name = updates.full_name;
    if (updates.preferred_language !== undefined) {
      // Validate language code
      if (['en', 'hi', 'mr'].includes(updates.preferred_language)) {
        payload.preferred_language = updates.preferred_language;
      }
    }
    payload.updated_at = new Date().toISOString();

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, profile: data };
    } catch (err) {
      return { success: false, error: 'Failed to update profile.' };
    }
  },

  /**
   * Safe manual create/upsert profile fallback if trigger hasn't fired
   * @param {{ id: string, full_name?: string, preferred_language?: string }} profileData
   */
  async ensureProfile(profileData) {
    if (!profileData || !profileData.id) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: profileData.id,
            full_name: profileData.full_name || '',
            preferred_language: profileData.preferred_language || 'en',
            updated_at: new Date().toISOString()
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (error) {
        console.warn('Profile upsert info:', error.message);
      }
      return data;
    } catch (err) {
      console.error('Ensure profile failed:', err);
      return null;
    }
  }
};
