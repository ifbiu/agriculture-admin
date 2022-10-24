<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录：{{ username }}</div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState([
      'username'
    ]),
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
