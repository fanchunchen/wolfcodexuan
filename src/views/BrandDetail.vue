<!--  -->
<template>
  <div class="brand">
    <img style="display:block" width="100%" :src="brand.list_pic_url" alt="" />
    <div class="brand-name">{{ brand.name }}</div>
    <div class="context">{{ brand.simple_desc }}</div>
  </div>
</template>

<script>
import { getBrandData } from "@/request/api";
export default {
  name: "BrandDetail",
  data() {
    return {
      brand: {}
    };
  },
  created() {
    getBrandData(this.$route.params.id).then(res => {
      // console.log(res);
      this.brand = res.data.data.brand;
      console.log(this.brand);
    });
  },
  components: {}
};
</script>
<style lang="less" scoped>
.brand {
  position: relative;
  font-size: 0.2rem;
  .brand-name {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    text-decoration: underline;
    color: #fff;
  }
  .context {
    background-color: #fff;
    padding: 0.2rem 2%;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>
