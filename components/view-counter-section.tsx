"use client"

import { useEffect, useRef } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

export default function ViewCounterSection() {
  const hasCountedRef = useRef(false)

  // one-time increment per browser (simple dedupe using localStorage)
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const key = "portfolio_viewed_v1"
      const already = localStorage.getItem(key)
      if (!already && !hasCountedRef.current) {
        hasCountedRef.current = true
        fetch("/api/metrics/view", { method: "POST" })
          .then(() => {
            localStorage.setItem(key, String(Date.now()))
          })
          .catch(() => {
            // ignore network errors
          })
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  // live updates (near real-time) using polling
  const { data, error, isLoading } = useSWR<{ value: number }>("/api/metrics/view", fetcher, {
    refreshInterval: 3000, // 3s polling for near real-time
    revalidateOnFocus: true,
  })

  const value = data?.value ?? 0

  return (
    <section id="views" className="w-full py-10">
      <div className="mx-auto max-w-3xl px-4">
        <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/70 border-border">
          <CardHeader>
            <CardTitle className="text-balance">Live Visitors</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total views</span>
              <span className="text-4xl font-semibold tracking-tight">{value.toLocaleString()}</span>
            </div>
            <div className="text-sm">
              {isLoading ? (
                <span className="text-muted-foreground">Loading…</span>
              ) : error ? (
                <span className="text-destructive">Unavailable</span>
              ) : (
                <span className="text-muted-foreground">Updates every 3s</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
