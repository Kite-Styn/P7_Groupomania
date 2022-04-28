<template>
  <div class="create-post">
    <LoginHeader/>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
export default {
  name: "CreatePostView",
  components: {
    LoginHeader,
    FooterTemp
  }
}
</script>