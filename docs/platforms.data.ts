import { createContentLoader } from 'vitepress'

interface Post {
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
  transform(raw): Record<string, Post[]> {
    const platformMap: Record<string, Post[]> = {}

    // 1. Traverse all found Markdown files
    raw.forEach(({ url, frontmatter }) => {
      // 2. Check if platforms field exists and is an array
      if (frontmatter.platforms && Array.isArray(frontmatter.platforms)) {
        const platforms = frontmatter.platforms as string[]

        const post: Post = {
          title: frontmatter.title,
          url,
          date: formatDate(frontmatter.date),
          author: frontmatter.author
        }

        // 3. Classify articles into corresponding platform arrays
        platforms.forEach((platform: string) => {
          if (!platformMap[platform]) {
            platformMap[platform] = []
          }
          platformMap[platform].push(post)
        })
      }
    })

    // 4. Sort articles by date within each platform
    for (const platform in platformMap) {
      platformMap[platform].sort((a, b) => b.date.time - a.date.time)
    }

    return platformMap
  }
})

function formatDate(raw: string | number | Date | undefined): { time: number; string: string } {
  const date = raw ? new Date(raw) : new Date()
  if (isNaN(date.getTime())) {
    return { time: 0, string: 'Unknown Date' }
  }
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
