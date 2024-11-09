import { supabase } from './supabase'

export const storage = {
  async uploadFile(file: File, eventId: string) {
    const filePath = `${eventId}/${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('attachments')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { error: dbError } = await supabase
      .from('attachments')
      .insert({
        event_id: eventId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size
      })

    if (dbError) throw dbError
    return filePath
  },

  getFileUrl(filePath: string) {
    return supabase.storage
      .from('attachments')
      .getPublicUrl(filePath)
      .data.publicUrl
  }
}
