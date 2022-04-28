<template>
  <div class="my-posts">
    <LoginHeader/>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
export default {
  name: "MyPostsView",
  components: {
    LoginHeader,
    FooterTemp
  }
}
</script>