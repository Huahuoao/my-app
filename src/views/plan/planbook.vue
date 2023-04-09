<template>
  <div id="app">
    <a-modal v-model:visible="visibleTwo" title="新的任务!"
             style="margin-left: 38vw;
margin-top: 10%;" @ok="okTwo">
      <a-input v-model:value="plan"></a-input>
    </a-modal>
    <a-modal v-model:visible="visible" title="新的计划!"
             style="margin-left: 38vw;
margin-top: 10%;" @ok="ok">

      <p style="margin-bottom: 1vh">请输入名称：</p>
      <a-input v-model:value="name"></a-input>
    </a-modal>
    <div class="top">
      我的计划簿
    </div>
    <div id="main">
      <div class="left">
        <div>
          <div>
            <a-radio-group v-model:value="value1" button-style="solid"
                           class="booklist">
              <div v-for="(i,index) in bookData" style="display: flex;align-items: center;">
                <a-radio-button style="
                border-radius: 12px;
              display: flex;
              text-align: center;
              align-items: center;
              font-size: 2vh;
              width: 100%;
              margin-bottom: 0.5vh;
              height: 5vh;"
                                :key="i.id" :value=index @click="changePlanData(index)">
                  {{ i.name }}
                </a-radio-button>
                <div class="cha">
                  <close-outlined @click="deleteB(index)" style="font-size: 1.8vh"/>
                </div>
              </div>


            </a-radio-group>
          </div>
        </div>
        <div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
          <a-button style="width: 50%;font-family: myFont-cu;
       border-radius: 20px; border: hotpink solid 2px;
margin-top: 1.5vh;margin-right: 0.8vw" @click="addqBook"><p>新增</p>
          </a-button>
        </div>
      </div>
      <div class="right">
        <div v-for="(i,index) in planData" :key="i.id"
             class="task">
          <p style="left: 0;
margin-top: 0.8vh; margin-left: 2vw;"> {{ i.text }}</p>
        </div>
        <div style="display: flex;width: 100%;">
          <a-button @click="addBookV" class="addPlan">
          <p style="font-family: 'myFont';
          margin-top: 4.2vh;
          font-size: 4vh;
          color: #888888;
">+</p>
          </a-button>
        </div>

      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import {CloseOutlined} from '@ant-design/icons-vue';

import {listBook, addBook, deleteBook, listBookPlan, addPlanByBook} from "../../api";
import {onMounted, reactive, ref} from "vue";

const bookId = ref(0)
const value1 = ref<string>('');
const visible = ref(false);
const visibleTwo = ref(false);
const name = ref('')
const plan = ref('')
const deleteB = (index) => {
  deleteBook({
    id: bookData[index].id
  }).then(res => {
    if (res.code == 200) {
      bookData.splice(index, 1);
    }
  })
}
let changePlanData = (index: number) => {
  bookId.value = bookData[index].id
  listBookPlan({
    id: bookData[index].id
  }).then(res => {
    if (res.code == 200) {
      const a = res.data;
      planData.length = 0;
      for (const aElement of a) {
        planData.push(aElement)
      }
    }
  })
}
let bookData = reactive<Array<{
  name: string,
  id: number,
  userId: number | string,
  createTime: string
}>>([])

let addBookV = () => {
  visibleTwo.value = true;
}
const okTwo = () => {
  if (plan.value.trim().length == 0) return
  addPlanByBook({
    userId: localStorage.getItem("id"),
    id: bookId.value,
    text: plan.value
  }).then(res => {
    if (res.code == 200) {
      planData.push({
        text: plan.value,
        id: res.data,
        userId: Number(localStorage.getItem("id")),
        finish: false,
        date: ""
      });
      visibleTwo.value = false;
      plan.value = '';
    }
  })
}
let planData = reactive<Array<{
  text: string,
  id: number,
  userId: number,
  finish: boolean,
  date: string
}>>([])
onMounted(() => {
  listBook({
    userId: localStorage.getItem("id"),
    name: ""
  }).then(res => {
    if (res.code == 200) {
      const a = res.data;
      for (const aElement of a) {
        bookData.push(aElement);
      }
    }
  })
})

function addqBook() {
  console.log(visible.value)
  visible.value = true;
}

function ok() {
  if (name.value.trim().length == 0) {
    return;
  }
  addBook({
    userId: localStorage.getItem("id"),
    name: name.value
  }).then(res => {
    if (res.code == 200) {
      bookData.push({
        name: name.value,
        id: res.data,
        userId: localStorage.getItem("id"),
        createTime: ""
      });
      name.value = ''
    }
  })
  visible.value = false;
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  background-image: url("../../assets/img/bg-cat.png");
  background-size: 100% 100%;
}

.addPlan {
  margin-top: 2.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 2.5vh;
  text-align: center;
  width: 5vh;
  height: 5vh;
  border-radius: 50px;
  background-color: white;
  background-color: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  margin-left: 90.7%;
  box-shadow: 0px 0px 5px #888888;
}

.booklist {
  display: flex;
  flex-direction: column;

}

.top {
  margin-bottom: 2vh;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3.5vh;
  font-family: "Microsoft YaHei UI";
}

.task {
  font-size: 2.5vh;
  display: flex;
  box-shadow: 0px 0px 5px #888888;
  border: #d9d9d9 solid 1px;
  margin-top: 1.3vh;
  width: 95%;
  height: 5.5vh;
  border-radius: 12px;
  background-color: rgba(255,255,255,0.5);
  backdrop-filter: blur(3px);
}

#main {
  display: flex;
  height: 100%;
}

.text1 {
  margin-left: 1vh;

}

.cha {
  position: relative;
  right: 20px;
  bottom: 2px;
}

.right {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

}

.left {
  margin-left: 1vw;
  width: 15%;
  height: 100%;
}

.card {
  width: 100%;
  height: 5vh;
  margin-bottom: 0.5vh;
  background-color: hotpink;
}

.book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 2.5vh;
  height: 8%;
  background-color: yellow;
  margin-bottom: 0.5vh;
}
</style>