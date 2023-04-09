`<template>
<div class="app" :style="{ backgroundColor: backgroundColor }">
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

    <div class="color">
 <div class="co">
   <div class="c1" @click="changeBack('white')"
        >
   </div>
   <div class="c2" @click="changeBack('#deecf9')"
        >
   </div>
   <div class="c3" @click="changeBack('#c7e0f4')"
         >
   </div>
   <div class="c4" @click="changeBack('#e1dfdd')"
       >
   </div>
   <div class="c5" @click="changeBack('#ffadd2')"
       >
   </div>
 </div>
    </div>


</div>
</template>

<script lang="ts" setup>
import Countdown from "../../components/Countdown.vue";
import {onMounted, ref} from "vue";
import Hover from "../../components/Hover.vue";
let bb = ref('b')
let time = ref(0)

function onFinish () {

}
let begin = ref(false);
let beginCount = () => {
  begin.value = !begin.value;
}
let b = (num:number)=>{
   time.value=num;
}

const backgroundColor = ref('white')

onMounted(()=>{
  if(localStorage.getItem('bg')!='')
  backgroundColor.value=localStorage.getItem('bg')
})
const changeBack = (a:string) =>{
  backgroundColor.value =a;
  localStorage.setItem('bg',a);
}
</script>

<style scoped>
.app{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.co{
  display: flex;
  margin-left: 2vw;
  height: 100%;
  width: 20%;
}
.c1{
  width: 11%;
  border: black solid 1px;
  border-radius: 100px;
  height: 80%;
  margin: 1vh;
  background-color: white;

}
.c1:hover{
  transition: all 0.5s;
  border: aliceblue solid 1px;
  transform:translate(0,-5px);
}
.c2:hover{
  transition: all 0.5s;
  border: aliceblue solid 1px;
  transform:translate(0,-5px);
}
.c3:hover{
  transition: all 0.5s;
  border: aliceblue solid 1px;
  transform:translate(0,-5px);

}
.c4:hover{
  transition: all 0.5s;
  border: aliceblue solid 1px;
  transform:translate(0,-5px);

}
.c5:hover{
  transition: all 0.5s;
  border: aliceblue solid 1px;
  transform:translate(0,-5px);

}
.c2{
  width: 11%;
  border: black solid 1px;
  border-radius: 50px;
  height: 85%;
  margin: 1vh;
  background-color: #deecf9;

}
.c3{
  width: 11%;
  border: black solid 1px;
  border-radius: 50px;
  height: 85%;
  margin: 1vh;
  background-color: #c7e0f4;

}
.c4{
  width: 11%;
  border: black solid 1px;
  border-radius: 50px;
  height: 85%;
  margin: 1vh;
  background-color: #e1dfdd;

}
.c5{
  width: 11%;
  border: black solid 1px;
  border-radius: 50px;
  height: 85%;
  margin: 1vh;
  background-color: #ffadd2;

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
.color{
  margin-top: 5%;
  height: 5%;
  width: 100%;
  left: 0;
}
</style>