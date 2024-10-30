<template>
  <div class="login-box">
    <div class="logo-left-box">
      <img src="./../../assets/img/logo-bg.png" class="logo-bg" />
    </div>
    <div class="login-right-box">
      <div class="login-container">
        <div class="login-header">
          <img class="logo mr10" src="./../../assets/img/logo.png" alt="" />
        </div>
        <el-form :model="param" :rules="rules" ref="login" size="large">
          <div class="title">Account</div>
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="Enter your account">
            </el-input>
          </el-form-item>
          <div class="title">Password</div>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="Enter your password"
              v-model="param.password"
              @keyup.enter="submitForm(login)"
            >
            </el-input>
          </el-form-item>
          <div class="pwd-tips">
            <el-checkbox
              class="pwd-checkbox"
              v-model="checked"
              label="Remember password"
            />
            <!-- <el-link type="primary" @click="$router.push('/reset-pwd')">忘记密码</el-link> -->
          </div>
          <el-button
            color="#101828"
            class="login-btn"
            size="large"
            @click="submitForm(login)"
            >Login</el-button
          >
          <!-- <p class="login-text">
                    没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
              </p> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTabsStore } from "@/store/tabs";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { UseLogin } from "@/api/api";

interface LoginInfo {
  username: string;
  password: string;
}

const lgStr = localStorage.getItem("login-param");
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
  username: defParam ? defParam.username : "",
  password: defParam ? defParam.password : "",
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "Enter your account",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Enter your password", trigger: "blur" },
  ],
};
const getLogin = async () => {
  let params = {
    language: "",
    merchantNo: param.username,
    password: param.password,
  };
  let res = await UseLogin(params);
  if (res.data.code === "0") {
    localStorage.setItem("vuems_name", res.data.model);
    router.push("/dashboard");
    if (checked.value) {
      localStorage.setItem("login-param", JSON.stringify(param));
    } else {
      localStorage.removeItem("login-param");
    }
  } else {
    ElMessage.error(res.data.msg);
    return;
  }
};
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean):any => {
    if (valid) {
      getLogin();
    } else {
      return false;
    }
  });
};

const tabs = useTabsStore();
tabs.clearTabs();
</script>
<style lang="scss">
.el-checkbox.el-checkbox--large .el-checkbox__label {
  font-size: 12px !important;
  color: #101828;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #101828;
  border-color: #101828;
}
.el-checkbox__inner:hover {
  border-color: #101828;
}
.el-form-item--large {
  margin-bottom: 20px;
}
</style>
<style scoped lang='scss'>
.login-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.logo-left-box {
  width: 50%;
  height: 100vh;
  background: #f2f4f7;
  position: relative;
}
.logo-bg {
  display: block;
  height: 100%;
  object-fit: contain;
  position: absolute;
  right: 0;
}
.login-right-box {
  width: 50%;
  position: relative;
}
.login-container {
  position: absolute;
  width: 50%;
  min-width: 450px;
  border-radius: 5px;
  padding: 40px 50px 50px;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-header {
  display: flex;
  margin-bottom: 53px;
}

.logo {
  display: block;
  width: 150px;
  height: 29px;
  margin: 0 auto;
}

.login-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 20px 0 10px;
  color: #787878;
}

.pwd-checkbox {
  height: auto;
}

.login-btn {
  display: block;
  width: 100%;
  border: none;
  color: #fff;
  margin-top: 10%;
  border-radius: 8px;
  font-family: "Inter-SemiBold";
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}
.title {
  font-size: 14px;
  color: #344054;
  margin-bottom: 6px;
  font-family: "Inter-Medium";
}
</style>
