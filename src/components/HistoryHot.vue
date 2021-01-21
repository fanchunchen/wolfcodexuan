<!--  -->
<template>
  <div>
    <div>
      <div class="top" v-show="isShowHistory">
        <div>
          <div>历史记录</div>
          <van-tag
            @click="tagClick(item)"
            v-for="item in historyKeywordList"
            :key="item"
            plain
            type="default"
            >{{ item }}</van-tag
          >
        </div>
        <van-icon name="delete-o" @click="clearClick" />
      </div>
      <div class="top">
        <div>
          <div>热门搜索</div>
          <van-tag
            @click="tagClick(item.keyword)"
            v-for="item in hotKeywordList"
            :key="item.keyword"
            plain
            :type="item.is_hot == 1 ? 'danger' : 'default'"
            >{{ item.keyword }}</van-tag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryHot",
  props: ["hotKeywordList", "historyKeywordList"],
  data() {
    return {
      isShowHistory: true
    };
  },
  methods: {
    tagClick(item) {
      this.$emit("tagClick", item);
    },
    clearClick() {
      this.$toast.success("删除成功");
      setTimeout(() => {
        this.isShowHistory = false;
      }, 2000);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.top {
  padding: 0.1rem 2%;
  margin-bottom: 0.2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  div {
    font-weight: normal;
    font-size: 0.2rem;
    .van-tag {
      margin: 0.1rem 0.1rem 0.01rem 0;

      padding: 0.03rem;
    }
  }
  .van-icon {
    font-size: 0.24rem;
  }
}
</style>
