
<template>
  <a-modal v-if="visible"
           visible="visible"
           ok-text="已知晓"
           cancel-text="退出"
           :esc-to-close="false"
           :unmount-on-close="true"
           :mask-closable="false"
           :closable="false"
           @ok="accept"
           @cancel="reject">
    <template #title>
      使用须知
    </template>
    插件代码完全开源，使用本插件时，用户数据仅会保存到uTools，不会上传到任何服务器。
    使用本插件造成的任何后果，本插件概不负责。
  </a-modal>
</template>
<script setup>
import {ref} from "vue";

const visible = ref(!window.api.storage.get('useTips'))
function accept(){
    visible.value = false
    window.api.storage.set('useTips', true)
}

function reject(){
  window.api.plugins.exitPlugin()
}

</script>
<style scoped>

</style>