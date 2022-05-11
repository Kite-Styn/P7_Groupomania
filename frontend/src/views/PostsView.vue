<template>
  <div class="posts">
    <LoginHeader/>
    <div class="content">
      <main></main>
      <NewPosts/>
    </div>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
import NewPosts from "@/components/NewPosts.vue";
export default {
  name: "PostsView",
  components: {
    LoginHeader,
    FooterTemp,
    NewPosts
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & main {
    width: 65%;
  }
}
</style>