import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a2d41d82 = () => interopDefault(import('../../pages/Games/index.vue' /* webpackChunkName: "pages/Games/index" */))
const _693cfbe7 = () => interopDefault(import('../../pages/Login/index.vue' /* webpackChunkName: "pages/Login/index" */))
const _72992b0a = () => interopDefault(import('../../pages/Register/index.vue' /* webpackChunkName: "pages/Register/index" */))
const _6fe8b7a6 = () => interopDefault(import('../../pages/Games/New.vue' /* webpackChunkName: "pages/Games/New" */))
const _511d3767 = () => interopDefault(import('../../pages/Games/_id.vue' /* webpackChunkName: "pages/Games/_id" */))
const _39a38d6d = () => interopDefault(import('../../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Games",
    component: _a2d41d82,
    name: "Games"
  }, {
    path: "/Login",
    component: _693cfbe7,
    name: "Login"
  }, {
    path: "/Register",
    component: _72992b0a,
    name: "Register"
  }, {
    path: "/Games/New",
    component: _6fe8b7a6,
    name: "Games-New"
  }, {
    path: "/Games/:id",
    component: _511d3767,
    name: "Games-id"
  }, {
    path: "/",
    component: _39a38d6d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
