import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "@/views/MainView.vue"
import Product from "@/views/Product.vue"
import ShowProduct from '@/views/ShowProduct.vue';
import PayMethod from '@/views/PayMethod.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-view",
    component: MainView
  },
  {
    path: "/productos",
    name: "products-view",
    component: Product
  },
  {
    path: "/productos/:id",
    name: "product-show",
    component: ShowProduct
  },
  {
    path: "/payMmethod",
    name: "pay-method",
    component: PayMethod
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;