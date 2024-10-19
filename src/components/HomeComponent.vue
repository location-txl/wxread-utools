<template>

  <use-tips-component/>
  <a-space direction="vertical">
    <a-space size="large">
      <a-link @click="openUrl('https://www.yuque.com/location/hmoqs0/pz510d0d1ak19hsd')">文档</a-link>
      <icon-github @click="openUrl('https://github.com/location-txl/wxread-utools')"/>
    </a-space>
    <a-typography-paragraph bold style="padding-left: 10%; padding-right: 10%; text-align: left">
      用于微信读书
      <a-typography-text mark>阅读挑战</a-typography-text>
      补时长工具，代码开源，不建议多用。
    </a-typography-paragraph>


    <ConfigComponent v-if="!configRef"/>

    <template v-else>
      <a-input-number
          :max="120"
          :min="1"
          size="large"
          :disabled="statusRef === STATUS.running"
          @blur="() => {
              if(!initReadMinutes){
                initReadMinutes = 1
              }
            }"
          v-model:model-value="initReadMinutes"
          placeholder="输入阅读时长" mode="button">
        <template #prefix>
          阅读时长
        </template>
        <template #suffix>
          分
        </template>
      </a-input-number>

      <a-space v-if="running">
        <a-spin/>
        已阅读{{ readValueStr }}
      </a-space>
      <template v-if="statusRef === STATUS.finish">
        阅读已完成 阅读总时长{{ readValueStr }}
      </template>

      <a-space style="margin-top: 10px">
        <a-button v-if="!running" @click="reSetConfig">
          重新配置
        </a-button>

        <a-button
            @click="click"
            :status="running?'danger':'normal'"
            type="primary">
          <template #icon>
            <icon-record-stop v-if="running"/>
            <icon-play-circle v-else/>
          </template>
          {{ running ? "停止" : "开始" }}
        </a-button>
      </a-space>

    </template>

  </a-space>

</template>
<script setup>
import {ref, onMounted, computed, h} from "vue";
import ConfigComponent from "./ConfigComponent.vue";
import {configRef, STATUS, statusRef, startRead, stopRead, readSecondsRef, clearConfig} from "../wx_read/index";
import UseTipsComponent from "./UseTipsComponent.vue";
import {Modal} from '@arco-design/web-vue';

const initReadMinutes = ref(60)

const running = computed(() => {
  return statusRef.value === STATUS.running
})

const readValueStr = computed(() => {
  let s = " "
  const hour = Math.floor(readSecondsRef.value % 60 / 60)
  const minute = Math.floor((readSecondsRef.value / 60 % 60))
  const second = Math.floor(readSecondsRef.value % 60)
  if (hour > 0) {
    s += hour + " 小时 "
  }
  if (minute > 0) {
    s += minute + " 分钟 "
  }
  s += second + " 秒"
  return s
})

onMounted(() => {
  window.api.plugins.onPluginOutCallback((processExit) => {
    if (processExit) {
      stopRead()
    }
  })
})

async function click() {
  if (running.value) {
    stopRead()
  } else {
    if (!initReadMinutes.value) {
      initReadMinutes.value = 1
    }
    await startRead(initReadMinutes.value * 60)
  }
}

function openUrl(url) {
  window.api.platform.openUrl(url)
}

function reSetConfig() {
  Modal.confirm({
    title: '重新配置?',
    content: '重新配置将清空当前配置，是否继续？',
    bodyStyle: {
      textAlign: 'center'
    },
    onOk: () => {
      clearConfig()
    }
  })
}

</script>
<style scoped>

</style>