<template>
  <div>
    <h1>征集订单详情</h1>
    <service-detail :used="true" state="正在查看中"></service-detail>
  </div>
</template>
<script>
  import serviceDetail from '../../../service/buy-service.vue'
  import areaTitle from 'components/area-title.vue'

  export default {
    components: {
      serviceDetail,
    },
  }
</script>