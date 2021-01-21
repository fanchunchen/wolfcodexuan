<!--  -->
<template>
  <div class="popup">
    <van-search
      v-model="popupVal"
      show-action
      placeholder="520元礼包抢先领"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <history-hot
      v-if="blockShow == 1"
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
      @tagClick="tagClick"
    ></history-hot>

    <my-list
      @tagClick="tagClick"
      :list="list"
      v-else-if="blockShow == 2"
    ></my-list>
    <my-product
      v-else
      :goodsList="goodsList"
      :filterCategory="filterCategory"
      @priceChange="priceChange"
    ></my-product>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot";
import MyProduct from "@/components/MyProduct";
import MyList from "@/components/MyList";
import { getSearchData, getSearchGoods, getTimeData } from "@/request/api";

export default {
  name: "MyPopup",
  data() {
    return {
      popupVal: "",
      blockShow: 1,
      historyKeywordList: [],
      hotKeywordList: [],
      goodsList: [],
      filterCategory: [],
      order: "desc",
      sort: "id",
      list: []
    };
  },
  created() {
    getSearchData().then(res => {
      // console.log(res);
      let { historyKeywordList, hotKeywordList } = res.data.data;
      this.historyKeywordList = historyKeywordList;
      this.hotKeywordList = hotKeywordList;
      // console.log(this.historyKeywordList);
      // console.log(this.hotKeywordList);
    });
  },
  methods: {
    onSearch() {
      this.blockShow = 3;
      getSearchGoods(this.popupVal, 1, 20, this.order, 0, this.sort).then(
        res => {
          // console.log(res);
          let { goodsList, filterCategory } = res.data.data;
          this.goodsList = goodsList;
          let arr = JSON.parse(
            JSON.stringify(filterCategory)
              .replace(/name/g, "text")
              .replace(/id/g, "value")
          );
          this.filterCategory = arr;
          // console.log(this.goodsList);
          // console.log(this.filterCategory);
        }
      );
    },
    onCancel() {
      this.$router.back();
    },
    priceChange(val) {
      // console.log(val);
      this.order = val;
      this.sort = "price";
      this.onSearch();
    },
    onInput(val) {
      // console.log(val);
      this.popupVal = val;
      this.blockShow = 2;
      getTimeData(this.popupVal).then(res => {
        // console.log(res);
        this.list = res.data.data;
        // console.log(this.list);
      });
    },
    tagClick(item) {
      // console.log(item);
      this.popupVal = item;
      this.onSearch();
    }
  },
  components: { HistoryHot, MyProduct, MyList }
};
</script>
<style lang="less" scoped>
.popup {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  right: 0;
  background-color: #efefef;
}
</style>
