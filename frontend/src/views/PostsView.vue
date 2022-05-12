<template>
  <div class="posts">
    <LoginHeader/>
    <div class="content">
      <main>
        <PostCard v-for="i in postsList"
        :key="i.id"
        :linkTo="i.id"
        :title="i.title"
        :image_url="i.image_url"
        :author="i.author"
        :comment_count="i.comment_count"
        :score="i.score"/>
      </main>
      <NewPosts/>
    </div>
    <FooterTemp/>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
import NewPosts from "@/components/NewPosts.vue";
import PostCard from "@/components/PostCard.vue";
export default {
  name: "PostsView",
  components: {
    LoginHeader,
    FooterTemp,
    NewPosts,
    PostCard
  },
  data() {
    return {
      postsList: [{
        id: 1,
        title: "",
        image_url: "",
        author: "",
        comment_count: 0,
        score: 0
      }]
    }
  },
  async created() {
    let res = await fetch("http://localhost:3000/api/post/", {
    method: "GET",
    headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
    }
    });
    if (!res.ok) {
        throw new Error()
    }
    let data = await res.json();
    this.postsList = data;
  }
}
</script>

<style lang="scss">
/*nav a.router-link-exact-active {
  color: blue;
}

a:visited {
  color: green;
}*/

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & main {
    width: 65%;
  }
}
</style>