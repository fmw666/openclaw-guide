<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const hasMeta = computed(() => {
  return (
    frontmatter.value.author ||
    frontmatter.value.tags?.length ||
    frontmatter.value.updated
  )
})
</script>

<template>
  <div v-if="hasMeta" class="article-meta">
    <div v-if="frontmatter.author" class="meta-item">
      <span class="label">作者</span>
      <span class="value">{{ frontmatter.author }}</span>
    </div>
    <div v-if="frontmatter.updated" class="meta-item">
      <span class="label">更新</span>
      <span class="value">{{ frontmatter.updated }}</span>
    </div>
    <div v-if="frontmatter.tags?.length" class="meta-item">
      <span class="label">标签</span>
      <div class="tags-wrapper">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-meta {
  margin-bottom: 1.5rem;
  padding: 0.8rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  font-size: 0.82em;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.value {
  color: var(--vp-c-text-1);
  font-weight: 500;
  white-space: nowrap;
}

.tags-wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.tags-wrapper::-webkit-scrollbar { display: none; }

.tag {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
