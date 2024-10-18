<template>
  <a-space direction="vertical" style="height: 100%">
    <a-link href="link">文档地址</a-link>
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
import {getCurrentInstance, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
const emit = defineEmits(['configChange'])
const curlText = ref("curl 'https://weread.qq.com/web/book/read' \\\n" +
    "  -H 'accept: application/json, text/plain, */*' \\\n" +
    "  -H 'accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
    "  -H 'baggage: sentry-environment=production,sentry-release=dev-1729059353664,sentry-public_key=ed67ed71f7804a038e898ba54bd66e44,sentry-trace_id=9d90a142c53d4681abd7b4606cd4fdc8' \\\n" +
    "  -H 'content-type: application/json;charset=UTF-8' \\\n" +
    "  -H 'cookie: wr_fp=2671311802; wr_gid=214648857; wr_skey=sGNZ2UTu; wr_vid=364948414; wr_rt=web%40XOKnqAPGqmqXt6LFkuK_AL; wr_localvid=977321e0815c0abbe977b2b; wr_name=location; wr_avatar=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIu6dL8xykdcPSl5UXRThw02zniaXia4ZY2OPeKMgDIjia5ibe3phJrgSaoWVl9tIksiac7c8DVDRydT2Q%2F132; wr_gender=1' \\\n" +
    "  -H 'origin: https://weread.qq.com' \\\n" +
    "  -H 'priority: u=1, i' \\\n" +
    "  -H 'referer: https://weread.qq.com/web/reader/2d3420b3643425f395031376e76377167314f30366d53366b713066563831370e9k98f3284021498f137082c2e' \\\n" +
    "  -H 'sec-ch-ua: \"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"' \\\n" +
    "  -H 'sec-ch-ua-mobile: ?0' \\\n" +
    "  -H 'sec-ch-ua-platform: \"macOS\"' \\\n" +
    "  -H 'sec-fetch-dest: empty' \\\n" +
    "  -H 'sec-fetch-mode: cors' \\\n" +
    "  -H 'sec-fetch-site: same-origin' \\\n" +
    "  -H 'sentry-trace: 9d90a142c53d4681abd7b4606cd4fdc8-b671a681cf3ade57' \\\n" +
    "  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \\\n" +
    "  --data-raw '{\"appId\":\"wb115321887466h1535937327\",\"b\":\"2d3420b3643425f395031376e76377167314f30366d53366b713066563831370e9\",\"c\":\"98f3284021498f137082c2e\",\"ci\":20,\"co\":4058,\"sm\":\"是宝宝心理还是舍不下丽丽，还是舍不下自己\",\"pr\":79,\"rt\":30,\"ts\":1729132401265,\"rn\":421,\"sg\":\"5b8893b0ecf21a00f111f4caae229b9f1c4a695c656f1cce50cbe068dc523359\",\"ct\":1729132401,\"ps\":\"4d5322b07a4e7254g011b5f\",\"pc\":\"966329e07a4e7254g019520\",\"dy\":1,\"fm\":\"epub\",\"s\":\"79c13527\"}'")
import parseCurl from "../parsecurl";
import {WX_READ_URL, initConfig, start, getConfig} from "../wx_read/index";

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
    // const d = await window.api.wx.read(getConfig())
    // console.log("r", d)
   await window.api.wx.get_sKey(getConfig())

  }catch (e){
    Message.error('配置失败')
    console.log("error", e)
  }
  // curlText.value = JSON.stringify(await start(10))
}

</script>

<style scoped>

</style>