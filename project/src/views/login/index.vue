<template>
  <div class="login_container"> 
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="formdata" :rules="rules" ref="formdataRef">
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="formdata.username"></el-input>
          </el-form-item>   
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="formdata.password" show-password></el-input>
          </el-form-item>    
          <el-form-item >
            <el-button :loading="isloading" type="primary" size="default" class="login_btn" @click="login">登陆</el-button>
          </el-form-item>   
        </el-form>
      </el-col>
    </el-row>
  </div> 
</template>

<script setup lang=ts>
import { User,Lock} from '@element-plus/icons-vue'
import { reactive,ref } from 'vue';
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router';
import { ElNotification,FormRules,FormInstance } from 'element-plus';
import {GET_TIME} from '@/utils/time.ts'
import {loginForm} from '@/api/user/type.ts'


let formdata = reactive<loginForm>({username:'admin',password:'111111'});


let isloading =ref(false);
let useStore = useUserStore();
let $router = useRouter();
let formdataRef=ref<FormInstance>();

const login = async () =>{
  await formdataRef.value?.validate();
  isloading.value=true;
  try{
    await useStore.userlogin(formdata);
    $router.push('/home');
    isloading.value=false;
    ElNotification({
      type:'success',
      message:'登陆成功',
      title:`hi,${GET_TIME()}好`
    })
  }catch(error){
    isloading.value=false;
    ElNotification({
      type:'error',
      message:(error as Error).message
    })
  }
}

const validateUsername = (_rule:any,value:any,callback:any)=>{
  if(value.length >= 5){
    callback();
  }else{
    callback(new Error('username至少5位'));
  }
}

const validatePassword = (_rule:any,value:any,callback:any)=>{
  if(value.length >= 6){
    callback();
  }else{
    callback(new Error('password至少6位'));
  }
}


let rules = reactive<FormRules<loginForm>>({
  username:[
    // {required:true,min:5,max:10,message:'username should be 5 to 10',trigger:'blur'}
    {validator:validateUsername,trigger:'change'}
  ],
  password:[
    //{required:true,min:6,max:15,message:'password should be 6 to 15',trigger:'blur'}
    {validator:validatePassword,trigger:'change'}
  ]
});
</script>

<style scoped lang="scss">
.login_container{
    width: 100%;
    height: 100vh;
    background: url(@/assets/images/background.jpg);
    background-size: cover
}
.login_form{
    position: relative;
    width: 80%;
    top: 30vh;
    background: url(@/assets/images/login_form.png);
    background-size: cover;
    h1{
      color: white;
      font-size: 40px;
    }
    h2{
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn{
      width: 100%;
    }
}
</style>