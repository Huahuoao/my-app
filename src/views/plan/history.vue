<template>
  <div id="app">
    <div class="head">
      <a-date-picker v-model:value="value"/>

    </div>
    <div class="content">
      <Card ref="myref" ></Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from '../../components/PlanCard.vue'
import {onMounted, ref, watch} from "vue";
onMounted(()=>{
  myref.value.flashData(todayString)
})
const today  = new Date();
const todayString = today.getFullYear()+'-'+(Number(today.getMonth())+1)+'-'+today.getDate()
const value = ref('');
const date = ref(new Date());
const myref = ref();
watch(value, (newValue, oldValue) => {
   myref.value.flashData(p());
});

const p = () => {
  let str1:string= value.value.toString();
  let replaceStr = ',';//要替换的字符串
  date.value = new Date(str1.replace(new RegExp(replaceStr,'gm'),'')); //逗号替换成空白
  return date.value.getFullYear()+'-'+(Number(date.value.getMonth())+1)+'-'+date.value.getDate() ;
}
</script>

<style scoped>
#app {
  background-image: url("../../assets/img/bg-cat.png");
  background-size: 100% 100%;
  height: 100%;
  overflow: scroll;
}

.head {
  font-size: large;
  margin: 2vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
}
</style>

