<template>
<HomeComponent/>
</template>
<script setup>
import HomeComponent from "./components/HomeComponent.vue";
import {onMounted} from "vue";

function setTheme() {
  const isDark = window.api.platform.isDarkMode()
  if (isDark) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme');
  }
}

onMounted(() => {
  setTheme();
  window.api.platform.registerDarkModeListener(() => {
    setTheme()
  })
})
</script>

<style scoped>

</style>
