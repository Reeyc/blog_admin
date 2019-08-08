<!--路由刷新中转站-->
<template>
  <div></div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 立马返回，不保留history
      vm.$router.replace(from.path);
    });
  }
};
</script>