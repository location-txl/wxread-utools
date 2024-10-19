<template>
  <a-space direction="vertical" style="height: 100%">
    <a-textarea
        style="height: 300px;width: 500px"
        v-model:model-value="curlText"
        placeholder="输入微信读书网页抓取到的 read 接口信息 类型为 curl" allow-clear/>
    <a-button
        :disabled="curlText.length === 0"
        type="primary" @click="parseConfig"
    >配置</a-button>
  </a-space>


</template>
<script setup>
import {ref} from "vue";
import {Message} from "@arco-design/web-vue";
const curlText = ref("")
import parseCurl from "../parsecurl";
import {WX_READ_URL, initConfig} from "../wx_read/index";

async function parseConfig(){
  try
  {
    const config = parseCurl(curlText.value)
    if (!config
        || !config.cookie
        || config.url !== WX_READ_URL
        || !config.header
        || !config.body
    ) {
      Message.error('格式错误')
      return
    }
    initConfig(config)
    console.log("a", config)
    Message.success('配置成功')
  }catch (e){
    Message.error('配置失败')
    console.log("error", e)
  }
}

</script>

<style scoped>

</style>