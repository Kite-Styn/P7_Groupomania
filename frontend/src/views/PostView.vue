<template>
  <div class="post">
    <LoginHeader/>
    <div class="content">
      <main>
      <div id="post-card">
        <h2>{{currentPost.title}}</h2>
        <div>
          <img :src="currentPost.image_url" alt="Post">
        </div>
        <div>
          <p class="bold">{{currentPost.author}}</p>
          <p>{{currentPost.comment_count}} commentaires</p>
          <p>{{currentPost.score}}</p>
        </div>
      </div>
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
export default {
  name: "PostView",
  components: {
    LoginHeader,
    FooterTemp,
    NewPosts
  },
  data() {
    return {
      currentPost: {
        title: "",
        image_url: "",
        author: "",
        score: 0,
        comment_count: 0
      }
    }
  },
  methods: {
    async fetchData() {
      let res = await fetch(`http://localhost:3000/api/post/${this.$route.params.id}`, {
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
    this.currentPost = data;
    }
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }
}
</script>

<style lang="scss">
#post-card {
  & img {
    max-width: 95%;
    max-height: 750px;
    object-fit: contain;
  }
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>