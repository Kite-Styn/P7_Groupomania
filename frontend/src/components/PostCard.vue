<template>
    <router-link :to="{ name: 'post', params:{id: linkTo} }" class="post-card-list">
        <h2>{{ title }}</h2>
        <div>
            <img :src="image_url" alt="Post">
        </div>
        <div class="black">
            <p class="bold">{{ author }}</p>
            <p>{{ comment_count }} commentaire<span v-if="comment_count > 1">s</span></p>
            <p><font-awesome-icon class="green" v-show="isLiked" @click.prevent="postLike" icon="thumbs-up" size="lg"/><font-awesome-icon class="grey" v-show="isLiked == false" @click.prevent="postLike" icon="thumbs-up" size="lg"/> {{ userScore + score }} <font-awesome-icon class="red" v-show="isDisliked" @click.prevent="postDislike" icon="thumbs-down" size="lg"/><font-awesome-icon class="grey" v-show="isDisliked == false" @click.prevent="postDislike" icon="thumbs-down" size="lg"/></p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "PostCard",
    props: ["linkTo", "title", "image_url", "author", "comment_count", "score"],
    data() {
      return {
        isLiked: false,
        isDisliked: false,
        userScore: 0
      }
    },
    methods: {
      async postLike() {
        let userData = JSON.parse(sessionStorage.getItem("user"));
        let userLike = {
            userId: userData.userId,
            score: +1,
            post_id: this.$.vnode.key,
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
            post_id: this.$.vnode.key,
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
    async mounted() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let res = await fetch(`http://localhost:3000/api/postlike/${userData.userId}_${this.$.vnode.key}`, {
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
      if (data != null) {
        if (data.score > 0) {
          this.isLiked = true
        } else {
          this.isDisliked = true
        }
      }
    }
}
</script>

<style lang="scss">
.green {
  color: green;
}

.black {
  color: black;
}

.post-card-list {
    text-decoration: none;
    &:active {
      color: rebeccapurple;
    }
  & img {
    max-width: 95%;
    max-height: 500px;
    object-fit: contain;
  }
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>