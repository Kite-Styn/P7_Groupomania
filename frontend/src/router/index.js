import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/SignupView.vue'
import Login from '../views/LoginView.vue'
import Profile from '../views/ProfileView.vue'
import Posts from '../views/PostsView.vue'
import CreatePost from '../views/CreatePostView.vue'
import MyPosts from '../views/MyPostsView.vue'

const routes = [
  {
    path: '/',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //alt: component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },{
    path: '/posts',
    name: 'posts',
    component: Posts
  },{
    path: '/create-post',
    name: 'create-post',
    component: CreatePost
  },{
    path: '/my-posts',
    name: 'my-posts',
    component: MyPosts
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
