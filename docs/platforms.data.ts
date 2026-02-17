import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  author?: string
}

declare const data: Record<string, Post[]>
export { data }

export default createContentLoader('**/*.md', {
  includeSrc: false, // Explicitly disable src loading for performance
  transform(raw): Record<string, Post[]> {
    const platformMap: Record<string, Post[]> = {}

    raw.forEach(({ url, frontmatter }) => {
      // 1. Skip if no platforms defined or not an array
      if (!frontmatter.platforms || !Array.isArray(frontmatter.platforms)) {
        return
      }

      const platforms = frontmatter.platforms as string[]

      // 2. Safely parse date
      const date = parseDate(frontmatter.date)

      const post: Post = {
        title: frontmatter.title || 'Untitled',
        url,
        date,
        author: frontmatter.author
      }

      // 3. Add to map
      platforms.forEach((platform: string) => {
        if (!platformMap[platform]) {
          platformMap[platform] = []
        }
        platformMap[platform].push(post)
      })
    })

    // 4. Sort
    for (const platform in platformMap) {
      platformMap[platform].sort((a, b) => b.date.time - a.date.time)
    }

    return platformMap
  }
})

function parseDate(raw: any): { time: number; string: string } {
  // If raw is already a Date object (VitePress does this for YYYY-MM-DD in YAML)
  const date = raw instanceof Date ? raw : new Date(raw || Date.now())
  
  // Invalid date check
  if (isNaN(date.getTime())) {
    return { 
      time: 0, 
      string: 'Unknown Date' 
    }
  }

  // Use UTC to avoid timezone shifts affecting the date string
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }
}
