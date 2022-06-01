import { createStore } from 'vuex'

export default createStore({
  state: {
    regexName: /^[^±!@£$%^&*+¡€#¢§¶•ªº()"'«\\/{}[\]~<>?:;|=.,\s]+.{3,}$/,
    regexEmail: /^[\w-.]+@([\w-]+\.)+[\w-]+$/,
    regexPass: /^.{7,}$/,
    isAdmin: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
