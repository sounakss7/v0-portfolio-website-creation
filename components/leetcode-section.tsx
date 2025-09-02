import Link from "next/link"

export default function LeetCodeSection() {
  const username = "sounakss7"
  // Reliable dynamic image; no API keys needed
  const leetCardUrl = `https://leetcard.jacoblin.cool/${username}?ext=heatmap&border=0&radius=12`

  return (
    <section id="leetcode" aria-labelledby="leetcode-title" className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 id="leetcode-title" className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">
              LeetCode Progress
            </h2>
            <Link
              href="https://leetcode.com/u/sounakss7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
              aria-label="Open Sounak's LeetCode profile in a new tab"
            >
              View Profile
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={leetCardUrl || "/placeholder.svg"}
              alt="LeetCode stats card for user sounakss7 showing solved problems and activity heatmap"
              className="w-full"
              loading="lazy"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Stats update automatically. If the card does not load, refresh the page or visit your LeetCode profile.
          </p>
        </div>
      </div>
    </section>
  )
}
