<template>
  <div class="login">
    <LogoutHeader/>
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import LogoutHeader from "@/components/LogoutHeader.vue";
export default {
  name: "LoginView",
  components: {
    LogoutHeader
  }
}
/*// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}*/
</script>

<style lang="scss">

</style>