<!--  -->
<template>
  <div class="tips">
    <div class="item">
      <van-icon name="checked" />
      <span>30天无忧退货</span>
    </div>
    <div class="item">
      <van-icon name="checked" />
      <span>48小时快速退费</span>
    </div>
    <div class="item">
      <van-icon name="checked" />
      <span>满88元免邮费</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tips",

  data() {
    return {};
  },

  components: {}
};
</script>
<style lang="less" scoped>
.tips {
  font-size: 0.14rem;
  display: flex;
  padding: 0.05rem 4%;
  justify-content: space-between;
  .item {
    line-height: 0.2rem;
  }
  .van-icon {
    color: darkred;
    margin-right: 0.03rem;
    position: relative;
    top: 2px;
  }
}
</style>
