import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/SignupView.vue'
import Login from '../views/LoginView.vue'
import Profile from '../views/ProfileView.vue'
import Posts from '../views/PostsView.vue'
import CreatePost from '../views/CreatePostView.vue'
import Post from '../views/PostView.vue'

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
    path: '/post/:id',
    name: 'post',
    component: Post
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
