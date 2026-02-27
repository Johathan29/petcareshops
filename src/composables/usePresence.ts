import { supabase } from '../config/supabase'

export const usePresence = () => {

  let heartbeat: any = null

  const start = async (userId: string) => {

    await supabase.from('profiles').update({
      is_online: true,
      last_seen: new Date().toISOString()
    }).eq('id', userId)

    heartbeat = setInterval(async () => {
      await supabase.from('profiles').update({
        last_seen: new Date().toISOString()
      }).eq('id', userId)
    }, 30000)
  }

  const stop = async (userId: string) => {
    clearInterval(heartbeat)

    await supabase.from('profiles').update({
      is_online: false,
      last_seen: new Date().toISOString()
    }).eq('id', userId)
  }

  return { start, stop }
}