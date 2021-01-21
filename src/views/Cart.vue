<!--  -->
<template>
  <div class="cart">
    <tips />
    <van-checkbox-group v-model="result">
      <van-checkbox
        :disabled="isChecked"
        @click="goodClick(item)"
        v-for="item in cartList"
        :key="item.id"
        class="chx"
        :name="item.product_id"
        ><van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.retail_price.toFixed(2)"
            :title="item.goods_name"
            :thumb="item.list_pic_url"/>
          <template #right>
            <van-button
              @click="delGood(item)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            /> </template
        ></van-swipe-cell>
        <van-stepper
          v-show="isChecked"
          @change="stepChange(item)"
          v-model="item.number"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox :disabled="isChecked" v-model="checkedAll"
        >全选</van-checkbox
      >
      <template #tip>
        累计共<span>{{ cartTotal.goodsCount }}</span
        >件商品,可点击<van-button
          @click="isChecked = !isChecked"
          size="mini"
          :type="isChecked ? 'danger' : 'primary'"
          >{{ isChecked ? "完成编辑" : "编辑" }}</van-button
        >按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import { getCartData, goodChecked, stepNum, delGoods } from "@/request/api";
export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
      cartTotal: {},
      result: [],
      isChecked: false
    };
  },
  created() {
    getCartData().then(res => {
      // console.log(res);
      this.totalFn(res.data);
    });
  },
  computed: {
    checkedAll: {
      get() {
        return this.cartTotal.checkedGoodsCount == this.cartTotal.goodsCount
          ? true
          : false;
      },
      set(val) {
        if (this.isChecked) {
          return;
        } else {
          // console.log(val);
          let isChecked = val ? 1 : 0;
          let arr = [];
          this.cartList.map(item => {
            arr.push(item.product_id);
          });
          goodChecked(isChecked, arr.join()).then(res => {
            this.totalFn(res.data);
          });
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$toast("已提交");
    },
    totalFn(data) {
      let { cartTotal, cartList } = data.data;
      this.cartTotal = cartTotal;
      this.cartList = cartList;
      this.result = [];
      this.cartList.map(item => {
        if (item.checked == 1) {
          this.result.push(item.product_id);
        }
      });
      // console.log(this.cartList);
      // console.log(this.cartTotal);
    },
    goodClick(item) {
      if (this.isChecked) {
        return;
      } else {
        // console.log(item);
        let isChecked = item.checked == 1 ? 0 : 1;
        goodChecked(isChecked, item.product_id.toString()).then(res => {
          // console.log(res);
          this.totalFn(res.data);
        });
      }
    },
    stepChange(item) {
      // console.log(item);
      stepNum(item.goods_id, item.id, item.number, item.product_id).then(
        res => {
          // console.log(res);
          this.totalFn(res.data);
        }
      );
    },
    delGood(item) {
      // console.log(item);
      delGoods(item.product_id.toString()).then(res => {
        // console.log(res);
        this.totalFn(res.data);
      });
    }
  },
  components: { Tips }
};
</script>
<style lang="less" scoped>
.van-submit-bar {
  bottom: 0.5rem;
}
.cart {
  font-size: 0.16rem;
}
.van-checkbox-group {
  background-color: #fff;
  .chx {
    border-bottom: 1px solid #ccc;

    padding: 0.1rem 2%;
    /deep/.van-checkbox__label {
      width: 100%;
    }
  }
}
.van-stepper {
  text-align: right;
}
.delete-button {
  height: 100%;
}
</style>
