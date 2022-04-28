<template>
  <div class="posts">
    <LoginHeader/>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
export default {
  name: "PostsView",
  components: {
    LoginHeader,
    FooterTemp
  }
}
</script>