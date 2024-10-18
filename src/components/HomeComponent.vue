<template>
  <a-space>

    <ConfigComponent/>
  </a-space>

</template>
<script setup>
import {ref} from "vue";
import ConfigComponent from "./ConfigComponent.vue";

const hasConfig = ref(false)

</script>
<style scoped>

</style>