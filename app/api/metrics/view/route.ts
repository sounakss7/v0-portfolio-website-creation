export const dynamic = "force-dynamic"

const NAMESPACE = "sounakss7-portfolio"
const KEY = "views-total"

async function countapi(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.countapi.xyz${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })
  return res
}

export async function POST() {
  try {
    // increment total views
    const res = await countapi(`/hit/${NAMESPACE}/${KEY}`, { method: "GET" })
    if (!res.ok) {
      const text = await res.text()
      return new Response(JSON.stringify({ error: `CountAPI hit failed: ${res.status} ${text}` }), { status: 500 })
    }
    const data = (await res.json()) as { value?: number }
    return new Response(JSON.stringify({ value: data?.value ?? 0 }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "CountAPI error" }), { status: 500 })
  }
}

export async function GET() {
  try {
    // get current value (if 404/missing, treat as 0)
    const res = await countapi(`/get/${NAMESPACE}/${KEY}`, { method: "GET" })
    if (res.status === 404) {
      return new Response(JSON.stringify({ value: 0 }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      })
    }
    if (!res.ok) {
      const text = await res.text()
      return new Response(JSON.stringify({ error: `CountAPI get failed: ${res.status} ${text}` }), { status: 500 })
    }
    const data = (await res.json()) as { value?: number }
    return new Response(JSON.stringify({ value: data?.value ?? 0 }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ value: 0 }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    })
  }
}
