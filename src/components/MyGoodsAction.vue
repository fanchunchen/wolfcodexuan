<!--  -->
<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon
        @click="isShowStar = !isShowStar"
        :icon="isShowStar ? 'star-o' : 'star'"
        :text="isShowStar ? '未收藏' : '已收藏'"
        :color="isShowStar ? '#333' : 'darkred'"
      />
      <van-goods-action-icon
        @click="goCart"
        icon="cart-o"
        :badge="badge"
        text="购物车"
      />
      <van-goods-action-button type="danger" @click="buyNow" text="立即购买" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "MyGoodsAction",
  props: ["badge"],
  data() {
    return { isShowStar: true };
  },
  methods: {
    addToCart() {
      // console.log(1);
      this.$emit("addToCart");
    },
    buyNow() {
      this.$toast("该功能暂未开放");
    },
    goCart() {
      this.$router.push("/cart");
    }
  },
  components: {}
};
</script>
<style scoped></style>
