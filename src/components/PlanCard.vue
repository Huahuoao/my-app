<template>
<!--  <p id="wwc">-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;未完成-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>-->
  <div v-for="(i,index) in data" class="box" :key="i.id">
    <div id="check">
      <input type="checkbox" class="checkbox" @click="check(index,1)">
    </div>
    <p class="text">{{ i.text }}</p>
    <div class="cha">
      <close-outlined @click="deleteCard(index)" style="font-size: 1.8vh"/>
    </div>
  </div>
<!--  <p id="ywc">-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;已完成-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>-->
  <div v-for="(i,index) in data1" class="box" >
    <div id="check" :key="i.id">
      <input type="checkbox" checked class="checkbox" @click="check(index,2)">
    </div>
    <p class="text2">{{ i.text }}</p>
    <div class="cha">
      <close-outlined @click="deleteCard1(index)" style="font-size: 1.8vh"/>
    </div>
    <br/> <br/> <br/>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {CloseOutlined} from '@ant-design/icons-vue';
import {changePlan, deletePlan, listPLan, addPLan} from "../api";
import {useUserStore} from "../store/user";
onMounted(()=>{
  userId.value = localStorage.getItem("id")
})
const userStore = useUserStore();
const userId = ref('');
const props = defineProps(
    {
      data: Array,
      data1: Array
    }
);

const result = ref('')
let data = reactive<Array<{
  text: string,
  id: number,
  userId: number,
  finish: boolean,
  date: string
}>>([])
let data1 = reactive<Array<{
  text: string,
  id: number,
  userId: number,
  finish: boolean,
  date: string
}>>([])

const flashData = (d:string)=>{
  listPLan({
    id:null,
    text:null,
    date:d,
    userId:userId.value
  }).then(res =>{
    if(res.code==200){
      data.length=0;
      data1.length=0;
      const aa = res.data;
      for (const a of aa) {
        if(a.finish==false)
          data.push(a);
        else
          data1.push(a);
      }
    }
  })
}

  const ans = ref(0)


  function add(t: string) {
    addPLan({
      id: null,
      userId: userId.value,
      text: t,
      date: ''
    }).then(res => {
      data.unshift({
        id: res.data,
        text: t,
        finish: false,
        date: '',
        userId: userId.value
      })
    })
  }

  const check = (i: number, type: number) => {

    if (type == 1) {
      changePlan({
        id: data[i].id,
        userId: userId.value,
        text: '',
        date: ''
      })
      data[i].finish = true;
      data1.push(data[i]);
      data.splice(i, 1);
    }
    if (type == 2) {
      changePlan({
        id: data1[i].id,
        userId: userId.value,
        text: '',
        date: ''
      })
      data1[i].finish = false;
      data.push(data1[i]);
      data1.splice(i, 1);
    }
  }


  let deleteCard = (index: number) => {
    const id = data[index].id;
    deletePlan({
      id: id,
      userId: userId.value,
      text: null,
      date: ''
    })
    data.splice(index, 1);
  }
  let deleteCard1 = (index: number) => {
    const id = data1[index].id;
    deletePlan({
      id: id,
      userId: userId.value,
      text: null,
      date: ''
    })
    data1.splice(index, 1);

  }
  defineExpose({
    add,
    flashData
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
  box-shadow: 0px 0px 5px #888888;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: #d9d9d9 solid 1px;
  margin-top: 1.3vh;
  width: 95%;
  height: 5.5vh;
  border-radius: 12px;
  background-color: rgba(255,255,255,0.5);
  backdrop-filter: blur(3px);
}

.text {
  margin-top: 2.25vh;

  font-size: 2.25vh;
}
.text2 {
  margin-top: 2.25vh;
  text-decoration:line-through;
  color: darkgrey;
  font-size: 2.25vh;
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