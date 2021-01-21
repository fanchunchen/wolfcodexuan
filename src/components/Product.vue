<!--  -->
<template>
  <div class="product">
    <ul>
      <li @click="goDetail(item.id)" v-for="item in goodsList" :key="item.id">
        <img @load="imgLoad" width="100%" :src="item.list_pic_url" alt="" />
        <p>{{ item.name }}</p>
        <span>{{ item.retail_price | filterMoney }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: ["goodsList"],
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: "/productdetail", query: { id } });
    },
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("imgLoad");
        this.isLoad = true;
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.product {
  font-size: 0.14rem;
  text-align: center;
  ul {
    padding: 3%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      background-color: #fff;
      width: 49%;
      margin-bottom: 0.1rem;
      p {
        margin-bottom: 0.1rem;
      }
      span {
        display: inline-block;
        margin-bottom: 0.1rem;
        color: darkred;
      }
    }
  }
}
</style>
