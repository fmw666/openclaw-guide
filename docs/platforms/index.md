# 平台文档索引 (Platform Index)

这里汇集了所有已标记支持平台的文档。您可以根据您正在使用的聊天平台快速查找相关指南。

<script setup>
import { data as posts } from '../platforms.data.ts'
</script>

<div class="platforms-container">
  <div v-for="(list, platform) in posts" :key="platform" class="platform-section">
    <h2 :id="platform">{{ platform }}</h2>
    <ul>
      <li v-for="post in list" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <span class="meta">
          <span class="author" v-if="post.author">@{{ post.author }}</span>
          <span class="date">{{ post.date.string }}</span>
        </span>
      </li>
    </ul>
  </div>
</div>

<style>
.platforms-container {
  margin-top: 2rem;
}
.platform-section {
  margin-bottom: 2.5rem;
}
.platform-section h2 {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}
.meta {
  float: right;
  font-size: 0.85em;
  font-family: monospace;
}
.author {
  color: var(--vp-c-brand);
  margin-right: 1rem;
  font-weight: 500;
}
.date {
  color: var(--vp-c-text-2);
}
@media (max-width: 640px) {
  .meta {
    float: none;
    display: block;
    margin-top: 0.2rem;
  }
}
</style>
