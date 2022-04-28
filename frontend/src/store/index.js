import { createStore } from 'vuex'

export default createStore({
  state: {
    regexName: /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/{}[\]~<>?:;|=.,\d\s]+$/,
    regexEmail: /^[\w-.]+@([\w-]+\.)+[\w-]+$/,
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
