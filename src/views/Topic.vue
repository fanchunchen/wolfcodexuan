<!--  -->
<template>
  <div class="topic">
    <scroll ref="scroll" class="content" :pull-up-load="true">
      <ul>
        <li v-for="item in topicList" :key="item.id">
          <img
            @load="imgLoad"
            width="100%"
            style="display:block"
            :src="item.scene_pic_url"
            alt=""
          />
          <h3>{{ item.title }}</h3>
          <p>{{ item.subtitle }}</p>
          <span>{{ item.price_info | filterMoney }}</span>
        </li>
      </ul>
    </scroll>
    <van-pagination
      v-model="page"
      :page-count="totalPages"
      @change="pageChange"
      :show-page-size="0"
    />
  </div>
</template>

<script>
import { getTopicData } from "@/request/api";
import Scroll from "@/components/Scroll";
export default {
  name: "Topic",
  data() {
    return {
      page: 1,
      size: 10,
      topicList: [],
      totalPages: 0
    };
  },
  created() {
    getTopicData(this.page, this.size).then(res => {
      console.log(res);
      this.totalPages = res.data.data.totalPages;
      this.topicList = res.data.data.data;
      console.log(this.topicList);
      console.log(this.totalPages);
    });
  },
  methods: {
    imgLoad() {
      // console.log(1);
      this.$refs.scroll.refresh();
    },
    pageChange(page) {
      // console.log(page)
      getTopicData(page, this.size).then(res => {
        this.topicList = res.data.data.data;
      });
    }
  },
  components: { Scroll }
};
</script>
<style lang="less" scoped>
.topic {
  font-size: 0.14rem;
  text-align: center;
  height: 100vh;
  .content {
    height: calc(100% - 0.9rem);
  }
  li {
    background-color: #fff;
    margin-bottom: 0.2rem;
    h3 {
      font-weight: normal;
      font-size: 0.16rem;
      line-height: 0.5rem;
    }
    span {
      color: darkred;
      line-height: 0.5rem;
    }
  }
}
</style>
