<template>
  <div class="home">
    <van-search
      v-model="serachVal"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      disabled
      @click="goPopup"
    />
    <scroll class="content" :pull-up-load="true" ref="scroll">
      <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
          <van-swipe-item v-for="item in banner" :key="item.id"
            ><img
              style="display:block"
              width="100%"
              :src="item.image_url"
              alt=""
          /></van-swipe-item>
        </van-swipe>
        <van-grid :column-num="5">
          <van-grid-item
          @click="goChannel(item.id)"
            v-for="item in channel"
            :key="item.id"
            :icon="item.icon_url"
            :text="item.name"
          />
        </van-grid>
        <div class="place"></div>
        <div class="title">品牌制造商直供</div>
        <ul class="brand">
          <li @click="goBrand(item)" v-for="item in brandList" :key="item.id">
            <img
              style="display:block"
              width="100%"
              :src="item.pic_url"
              alt=""
            />
            <p class="name">{{ item.name }}</p>
            <p class="price">{{ item.floor_price | filterMoney }}</p>
          </li>
        </ul>
        <div class="place"></div>
        <div class="title">周一周四新品首发</div>
        <product class="product" :goodsList="newGoodsList"></product>
        <div class="place"></div>
        <div class="title">人气推荐</div>
        <ul class="recommend">
          <li v-for="item in hotGoodsList" :key="item.id">
            <van-row
              ><van-col :span="8"
                ><img :src="item.list_pic_url" alt=""/></van-col
              ><van-col :span="16">
                <h3>{{ item.name }}</h3>
                <p>{{ item.goods_brief }}</p>
                <span>{{ item.retail_price | filterMoney }}</span></van-col
              ></van-row
            >
          </li>
        </ul>
        <div class="place1"></div>

        <div class="title">专题精选</div>
        <div class="topic">
          <van-swipe :show-indicators="false" :loop="false" :width="300">
            <van-swipe-item v-for="item in topicList" :key="item.id"
              ><img
                style="display:block"
                width="100%"
                :src="item.item_pic_url"
                alt=""
              />
              <span class="item_title">{{ item.title }}</span
              ><span class="item_price">{{
                item.price_info | filterMoney
              }}</span>
              <p class="van-ellipsis">{{ item.subtitle }}</p>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="place"></div>
        <div class="cate" v-for="item in categoryList" :key="item.id">
          <div class="title">{{ item.name }}</div>
          <product @imgLoad="imgLoad" :goodsList="item.goodsList"></product>
          <div class="place"></div>
        </div>
      </div>
    </scroll>
    <!-- <transition name="slide">
      <router-view></router-view>
    </transition> -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product";
import Scroll from "@/components/Scroll";
import { getHomeData } from "@/request/api";

export default {
  name: "Home",

  data() {
    return {
      serachVal: "",
      banner: [],
      brandList: [],
      categoryList: [],
      channel: [],
      hotGoodsList: [],
      newGoodsList: [],
      topicList: []
    };
  },
  created() {
    getHomeData().then(res => {
      // console.log(res);
      this.banner = res.data.data.banner;
      // console.log(this.banner);
      let {
        brandList,
        categoryList,
        channel,
        hotGoodsList,
        newGoodsList,
        topicList
      } = res.data.data;
      this.brandList = brandList;
      this.categoryList = categoryList;
      this.channel = channel;
      this.hotGoodsList = hotGoodsList;
      this.newGoodsList = newGoodsList;
      this.topicList = topicList;
      // console.log(this.brandList);
      console.log(this.categoryList);
      // console.log(this.channel);
      // console.log(this.hotGoodsList);
      // console.log(this.newGoodsList);
      // console.log(this.topicList);
    });
  },
  methods: {
    goPopup() {
      this.$router.push("/home/popup");
    },
    imgLoad() {
      // console.log(1);
      this.$refs.scroll.refresh();
    },
    goBrand(item) {
      console.log(item);
      this.$router.push("/branddetail/" + item.id);
    },
    goChannel(id){
      this.$router.push('/channel/'+id)
    }
  },
  components: { Product, Scroll }
};
</script>
<style lang="less" scoped>
// .slide-enter,
// .slide-leave-to {
//   right: -100%;
// }
// .slide-enter-active,
// .slide-leave-active {
//   transition: 0.5s linear;
// }
// .slide-enter-to,
// .slide-leave {
//   right: 0;
// }
.home {
  height: 100vh;
}

.content {
  // position: absolute;
  // top: 0.54rem;
  // left: 0;
  // right: 0;
  // bottom: 0.5rem;
  height: calc(100% - 104px);
  overflow: hidden;
}
.place {
  height: 0.2rem;
}
.title {
  font-size: 0.14rem;
  background-color: #fff;
  line-height: 0.5rem;
  text-align: center;
}
.brand {
  font-size: 0.14rem;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 49%;
    position: relative;
    margin-bottom: 0.05rem;
    .name {
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }
    .price {
      position: absolute;
      left: 0.1rem;
      top: 0.4rem;
      color: darkred;
    }
  }
}
.product {
  background-color: #fff;
}
.recommend {
  font-size: 0.16rem;
  background-color: #fff;
  li {
    padding: 0.1rem 4%;
    margin-bottom: 0.1rem;
    background-color: #fafafa;
    img {
      width: 0.88rem;
      vertical-align: middle;
    }
    h3 {
      font-weight: normal;
      font-size: 0.16rem;
    }
    p {
      margin-top: 0.1rem;
      font-size: 0.12rem;
    }
    span {
      display: inline-block;
      margin-top: 0.2rem;
      color: darkred;
    }
  }
}
.place1 {
  height: 0.1rem;
}
.topic {
  padding-right: 1%;
  background-color: #fff;
  font-size: 0.16rem;
  .van-swipe-item {
    padding-left: 0.05rem;
    img {
      height: 2rem;
    }
    .item_title {
      display: inline-block;
      margin-top: 0.1rem;
    }
    .item_price {
      color: darkred;
      margin-left: 0.1rem;
    }
    p {
      font-size: 0.14rem;
      margin-top: 0.1rem;
    }
  }
}
</style>
