<!--  -->
<template>
  <div class="user">
    <div class="top" @click="loginClick">
      <van-row
        ><van-col :span="5"><img :src="avatar" alt=""/></van-col
        ><van-col :span="12">{{ text }}</van-col
        ><van-col :span="7" class="right">></van-col></van-row
      >
    </div>
    <div v-show="isShowLogin" class="login">
      <div class="place" @click="isShowLogin = false"></div>
      <div class="login-modal">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="label-o" text="我的订单" />
      <van-grid-item icon="bill-o" text="优惠券" />
      <van-grid-item icon="goods-collect-o" text="礼品卡" />
      <van-grid-item icon="location-o" text="我的收藏" />
      <van-grid-item icon="flag-o" text="我的足迹" />
      <van-grid-item icon="contact" text="会员福利" />
      <van-grid-item icon="aim" text="地址管理" />
      <van-grid-item icon="warn-o" text="账号安全" />
      <van-grid-item icon="service-o" text="联系客服" />
      <van-grid-item icon="question-o" text="帮助中心" />
      <van-grid-item icon="smile-comment-o" text="意见反馈" />
    </van-grid>
  </div>
</template>

<script>
import { login } from "@/request/api";
export default {
  name: "User",
  data() {
    return {
      avatar: require("@/assets/img/avatar.png"),
      username: "",
      password: "",
      isShowLogin: false,
      text: "点击登录"
    };
  },
  created() {
    let token = localStorage.getItem("token", token);
    let userInfo = localStorage.getItem("userInfo");
    let newUserInfo = JSON.parse(userInfo);
    this.avatar = newUserInfo.avatar;
    this.text = newUserInfo.username;
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      login(values.用户名, values.密码).then(res => {
        // console.log(res);
        let newUserInfo = JSON.stringify(res.data.data.userInfo);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userInfo", newUserInfo);
        this.avatar = res.data.data.userInfo.avatar;
        this.text = res.data.data.userInfo.username;
      });
      this.isShowLogin = false;
    },
    loginClick() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.isShowLogin = true;
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.top {
  font-size: 0.16rem;
  color: #fff;

  background-color: #333;
  padding: 0.3rem 2%;
  .van-row {
    line-height: 0.7rem;

    .van-col {
      img {
        width: 0.7rem;
        border-radius: 50%;

        vertical-align: middle;
      }
    }
  }
  .right {
    text-align: right;
  }
}
.login {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.login-modal {
  background-color: #fff;
  padding: 0.05rem 0;
  width: 90%;
  position: absolute;
  top: 40vh;
  left: 50%;
  transform: translate(-50%);
}

.place {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.user {
  position: relative;
  height: 100vh;
}
</style>
