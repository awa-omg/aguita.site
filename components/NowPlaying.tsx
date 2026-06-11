"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Play, ExternalLink } from "lucide-react"
import { getNowPlaying, subscribeToNowPlaying, NowPlaying } from "@/lib/supabase"

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getNowPlaying()
      setNowPlaying(data)
    }

    fetchInitial()

    const unsubscribe = subscribeToNowPlaying((data) => {
      setNowPlaying(data)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!nowPlaying || !nowPlaying.duration) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= nowPlaying.duration!) {
          return 0
        }
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [nowPlaying])

  if (!nowPlaying) {
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed bottom-24 right-6 z-40 w-[320px] glass rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Cover image */}
        {nowPlaying.cover_base64 && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${nowPlaying.cover_base64}`}
              alt={`${nowPlaying.title} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" />
            {nowPlaying.is_playing && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-[#0d1117]/80 rounded-full">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-white font-medium">LIVE</span>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {!nowPlaying.cover_base64 && (
              <div className="w-12 h-12 rounded bg-[#21262d] flex items-center justify-center flex-shrink-0">
                <Music className="w-6 h-6 text-[#8b949e]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#e6edf3] truncate">
                {nowPlaying.title}
              </h3>
              <p className="text-xs text-[#8b949e] truncate">{nowPlaying.artist}</p>
              {nowPlaying.album && (
                <p className="text-xs text-[#6e7681] truncate">{nowPlaying.album}</p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {nowPlaying.duration && (
            <div className="mt-3">
              <div className="w-full h-1 bg-[#21262d] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#388bfd] to-[#00d4ff]"
                  animate={{ width: `${(progress / nowPlaying.duration!) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#8b949e] mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(nowPlaying.duration)}</span>
              </div>
            </div>
          )}

          {/* Listen on YouTube Music */}
          {nowPlaying.listen_url && (
            <motion.a
              href={nowPlaying.listen_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-sm text-[#e6edf3] transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Listen on YouTube Music</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
