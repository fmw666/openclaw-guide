<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const hasMeta = computed(() => {
  return frontmatter.value.author || (frontmatter.value.platforms && frontmatter.value.platforms.length)
})
</script>

<template>
  <div v-if="hasMeta" class="article-meta">
    <div v-if="frontmatter.author" class="meta-item">
      <span class="label">👤 Author:</span>
      <span class="value">{{ frontmatter.author }}</span>
    </div>
    <div v-if="frontmatter.platforms" class="meta-item">
      <span class="label">🏷️ Platforms:</span>
      <span class="tags">
        <span v-for="platform in frontmatter.platforms" :key="platform" class="tag">{{ platform }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.article-meta {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  margin-right: 0.8rem;
  color: var(--vp-c-text-2);
  min-width: 80px;
}

.value {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-family: var(--vp-font-family-mono);
}
</style>
