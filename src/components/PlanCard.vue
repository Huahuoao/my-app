<template>
  <p id="wwc">-------------------未完成-------------------</p>
  <div v-for="(i,index) in data" class="box" :key="i.id" >
    <div id="check">
      <input type="checkbox" class="checkbox" @click="check(index,1)">
    </div>
    <p class="text">{{ i.text }}</p>
    <div class="cha">
      <close-outlined @click="deleteCard(index)" style="font-size: 1.8vh"/>
    </div>
  </div>
  <p id="ywc">-------------------已完成-------------------</p>
  <div v-for="(i,index) in data1" class="box"  v-show="i.id!=-1">
    <div id="check" :key="i.id">
      <input type="checkbox" checked class="checkbox" @click="check(index,2)">
    </div>
    <p class="text">{{ i.text }}</p>
    <div class="cha">
      <close-outlined @click="deleteCard1(index)" style="font-size: 1.8vh"/>
    </div>

  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {CloseOutlined} from '@ant-design/icons-vue';
import {listPLan, addPLan} from "../api";

const result = ref('')
const getDate = () => {
  let d = new Date();
  let mon = d.getMonth() + 1;
  let day = d.getDate();
  return d.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
}
const ans = ref(0)
onMounted(() => {
  let id: string | null = localStorage.getItem("id");
  listPLan({
    userId: 1,
    text: "",
    date: getDate()
  }).then(res => {
    if (res.code == 200) {
      for (const re of res.data) {
        if (re.finish == 1) {
          data1.push(re);
        }
        if (re.finish == 0) {
          data.push(re);
          ans.value++;
        }
      }

    }


  })


})
let data = reactive<Array<{}>>([])
let data1 = reactive<Array<{}>>([])


function add(t: string) {
  data.unshift({
    id: Math.round(Math.random() * 100000),
    text: t,
    finish: false
  })
  addPLan({
    userId: 1,
    text: t,
    date: ''
  })
}

const check = (i: number, type: number) => {
  if (type == 1) {
    data[i].finish = true;
    data1.push(data[i]);
    data.splice(i, 1);

  }
  if (type == 2) {
    data1[i].finish = false;
    data.push(data1[i]);
    data1.splice(i, 1);

  }
}
const props = defineProps(
    {
      data: Array,
      data1: Array
    }
);


let deleteCard = (index: number) => {
  data.splice(index, 1);
}
let deleteCard1 = (index: number) => {
  data1.splice(index, 1);
}
defineExpose({
  add
})
</script>

<style scoped>
#co {
  color: black;
}

#wwc {

  margin-bottom: 0;
  color: black;
}

#ywc {
  margin-top: 1.3vh;
  margin-bottom: 0;
  color: black;

}

.cha {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 1.3vw;
}

.box {
  display: flex;
  border: #d9d9d9 solid 1px;
  margin-top: 1.3vh;
  width: 95%;
  height: 5.5vh;
  border-radius: 12px;
}

.text {
  margin-top: 1.17vh;
  font-size: 2vh;
}

#check {
  display: flex;
  align-items: center;
  margin-left: 1vw;
  height: 100%;
  width: 1.5vw;
}

.checkbox {
  width: 1vw;
  height: 3vw;

}
</style>