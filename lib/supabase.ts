const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fpnndflqpwgxbhjbtaas.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbm5kZmxxcHdneGJoamJ0YWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjcxOTgsImV4cCI6MjA5NjcwMzE5OH0.JRBKlUBdYQBCNGCaEy5pO0836AU54zY_Y5t7GtiW4g8"

export interface NowPlaying {
  id: string
  title: string
  artist: string
  album: string | null
  duration: number | null
  position: number | null
  cover_base64: string | null
  is_playing: boolean
  timestamp: string
  listen_url: string | null
  updated_at: string
}

let supabaseClient: any = null

async function getSupabase() {
  if (supabaseClient) return supabaseClient
  
  try {
    const { createClient } = await import("@supabase/supabase-js")
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseClient
  } catch (e) {
    console.error("Supabase not available:", e)
    return null
  }
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
  const supabase = await getSupabase()
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from("now_playing")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching now playing:", error)
      return null
    }

    return data
  } catch (e) {
    console.error("Error in getNowPlaying:", e)
    return null
  }
}

export function subscribeToNowPlaying(callback: (data: NowPlaying | null) => void) {
  let channel: any = null

  const init = async () => {
    const supabase = await getSupabase()
    if (!supabase) return

    channel = supabase
      .channel("now_playing_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "now_playing" }, (payload: any) => {
        callback(payload.new as NowPlaying)
      })
      .subscribe()
  }

  init()

  return () => {
    if (channel && supabaseClient) {
      supabaseClient.removeChannel(channel)
    }
  }
}
