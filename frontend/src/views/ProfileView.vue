<template>
  <div class="profile">
    <LoginHeader/>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
export default {
  name: "ProfileView",
  components: {
    LoginHeader,
    FooterTemp
  }
}
</script>