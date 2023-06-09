<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
interface Props {
  countdown: number, // 倒计时数值（countdown），必传，支持设置未来某时刻的时间戳(ms) 或 相对剩余时间(s)
  title?: string, // 倒计时标题 string | v-slot
  format?: string, // 格式化倒计时展示，(Y：年，M：月，D：天，H：小时，m：分钟，s：秒)
  prefix?: string, // 倒计时数值的前缀 string | v-slot
  suffix?: string, // 倒计时数值的后缀 string | v-slot
  finishedText?: string // 完成后的展示文本 string | v-slot
}
const props = withDefaults(defineProps<Props>(), {
  countdown: 0,
  title: 'Countdown',
  format: 'HH:mm:ss',
  prefix: '',
  suffix: '',
  finishedText: ''
})
const restTime = ref(props.countdown)

function fixedTwo (value: number): string {
  return value < 10 ? '0' + value : String(value)
}
function timeFormat (time: number): string {
  let showTime = props.format
  if (showTime.includes('s')) {
    var s = time
  } else {
    var s = 0
  }
  if (showTime.includes('m')) {
    s = s % 60
    var m = Math.floor((time - s) / 60)
  } else {
    var m = 0
  }
  if (showTime.includes('H')) {
    m = m % 60
    var H = Math.floor((time - s - m * 60) / 60 / 60)
  } else {
    var H = 0
  }
  if (showTime.includes('D')) {
    H = H % 24
    var D = Math.floor((time - s - m * 60 - H * 60 * 60) / 60 / 60 / 24)
  } else {
    var D = 0
  }
  if (showTime.includes('M')) {
    D = D % 30
    var M = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60) / 60 / 60 / 24 / 30)
  } else {
    var M = 0
  }
  if (showTime.includes('Y')) {
    M = M % 12
    var Y = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60 - M * 30 * 24 * 60 * 60) / 60 / 60 / 24 / 30 / 12)
  } else {
    var Y = 0
  }
  showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
  showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  showTime = showTime.includes('YY') ? showTime.replace('YY', fixedTwo(Y)) : showTime.replace('Y', String(Y))
  return showTime
}
const showTime = computed(() => { // 展示的倒计时
  return timeFormat(restTime.value)
})
const emit = defineEmits(['finish'])
function CountDown (restTime: Ref):void {
  setTimeout(() => {
    restTime.value--
    if (restTime.value > 0) { // js中Boolean(非0)都是true
      CountDown(restTime)
    } else {
      emit('finish')
    }
  }, 1000)
}
onMounted(() => {
  if (restTime.value > Date.now()) {
    restTime.value = Math.floor((restTime.value - Date.now()) / 1000)
  }
  CountDown(restTime)
})
</script>
<template>
  <div class="m-countdown">
    <slot name="title">
      <p class="u-title">{{ props.title }}</p>
    </slot>
    <div class="u-time">
      <slot name="prefix" v-if="restTime > 0">{{ prefix }}</slot>
      <slot v-if="finishedText && restTime === 0" name="finish">{{ finishedText }}</slot>
      <span v-else>{{ showTime }}</span>
      <slot name="suffix" v-if="restTime > 0">{{ suffix }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-countdown {
  .u-title {
    margin-bottom: 4px;
    color: #00000073;
    font-size: 20%;
  }
  .u-time {
    color: #000000d9;
    font-size: 10vh;
    line-height: 1.5;
  }
}
</style>