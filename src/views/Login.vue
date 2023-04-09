<template>

  <Hover :hover="hover"/>
  <div class="all">
    <div class="logo">
      <div v-if="!logo" class="logo-false">
        <img src="../assets/img/sleep-text.png" class="sleep-text"/>
        <img @click="clickLogo" src="../assets/img/sleep.png" class="tp">
      </div>
      <div v-else @click="clickLogo" class="logo-false">
        <img src="../assets/img/awake-text.png" class="awake-text"/>
        <img src="../assets/img/awake.png" class="tp">
      </div>
    </div>
    <div class="content">
      <div v-if="logo">
        <div class="login-input">
          <input v-model.trim="user.username" placeholder=" 请输入账号" class="username"/>
          <input v-model.trim="user.password" placeholder=" 请输入密码" class="password" type="password"/>
        </div>
        <router-link to="/home" class="yklogin">游客登录</router-link>
        <div class="button">
          <a-button class="login-button" @click="success">登录</a-button>
          <a-button class="register-button">注册</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {message} from 'ant-design-vue';
import {defineComponent} from 'vue';
import Hover from '../components/Hover.vue'
import axios from "axios";
import {login} from '../api'
import {routerKey} from "vue-router";
import {useRouter} from "vue-router";
import { useUserStore } from '.././store/user'
const router = useRouter();
const userStore = useUserStore()
let hover = ref(false)
let logo = ref(false)
let user = reactive({
  username: "",
  password: ""
})
let url1 = ref('/')
let go = () => {
   router.push('/home')
}

function clickLogo() {
  logo.value = !logo.value
  console.log(logo)
}


const success = () => {
  hover.value = true
  message
      .loading('登陆中', 1)
      .then(
          () => {
            login(user).then(res => {
              if (res.code == 200)
                {
                  localStorage.setItem("id",res.data.id);
                  userStore.updateId(res.data.id);
                  router.push('/home')
                  message.success("登录成功");
                }

              if (res.code == 301)
                message.warn("用户未注册")
              if (res.code == 302)
                message.warn("密码错误")
            })
            hover.value = false;
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          () => {
          },
      )
  ;
};


</script>
<style scoped>

.content {
  display: flex;
  flex-direction: column;
}
.yklogin{
  margin-left: 76%;
}
.all {
  padding-top: 5%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tp{
  max-height: 30vh;
}
.sleep-text {
  max-height: 35px;
}

.logo-false {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 30%;
  margin-bottom: 3%;
}

.password {
  margin-top: 10%;
  border: red solid 2px;
  border-radius: 15px;
  width: 280px;
}

.username {
  border: red solid 2px;
  border-radius: 15px;
  width: 280px;
}

.login-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  display: flex;
  justify-content: space-evenly;
}

.login-button {
  height: 50px;
  width: 100px;
  background-color: hotpink;
  border-radius: 50px;
}

.register-button {
  border-radius: 50px;
  height: 50px;
  width: 100px;
  background-color: hotpink;
}


.awake-text {
  max-height: 60px;
}
</style>
