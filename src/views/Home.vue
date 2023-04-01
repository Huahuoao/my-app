<template>
  <div>
  </div>
  <a-layout>
    <a-layout-sider class="left">
      <div class="head-1">
        <div class="head-img" @click="returnIndex"><img src="../assets/img/head-img.jpg" id="head-img"></div>
      </div>

      <a-menu
          id="dddddd"
          style="width: 200px"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <MailOutlined/>
          </template>
          <template #title>专注</template>
          <a-menu-item-group key="g1">
            <template #icon>
              <QqOutlined/>
            </template>

            <a-menu-item key="1" id="focus-begin" @click="focusBegin">开始</a-menu-item>
            <a-menu-item key="2" id="focus-record" @click="focusRecord">记录</a-menu-item>
          </a-menu-item-group>

        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined/>
          </template>
          <template #title>计划</template>
          <a-menu-item key="5"  @click="router.push('/plan/today')">查看当日计划</a-menu-item>
          <a-menu-item key="6" @click="router.push('/plan/history')">查看历史记录</a-menu-item>
          <!--          <a-sub-menu key="sub3" title="Submenu">-->
          <!--            <a-menu-item key="7">Option 7</a-menu-item>-->
          <!--            <a-menu-item key="8">Option 8</a-menu-item>-->
          <!--          </a-sub-menu>-->
        </a-sub-menu>
        <a-sub-menu key="sub4" >
          <template #icon>
            <SettingOutlined/>
          </template>
          <template #title>工具</template>
          <a-menu-item key="9">文件格式转换</a-menu-item>
          <a-menu-item key="10">图床</a-menu-item>
          <!--          <a-menu-item key="11">Option 11</a-menu-item>-->
          <!--          <a-menu-item key="12">Option 12</a-menu-item>-->
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <template #icon>
            <SettingOutlined/>
          </template>
          <template #title>笔记</template>
          <a-menu-item key="13">开始记录</a-menu-item>
          <a-menu-item key="14">查看笔记</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">番茄小站 for 花火</a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref, reactive,toRefs} from "vue";
import {onMounted} from 'vue'
const router = useRouter();
const state = reactive({
  nowTime: new Date().toLocaleString()
})
function getnowTime(nowTime:any):any{
  setInterval(()=>{
    let date = new Date();
    nowTime.value = date.toLocaleString();
    return nowTime.value
  },1000)
}
onMounted(()=>{
  getnowTime(nowTime)
})
const nowTime = toRefs(state)

let focusBegin = ()=>{
  router.push("/focus/begin")
}
let returnIndex = ()=>{
  router.push("/home")
}
let focusRecord = () =>{
  router.push("/focus/record")
}
</script>

<style scoped>
.head-1 {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head-img {
  margin: 12%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #888888;
}

.left {
  height: 100vh;
  background-color: #ffffff;
}

#head-img {
  max-height: 80px;

}

.content {
  border: lightskyblue solid 5px;
  border-radius: 5px;
  height: 80vh;


}

.header {
  font-size: 25px;
  background-color: #ffffff;
}

.footer {

  background-color: white;

}
</style>