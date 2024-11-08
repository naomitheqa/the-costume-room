import  { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "@/views/LoginPage.vue";
import AdminDashboard from "@/views/AdminDashboard.vue"
import AddItemPage from "@/views/AddItemPage.vue";
import { isAuthenticated } from '@/auth';

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/item-management",
    name: "AddItem",
    component: AddItemPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()){
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
