import request from "./request";
export const getHomeData = () => {
  return request({
    url: "/index/index"
  });
};
export const getSearchData = () => {
  return request({
    url: "/search/index"
  });
};
export const getSearchGoods = (
  keyword,
  page,
  size,
  order,
  categoryId,
  sort
) => {
  let params = {
    keyword,
    page,
    size,
    order,
    categoryId,
    sort
  };
  return request({
    url: "/goods/list",
    params
  });
};
export const getTimeData = keyword => {
  return request({
    url: "/search/helper",
    params: {
      keyword
    }
  });
};
export const clearHistory = () => {
  return request({
    url: "/search/clearhistory",
    method: "post"
  });
};
export const getGoodsDetail = id => {
  return request({
    url: "/goods/detail",
    params: {
      id
    }
  });
};
export const getGoodsList = id => {
  return request({
    url: "/goods/related",
    params: {
      id
    }
  });
};
export const getGoodsCount = () => {
  return request({
    url: "/cart/goodscount"
  });
};
export const login = (username, pwd) => {
  return request({
    url: "/auth/loginByWeb",
    method: "post",
    data: {
      username,
      pwd
    }
  });
};
export const AddToCart = (goodsId, productId, number) => {
  let data = {
    goodsId,
    productId,
    number
  };
  return request({
    url: "/cart/add",
    method: "post",
    data
  });
};
export const getCartData = () => {
  return request({
    url: "/cart/index"
  });
};
export const goodChecked = (isChecked, productIds) => {
  return request({
    url: "/cart/checked",
    method: "post",
    data: {
      isChecked,
      productIds
    }
  });
};
export const stepNum = (goodsId, id, number, productId) => {
  return request({
    url: "/cart/update",
    method: "post",
    data: {
      goodsId,
      id,
      number,
      productId
    }
  });
};
export const delGoods = productIds => {
  return request({
    url: "/cart/delete",
    method: "post",
    data: {
      productIds
    }
  });
};
export const getBrandData = id => {
  return request({
    url: "/brand/detail",
    params: {
      id
    }
  });
};
export const getTopicData = (page, size) => {
  return request({
    url: "/topic/list",
    params: {
      page,
      size
    }
  });
};
export const getCategoryData = () => {
  return request({
    url: "/catalog/index"
  });
};
export const getCurrentData = id => {
  return request({
    url: "/catalog/current",
    params: { id }
  });
};
export const goodsCategoryData = id => {
  return request({
    url: "/goods/category",
    params: { id }
  });
};
export const goodsList = (categoryId, page, size) => {
  return request({
    url: "/goods/list",
    params: { categoryId, page, size }
  });
};
