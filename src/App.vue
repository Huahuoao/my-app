<template>
  <div class="logo">
    <div v-if="!logo">
      <img src="./assets/img/sleep-text.png" class="sleep-text"/>
    <img @click="clickLogo" src="./assets/img/sleep.png" class="tp" >
    </div>
    <div v-else @click="clickLogo">
      <img src="./assets/img/awake-text.png" class="awake-text"/>
    <img src="./assets/img/awake.png" class="tp">

    </div>
    <div v-if="logo">
    <div class="login-input" >
    <a-input v-model:value="user.username" placeholder="点击这里输入账号" class="username"  />
    <a-input v-model:value="user.password" placeholder="点击这里输入密码" class="password" type="password" />
    </div>
    <div class="button">
      <a-button class="login-button" @click="success">登录</a-button>
      <a-button class="register-button">注册</a-button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';
let logo = ref(true)
let user = reactive({
  username:"",
  password:""
})
function clickLogo(){
  logo.value=!logo.value
  console.log(logo)
}
    const success = () => {
      message
          .loading('登陆中', 1.3)
          .then(
              () => message.success('登录成功', 1.3),
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              () => {},
          )
        ;
    };


</script>
<style scoped>
.tp{
  position:relative;
  top:-180px;
  max-height: 180px;
}
.sleep-text{
max-height: 50px;
  position: relative;
  top: -220px;
}
.password{
  position: relative;
  border: red solid 2px;
  top: 30px;
  border-radius: 15px;
  width: 280px;
}
.username{
  border: red solid 2px;
  border-radius: 15px;
  width: 280px;
}
.login-input{
  position: relative;
  top: -150px
}
.button{
  position: relative;
  top: -80px;
}
.login-button{
  position: relative;
  left: -20px;
  height: 50px;
  width: 100px;
  background-color: hotpink;
  border-radius: 50px;
}
.register-button{
  position: relative;
  right: -20px;
  border-radius: 50px;
  height: 50px;
  width: 100px;
  background-color: hotpink;
}
.awake-text{
  position: relative;
  top: -130px;
  max-height: 60px;
}
</style>
