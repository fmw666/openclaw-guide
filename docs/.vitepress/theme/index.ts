import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from './ArticleMetadata.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleMetadata', ArticleMetadata)
  }
}
