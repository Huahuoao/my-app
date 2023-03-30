<template>
<div class="app">
  <Countdown v-if="begin"
      class="countdown"
      title=""
      :countdown="time"
      format="H 时 m 分 s 秒"
      finishedText="Finished"
      @finish="onFinish">
    <template #prefix>还需要专注<br/></template>
    <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
    <template #suffix></template>
  </CountDown>
  <div v-if="!begin" class="t1">请选择专注时间</div>
  <div v-if="!begin" class="button">
    <a-button @click="b(900)" v-bind:class="bb" >15min</a-button>
    <a-button @click="b(1800)" v-bind:class="bb">30min</a-button>
    <a-button @click="b(2700)" v-bind:class="bb">45min</a-button>
    <a-button @click="b(3600)" v-bind:class="bb">60min</a-button>

  </div>
  <a-button  id="begin-button" @click="beginCount">开始</a-button>
</div>
</template>

<script lang="ts" setup>
import Countdown from "../../components/Countdown.vue";
import {ref} from "vue";
let bb = ref('b')
let time = ref(0)
function onFinish () {
 alert("123123123")
}
let begin = ref(false);
let beginCount = () => {
  begin.value = !begin.value;
}
let b = (num:number)=>{
   time.value=num;
}
</script>

<style scoped>
.app{

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
#begin-button{
  border: orangered solid 2px;
  margin: 3.5vh;
  background-color: lightgreen;
  border-radius: 3px;
  height: 6vh;
  width: 8vw;
  font-size: 2.5vh;
}
.countdown{
  margin-top: 12%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 200px;

}
.button{


  margin-top: 2%;
}
.b{
  border: orangered solid 2px;
  border-radius: 50px;
  margin: 2vh;
  height: 6vh;
}
.b1{
  /*background-color: #6bb270;*/
  border: orangered solid 2px;
  border-radius: 50px;
  margin: 2vh;
  height: 6vh;
}
.t1{
  margin-top: 12%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 200px;
  font-size: 10vh;
  line-height: 1.5;
}
</style>