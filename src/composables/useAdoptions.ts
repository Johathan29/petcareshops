import { ref } from 'vue'
import { supabase } from '../config/supabase'

export function useAdoptions() {
  const adoptions = ref([''])
  const loading = ref(false)

  const fetchAdoptions = async () => {
    loading.value = true

    const { data, error } = await supabase
      .from('adoption')
      .select(`
        *,
        profiles ( full_name, email )
      `)
      .order('created_at', { ascending: false })

    if (!error) adoptions.value = data

    loading.value = false
  }

  const createAdoption = async (payload:any) => {
    return await supabase.from('adoptions').insert(payload)
  }

  const updateAdoption = async (id:string, payload:any) => {
    return await supabase
      .from('adoptions')
      .update(payload)
      .eq('id', id)
  }

  const deleteAdoption = async (id:string) => {
    return await supabase
      .from('adoptions')
      .delete()
      .eq('id', id)
  }

  return {
    adoptions,
    loading,
    fetchAdoptions,
    createAdoption,
    updateAdoption,
    deleteAdoption
  }
}
