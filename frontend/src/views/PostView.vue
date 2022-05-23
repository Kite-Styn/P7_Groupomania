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
            <p><span class="bold">{{currentPost.author}}</span>  <span :title="currentPost.date.replace(`T`, ` `).replace(`.000Z`, ``)">{{currentPost.date.split(`T`)[0]}}</span></p>
            <p>{{currentPost.comment_count}} commentaires</p>
            <p><font-awesome-icon class="green clickable" v-show="isLiked" @click="postLike" icon="thumbs-up" size="lg"/><font-awesome-icon class="grey clickable" v-show="isLiked == false" @click="postLike" icon="thumbs-up" size="lg"/> {{ userScore + hasLike + currentPost.score }} <font-awesome-icon class="red clickable" v-show="isDisliked" @click="postDislike" icon="thumbs-down" size="lg"/><font-awesome-icon class="grey clickable" v-show="isDisliked == false" @click="postDislike" icon="thumbs-down" size="lg"/></p>
          </div>
        </div>
        <div id="write-comment">
          <label for="new-comment">Ecrivez un commentaire : <br>1000 caractères max</label>
          <textarea name="new-comment" id="new-comment" maxlength="1000" cols="80" rows="3"></textarea>
          <button @click="createComment">Envoyer</button>
        </div>
        <CommentTemplate v-for="i in commentsList"
        :key="i.id"
        :author="i.author"
        :date="i.date"
        :edit_date="i.edit_date"
        :score="i.score"
        :reply_username="i.reply_username"
        :content="i.content"/>
      </main>
      <NewPosts/>
    </div>
    <FooterTemp/>
  </div>
</template>

<script>
//2022-05-19T15:27:28.000Z
import LoginHeader from "@/components/LoginHeader.vue";
import FooterTemp from "@/components/Footer.vue";
import NewPosts from "@/components/NewPosts.vue";
import CommentTemplate from "@/components/Comment.vue";
export default {
  name: "PostView",
  components: {
    LoginHeader,
    FooterTemp,
    NewPosts,
    CommentTemplate
  },
  data() {
    return {
      currentPost: {
        title: "",
        image_url: "",
        author: "",
        score: 0,
        comment_count: 0,
        date: ""
      },
      commentsList: [
        {
          id: 1,
          author: "",
          date: "",
          edit_date: "",
          score: 0,
          reply_username: "",
          content: ""
        }
      ],
      isLiked: false,
      isDisliked: false,
      userScore: 0,
      hasLike: 0
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
      let commentRes = await fetch(`http://localhost:3000/api/comment/${this.$route.params.id}`, {
        method: "GET",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
      });
      if (!commentRes.ok) {
        throw new Error()
      }
      let commentData = await commentRes.json();
      this.commentsList = commentData;
      this.isLiked = false;
      this.isDisliked = false;
      this.userScore = 0;
      this.hasLike = 0;
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let likeRes = await fetch(`http://localhost:3000/api/postlike/${userData.userId}_${this.$route.params.id}`, {
        method: "GET",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
      });
      if (!likeRes.ok) {
          throw new Error()
      }
      let likeData = await likeRes.json();
      if (likeData != null) {
        if (likeData.score > 0) {
          this.isLiked = true;
          this.userScore = likeData.score;
          this.hasLike = -likeData.score
        } else {
          this.isDisliked = true;
          this.userScore = likeData.score;
          this.hasLike = -likeData.score
        }
      }
    },
    async createComment() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let user = {
        userId: userData.userId,
        related_post: this.$route.params.id,
        content: document.getElementById("new-comment").value
      };
      console.log(user);
      if (userData == null || user.content == "") {
        return
      }
      let res = await fetch("http://localhost:3000/api/comment/create", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(user)
      });
      if (!res.ok) {
        throw new Error()
      }
      let data = await res.json();
      console.log(data);
      window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
    },
    async postLike() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let userLike = {
          userId: userData.userId,
          score: +1,
          post_id: this.$route.params.id,
      };
      if (this.isLiked == false) {
        this.userScore ++;
        let method = "POST";
        if (this.isDisliked == true) {
          method = "PUT";
          this.userScore ++
        }
        let res = await fetch("http://localhost:3000/api/postlike", {
        method: `${method}`,
        headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(userLike)
        });
        if (!res.ok) {
            throw new Error()
        }
        let data = await res.json();
        console.log(data);
      } else {
        this.userScore --;
        let res = await fetch("http://localhost:3000/api/postlike", {
        method: "DELETE",
        headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(userLike)
        });
        if (!res.ok) {
            throw new Error()
        }
        let data = await res.json();
        console.log(data);
      }
      this.isLiked = !this.isLiked;
      this.isDisliked = false;
    },
    async postDislike() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let userLike = {
          userId: userData.userId,
          score: -1,
          post_id: this.$route.params.id,
      };
      if (this.isDisliked == false) {
        this.userScore --;
        let method = "POST";
        if (this.isLiked == true) {
          method = "PUT";
          this.userScore --
        }
        let res = await fetch("http://localhost:3000/api/postlike", {
        method: `${method}`,
        headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(userLike)
        });
        if (!res.ok) {
            throw new Error()
        }
        let data = await res.json();
        console.log(data);
      } else {
        this.userScore ++;
        let res = await fetch("http://localhost:3000/api/postlike", {
        method: "DELETE",
        headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(userLike)
        });
        if (!res.ok) {
            throw new Error()
        }
        let data = await res.json();
        console.log(data);
      }
      this.isDisliked = !this.isDisliked;
      this.isLiked = false;
    },
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
  },
  async mounted() {

  }
}
</script>

<style lang="scss">
#post-card {
  & img {
    max-width: 95%;
    max-height: 600px;
    object-fit: contain;
  }
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}

.clickable {
  cursor: pointer;
}

#write-comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  & textarea {
    margin: 10px;
  }
}
</style>