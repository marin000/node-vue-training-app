import { createWebHistory, createRouter } from "vue-router";
import Items from '../components/Items';

const routes = [
  {
    path: "/items",
    name: "Items",
    component: Items
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;