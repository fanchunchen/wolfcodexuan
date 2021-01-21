<!--  -->
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="全部商品" disabled />
      <van-dropdown-item
        @change="priceChange"
        v-model="price"
        title="价格"
        :options="filterPrice"
      />
      <van-dropdown-item
        v-model="value1"
        title="分类"
        :options="filterCategory"
      />
    </van-dropdown-menu>
    <van-empty
      v-if="goodsList.length == 0"
      image="search"
      description="您搜索的产品不存在"
    />
    <product v-else :goodsList="goodsList"></product>
  </div>
</template>

<script>
import Product from "./Product";
export default {
  name: "MyProduct",
  props: ["filterCategory", "goodsList"],
  data() {
    return {
      price: "",
      value1: 0,
      filterPrice: [
        { text: "价格由高到低", value: "desc" },
        { text: "价格由低到高", value: "asc" }
      ]
    };
  },
  created() {
    this.filterCategory.map(item => {
      if (item.checked) {
        this.value1 = item.value;
      }
    });
  },
  mounted() {},
  methods: {
    priceChange(val) {
      // console.log(val);
      this.$emit("priceChange", val);
    }
  },
  components: { Product }
};
</script>
<style scoped></style>
