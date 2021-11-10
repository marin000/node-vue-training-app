import { createWebHistory, createRouter } from "vue-router";
import Items from '../components/Items';

const routes = [
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: {
      title: "Items"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})

export default router;