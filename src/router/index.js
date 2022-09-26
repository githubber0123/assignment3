import Vue from "vue";
import Router from "vue-router";
import store from "../store";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// // Views
const Dashboard = () => import("@/pages/Dashboard");

// // Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
// const Login = () => import('@/views/pages/Login')
const Register = () => import("@/views/pages/Register");
import Login from "@/pages/Login.vue";
import Users from "@/pages/Users.vue";
import CreateUser from "@/pages/CreateUser.vue";
import Students from "@/pages/Students.vue";
import CreateStudent from "@/pages/CreateStudent.vue";
import Trainers from "@/pages/Trainers.vue";
import CreateTrainer from "@/pages/CreateTrainer.vue";
import EditUser from "@/pages/EditUser.vue";
import EditStudent from "@/pages/EditStudent.vue";
import EditTrainer from "@/pages/EditTrainer.vue";
import Courses from "@/pages/Courses.vue";
import Course from "@/pages/Course.vue";
import CreateCourse from "@/pages/CreateCourse.vue";
import EditCourse from "@/pages/EditCourse.vue";
import Header from "@/pages/Header.vue";
import EditDocument from "@/pages/EditDocument.vue";
import HomePage from "@/pages/HomePage.vue";
import Footer from "@/pages/Footer.vue";


Vue.use(Router);

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    { path: "/login", component: Login },
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          meta: {
            requireAuth: true,
          },
        },   
        {
          path: "home",
          name: "home",
          component: HomePage,
          meta: {
            requireAuth: true,
          },
        },
        
        
        {
          path: "users",
          name: "users",
          component: Users,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "create-user",
          name: "create user",
          component: CreateUser,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "students",
          name: "students",
          component: Students,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "create-student",
          name: "createStudent",
          component: CreateStudent,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "trainers",
          name: "trainers",
          component: Trainers,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "create-trainer",
          name: "create trainer",
          component: CreateTrainer,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "edit-user/:id",
          name: "edit user",
          component: EditUser,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "edit-document/:id",
          name: "editDocument",
          component: EditDocument,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "edit-student/:id",
          name: "editStudent",
          component: EditStudent,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "edit-trainer/:id",
          name: "edit trainer",
          component: EditTrainer,
          meta: {
            requireAuth: true,
          },
        },
        
        
        {
          path: "courses",
          name: "courses",
          component: Courses,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "course/:id",
          name: "course",
          component: Course,
          meta: {
            requireAuth: true,
          },
        },
       
        {
          path: "create-course",
          name: "create course",
          component: CreateCourse,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "edit-course/:id",
          name: "edit course",
          component: EditCourse,
          meta: {
            requireAuth: true,
          },
        },
        
        
      
       
        
        {
          path: "header",
          name: "header",
          component: Header,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "footer",
          name: "footer",
          component: Footer,
          meta: {
            requireAuth: true,
          },
        },       
      ],      
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
  ];
}
router.beforeEach((to, from, next) => {
  // TODO: uncomment after login completed
  let token = JSON.parse(JSON.stringify(sessionStorage.getItem("setToken")));

  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob25AYWRtaW4uY29tIiwidXNlcklkIjoiNjBjYmE5MzMwNDgzZWNjZDZhNWM0ZjYxIiwiaWF0IjoxNjIzOTYxNTc2fQ.FOBrC8aU62IJsvdSyG0GM3F7lp5v-hlAs172gd8kpTo";
  if (to.meta.requireAuth) {
    if (!token) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      store.commit("setToken", token);
      next();
    }
  } else {
    if (token && to.path == "/login") {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath },
      });
    }
    next();
  }
});
export default router;
