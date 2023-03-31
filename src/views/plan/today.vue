<template>
  <div id="app">
    <div class="top">
      <div class="top-text">
        <p id="text1">我的一天</p>
        <p id="text2">{{ date }}</p>
      </div>
    </div>
    <div class="content"></div>
    <div class="footer">
      <a-input id="input" placeholder="添加任务"></a-input>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

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
  date.value = year + '-' + month + '-' + day + "  "+"星期"+DayString;
};
</script>

<style scoped>
  input::placeholder{

    font-size: 2vh;
}
#input{
  margin-top: 1.3vh;
  width: 95%;
  height: 5.5vh;
  border-radius: 12px;
}
#app {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
  font-family: "Microsoft Yaheis" ;

}

#text2 {

  z-index: 50;
  font-size: 2vh;
}

.content {
  width: 100vw;
  height: 78%;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>