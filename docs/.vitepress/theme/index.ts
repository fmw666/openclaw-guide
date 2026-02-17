import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from './ArticleMetadata.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ArticleMetadata)
    })
  }
}
