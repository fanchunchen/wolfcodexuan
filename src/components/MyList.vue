<!--  -->
<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell
        v-for="item in list"
        @click="cellClick(item)"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  name: "MyList",
  props: ["list"],
  data() {
    return {
      finished: false
    };
  },
  methods: {
    cellClick(item) {
      this.$emit("tagClick", item);
    }
  },
  components: {}
};
</script>
<style scoped></style>
