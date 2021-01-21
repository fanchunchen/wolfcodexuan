<!--  -->
<template>
  <div class="detail">
    <scroll ref="scroll" :pull-up-load="true" class="content">
      <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
          <van-swipe-item v-for="item in gallery"
            ><img
              @load="load"
              style="display:block"
              width="100%"
              :src="item.img_url"
              alt=""
          /></van-swipe-item>
        </van-swipe>
        <tips></tips>
        <div class="info">
          <h3>{{ info.name }}</h3>
          <p>{{ info.goods_brief }}</p>
          <span>{{ info.retail_price | filterMoney }}</span>
        </div>
        <van-cell title="展示弹出层" is-link @click="show = true" />
        <div class="attribute">
          <p>商品参数</p>
          <ul>
            <li v-for="item in attribute" :key="item.name">
              <van-row>
                <van-col class="name" span="5">{{ item.name }}</van-col>
                <van-col span="19" class="value van-ellipsis">{{
                  item.value
                }}</van-col>
              </van-row>
            </li>
          </ul>
        </div>
        <div class="desc" v-html="info.goods_desc"></div>
        <div class="issue">
          <div class="question">
            <div class="before"></div>
            <span>常见问题</span>
          </div>
          <ul>
            <li v-for="item in issue" :key="item.id">
              <p class="que">{{ item.question }}</p>
              <p class="answer">{{ item.answer }}</p>
            </li>
          </ul>
        </div>
        <div class="question">
          <div class="before"></div>
          <span>大家都在看</span>
          <product
            @imgLoad="imgLoad"
            class="product"
            :goodsList="goodsList"
          ></product>
        </div>
      </div>
    </scroll>
    <my-goods-action :badge="badge" @addToCart="addToCart"></my-goods-action>
    <van-sku
      ref="sku"
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
    />
  </div>
</template>

<script>
import {
  getGoodsDetail,
  getGoodsList,
  getGoodsCount,
  AddToCart
} from "@/request/api";
import Tips from "@/components/Tips";
import Product from "@/components/Product";
import MyGoodsAction from "@/components/MyGoodsAction";
import Scroll from "@/components/Scroll";
export default {
  name: "ProductDetail",
  data() {
    return {
      gallery: [],
      attribute: [],
      info: {},
      issue: [],
      goodsList: [],
      badge: 0,
      show: false,
      sku: {
        tree: [],
        price: "1.00",
        stock_num: 0,
        hide_stock: false
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: ""
      },
      id: ""
    };
  },
  created() {
    getGoodsDetail(this.$route.query.id).then(res => {
      // console.log(res);
      this.id = res.data.data.productList[0].id;
      // console.log(this.id);
      let { gallery, attribute, issue, info } = res.data.data;
      this.gallery = gallery;
      this.issue = issue;
      this.attribute = attribute;
      this.info = info;
      // console.log(this.gallery);
      // console.log(this.issue);
      // console.log(this.attribute);
      // console.log(this.info);
      this.sku.price = this.info.retail_price.toFixed(2);
      this.goods.picture = this.info.list_pic_url;
      this.sku.stock_num = this.info.goods_number;
    });
    getGoodsList(this.$route.query.id).then(res => {
      // console.log(res)
      this.goodsList = res.data.data.goodsList;
      // console.log(this.goodsList);
    });
    getGoodsCount().then(res => {
      // console.log(res);
      this.badge = res.data.data.cartTotal.goodsCount;
    });
  },
  methods: {
    addToCart() {
      // console.log(this.$refs.sku.getSkuData());
      let num = this.$refs.sku.getSkuData().selectedNum;
      // console.log(num);
      if (this.show) {
        let token = localStorage.getItem("token");
        if (token) {
          AddToCart(this.$route.query.id, this.id, num).then(res => {
            console.log(res);
            this.badge = res.data.data.cartTotal.goodsCount;
          });
          this.$toast.success("添加成功");
          this.show = false;
          setTimeout(() => {
            this.$router.push("/cart");
          }, 2000);
        }
      } else {
        this.show = true;
      }
    },
    imgLoad() {
      // console.log(1);
      this.$refs.scroll.refresh();
    },
    load() {
      // console.log(1);
      this.$refs.scroll.refresh();
    }
  },
  components: { Tips, Product, MyGoodsAction, Scroll }
};
</script>
<style lang="less" scoped>
.detail {
  height: 100vh;
  // position: relative;
}
.content {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0.5rem;
  overflow: hidden;
  height: calc(100% - 50px);
}
.info {
  font-size: 0.2rem;
  text-align: center;
  background-color: #fff;
  padding: 0.2rem 0;
  border-bottom: 1px solid #ccc;
  h3 {
    font-weight: normal;
  }
  p {
    font-size: 0.14rem;
    line-height: 0.5rem;
  }
  span {
    color: darkred;
  }
}
.van-cell {
  margin-bottom: 0.2rem;
}
.attribute {
  background-color: #fff;
  font-size: 0.16rem;
  padding: 0.2rem 4%;
  ul {
    margin-top: 0.1rem;
    li {
      background-color: #efefef;
      border-radius: 0.05rem;
      margin-bottom: 0.1rem;

      .van-row {
        padding: 0.1rem 2%;
        line-height: 0.2rem;
        .name {
          text-align: right;
          font-size: 0.12rem;
        }
        .value {
          padding-left: 5%;
        }
      }
    }
  }
}
/deep/.desc {
  margin-bottom: 0.2rem;
  img {
    width: 100%;
    display: block;
  }
}
.issue {
  font-size: 0.16rem;
  background-color: #fff;
  text-align: center;
  margin-top: -1.1rem;
  .question {
    position: relative;
    line-height: 0.5rem;
    .before {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
      width: 50%;
      height: 0.01rem;
      background-color: #666;
    }
    span {
      display: inline-block;
      padding: 0 0.2rem;
      background-color: #fff;

      line-height: 0.5rem;

      position: relative;
      z-index: 9;
    }
  }
  ul {
    padding: 0 4%;
    li {
      text-align: left;
      padding-left: 0.2rem;
      position: relative;
      .que {
        line-height: 0.5rem;
      }
      .que::before {
        content: "";
        display: block;
        position: absolute;
        top: 0.23rem;
        left: 0;

        width: 0.05rem;
        height: 0.05rem;
        background-color: darkred;
      }
      .answer {
        font-size: 0.12rem;
      }
    }
  }
}
.question {
  position: relative;
  line-height: 0.5rem;
  height: 0.5rem;
  font-size: 0.16rem;
  background-color: #fff;
  text-align: center;
  .before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    width: 50%;
    height: 0.01rem;
    background-color: #666;
  }
  span {
    display: inline-block;
    padding: 0 0.2rem;
    background-color: #fff;

    line-height: 0.5rem;

    position: relative;
    z-index: 9;
  }
}
.product {
  background-color: #fff;
}
.van-sku-container {
  min-height: auto;
}
/deep/.van-goods-action {
  z-index: 9999;
}
</style>
