import { createWebHistory, createRouter } from "vue-router";
import Items from '../components/Items';
import UserManagement from '../components/UserManagement';
import Dashboard from '../components/Dashboard';
const routes = [
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: {
      title: "Items"
    }
  },
  {
    path: "/employees",
    name: "UserManagement",
    component: UserManagement,
    meta: {
      title: "User management"
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard"
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