<template>
  <article id="pagination">
    <card-lable lablename="Pagination" lablelink="https://templates.Aland Mariwan/hope-ui/documentation/vue/dist/Pagation"></card-lable>
    <section-components preview-component="pagination-preview" codeComponent="pagination-code" targetpreview="pagination-preview" targetcode="pagination-code"></section-components>
  </article>
</template>
<script>
import SectionComponents from '../../components/SectionComponents.vue'
import CardLable from '../../components/CardLable.vue'
import { onMounted } from 'vue'
const prism = () => import('@/plugins/prism.mini.js')

export default {
  components: {
    SectionComponents,
    CardLable
  },
  setup() {
    onMounted(() => {
      prism()
    })
  }
}
</script>
