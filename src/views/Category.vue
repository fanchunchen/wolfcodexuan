<!--  -->
<template>
  <div class="category">
    <van-search
      v-model="serachVal"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      disabled
      @click="goPopup"
    />
    <van-sidebar @change="tabChange(index)" v-model="index">
      <van-sidebar-item
        :title="item.name"
        v-for="item in categoryList"
        :key="item.id"
      />
    </van-sidebar>
    <div class="right">
      <div class="info">
        <img
          width="100%"
          style="display:block"
          :src="currentCategory.banner_url"
          alt=""
        />
        <div class="title">{{ currentCategory.front_name }}</div>
      </div>
      <div class="desc">
        <span>{{ currentCategory.name + "分类" }}</span>
      </div>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="item in subCategoryList"
          :key="item.id"
          :icon="item.wap_banner_url"
          :text="item.name"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCategoryData, getCurrentData } from "@/request/api";
export default {
  name: "Category",
  data() {
    return {
      serachVal: "",
      categoryList: [],
      currentCategory: {},
      subCategoryList: [],
      index: 0
    };
  },
  created() {
    getCategoryData().then(res => {
      // console.log(res);
      let { categoryList, currentCategory } = res.data.data;
      this.currentCategory = currentCategory;
      this.categoryList = categoryList;
      this.subCategoryList = currentCategory.subCategoryList;
      // console.log(this.categoryList);
      // console.log(this.currentCategory);
    });
  },
  methods: {
    goPopup() {
      this.$router.push("/home/popup");
    },
    tabChange(index) {
      // console.log(index);
      let id = this.categoryList[index].id;
      getCurrentData(id).then(res => {
        // console.log(res);
        this.currentCategory = res.data.data.currentCategory;
        this.subCategoryList = res.data.data.currentCategory.subCategoryList;
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.category {
  height: 100%;
  .van-sidebar {
    background-color: #f7f8fa;
    height: calc(100% - 1.04rem);
  }
  .right {
    position: absolute;
    top: 0.54rem;
    left: 0.8rem;
    bottom: 0.5rem;
    padding: 0 1%;
    background-color: #fff;
    font-size: 0.16rem;
    .info {
      position: relative;

      img {
        border-radius: 5px;
        filter: brightness(50%);
        height: 1.4rem;
        box-shadow: 0 0 0.06rem;
      }
      .title {
        color: #fff;
        font-size: 0.14rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .desc {
      height: 0.5rem;
      text-align: center;
      position: relative;
      background-color: #fff;
      &::before {
        content: "";
        display: block;
        width: 50%;
        height: 0.02rem;
        background-color: #ccc;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
      }
      span {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        background-color: #fff;

        line-height: 0.5rem;
        display: inline-block;
        padding: 0 0.1rem;
      }
    }
  }
}
</style>
