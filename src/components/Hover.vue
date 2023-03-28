<template>
  <div class="hover" v-if="hover"></div>
</template>

<script lang="ts" setup>
defineProps({
  hover:{
    type:Boolean,
    default:false,
    required: true
  }
})
</script>

<style scoped>
.hover {
  position: fixed;
  z-index: 110;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
}

</style>