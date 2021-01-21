<template>
  <div id="app">
    <router-view />
    <van-tabbar v-show="$route.meta.isShowTabBar" route v-model="active" active-color="darkred">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/topic">专题</van-tabbar-item>
       <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return { active: 0 };
  }
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  background-color: #efefef;
}
html {
  font-size: 100px;
}
</style>
