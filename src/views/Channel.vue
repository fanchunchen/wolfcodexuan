<!--  -->
<template>
  <div class="channel">
    <van-tabs @click="tabClick" v-model="active">
      <van-tab
        v-for="item in brotherCategory"
        :key="item.id"
        :title="item.name"
      >
        <div class="info">
          <p>{{ item.name }}</p>
          <span>{{ item.front_name }}</span>
        </div>

        <product :goodsList="goodsList"></product>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { goodsCategoryData, goodsList } from "@/request/api";
import Product from "@/components/Product";
export default {
  name: "Channel",
  data() {
    return {
      active: "",
      brotherCategory: [],
      currentCategory: {},
      goodsList: []
    };
  },
  created() {
    goodsCategoryData(this.$route.params.id).then(res => {
      // console.log(res);
      let { brotherCategory, currentCategory } = res.data.data;
      this.currentCategory = currentCategory;
      this.brotherCategory = brotherCategory;
      // console.log(this.brotherCategory);
      // console.log(this.currentCategory);
      const index = this.brotherCategory.findIndex(
        item => item.name === this.currentCategory.name
      );

      this.active = index;
      goodsList(this.brotherCategory[index].id, 1, 1000).then(res => {
        // console.log(res);
        this.goodsList = res.data.data.goodsList;
        // console.log(this.goodsList);
      });
    });
  },

  methods: {
    tabClick(index) {
      let id = this.brotherCategory[index].id;
      goodsList(id, 1, 1000).then(res => {
        // console.log(res);
        this.goodsList = res.data.data.goodsList;
        // console.log(this.goodsList);
      });
    }
  },
  components: { Product }
};
</script>
<style lang="less" scoped>
.channel {
  font-size: 0.18rem;
  text-align: center;
  .info {
    p {
      line-height: 0.5rem;
    }
    span {
      line-height: 0.5rem;
    }
  }
}
</style>
