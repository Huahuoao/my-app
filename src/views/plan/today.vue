<template>
  <div id="app">
    <div class="top">
      <div class="top-text">
        <p id="text1">我的一天</p>
        <p id="text2">{{ date }}</p>
      </div>
    </div>
    <div class="content">
      <Card ref="myref"></Card>
      <div>
        <br/> <br/> <br/> <br/>
      </div>
    </div>
    <div class="footer">
      <a-input v-model:value="data" id="input" placeholder="添加任务" @keyup.enter="add()"></a-input>
    </div>

  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref, reactive} from "vue";
import Card from '../../components/PlanCard.vue'
import {listPLan, addPLan} from '../../api/index'

let data = ref('')
const myref = ref()
let add = () => {
  if (data.value.trim() === '') return
  myref.value.add(data.value)
  data.value = ''
}


const result = ref('');
onMounted(() => {
  formatDate(new Date());
  })



let date = ref('');
const formatDate = (time: any) => {
  // 格式化日期，获取今天的日期
  const Dates = new Date(time);
  const Day: number = Dates.getDay();
  let DayString: string = '';
  switch (Day) {
    case 1:
      DayString = '一';
      break;
    case 2:
      DayString = '二';
      break;
    case 3:
      DayString = '三';
      break;
    case 4:
      DayString = '四';
      break;
    case 5:
      DayString = '五';
      break;
    case 6:
      DayString = '六';
      break;
    case 7:
      DayString = '天';
      break;


  }
  const year: number = Dates.getFullYear();
  const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
  const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
  date.value = year + '-' + month + '-' + day + "  " + "星期" + DayString;
};
</script>

<style scoped>
input::placeholder {

  font-size: 2vh;
}

#input {
  border: lightgreen solid 2px;
  margin-top: 1.3vh;
  height: 5.5vh;
  border-radius: 5px;
}

#app {
  overflow: scroll;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-text {
  line-height: 1.4;
  margin-left: 1.25vh;
  margin-top: 0.8vh;
}

.top {

  height: 10vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#text1 {
  font-size: 4vh;
  margin-bottom: 0;
  font-family: "Microsoft Yaheis";

}

#text2 {
  z-index: 50;
  font-size: 2vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 78%;
}

.footer {
  bottom: 100px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-left: 5vw;


}
</style>