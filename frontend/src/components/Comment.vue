<template>
  <div class="comment">
    <!-- Author, date(formatted), score and dis/like buttons -->
    <p><span class="bold">{{ author }}</span> - {{ date.replace(`T`, ` `).replace(`.000Z`, ``) }} <span class="grey" v-if='edit_date !== null' :title="'modifié le:' + edit_date.replace(`T`, ` `).replace(`.000Z`, ``) || edit_date">*</span> - <font-awesome-icon class="green clickable" v-show="isLiked" @click="commentLike" icon="thumbs-up" size="lg"/><font-awesome-icon class="grey clickable" v-show="isLiked == false" @click="commentLike" icon="thumbs-up" size="lg"/> {{ userScore + score }} <font-awesome-icon class="red clickable" v-show="isDisliked" @click="commentDislike" icon="thumbs-down" size="lg"/><font-awesome-icon class="grey clickable" v-show="isDisliked == false" @click="commentDislike" icon="thumbs-down" size="lg"/></p>
    <p><span class="bold" v-if="reply_username !== null">@{{ reply_username }}</span> {{ content }}</p>
    <div class="comment-buttons-block">
      <button @click="replyComment" class="reply-comment-button">Répondre</button>
      <button @click="modifyComment" class="modify-comment-button" v-if="isAuthor">Modifier</button>
      <button @click="deleteComment" class="delete-comment-button" v-if="isAuthorOrAdmin">Supprimer</button>
    </div>
    <div class="reply-confirm" v-show="replyCommentDisplay">
      <textarea name="reply-comment" class="reply-comment" v-model="replyContent"></textarea>
      <button @click="replyCommentConfirm" class="reply-comment-button">Envoyer</button>
    </div>
    <div class="modify-confirm" v-show="modifyCommentDisplay">
      <textarea name="modify-comment" class="modify-comment" v-model="newContent"></textarea>
      <button @click="modifyCommentConfirm" class="modify-comment-button">Confirmer</button>
    </div>
    <div class="delete-confirm" v-show="deleteCommentDisplay">
      <p class="red">La suppression est définitive!</p>
      <button @click="deleteCommentConfirm" class="delete-comment-button">Confirmer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentTemplate",
  props: ["author", "date", "edit_date", "score", "reply_username", "content"],
  data() {
    return {
      isAuthor: false,
      isAuthorOrAdmin: false,
      replyCommentDisplay: false,
      modifyCommentDisplay: false,
      deleteCommentDisplay: false,
      replyContent: "",
      newContent: "",
      userScore: 0,
      isLiked: false,
      isDisliked: false
    }
  },
  methods: {
    //Toggles display
    replyComment() {
      this.replyCommentDisplay = !this.replyCommentDisplay
    },
    modifyComment() {
      this.modifyCommentDisplay = !this.modifyCommentDisplay
    },
    deleteComment() {
      this.deleteCommentDisplay = !this.deleteCommentDisplay
    },
    //Creates a comment responding to another and reloads the page
    async replyCommentConfirm() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let comment = {
        userId: userData.userId,
        related_post: this.$route.params.id,
        related_comment: this.$.vnode.key,
        reply_username: this.author,
        replyContent: this.replyContent
      };
      if (comment.replyContent == "") {
        return
      }
      let res = await fetch("http://localhost:3000/api/comment/reply", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(comment)
      });
      if (!res.ok) {
        let data = await res.json();
        if (data == "Request not authorized" || data == "User ID invalid") {
          sessionStorage.removeItem("user");
          window.location.href="http://localhost:8080/login";
        }
        throw new Error()
      }
      let data = await res.json();
      console.log(data);
      window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
    },
    //Modifies a comment if the user is the author and reloads the page
    async modifyCommentConfirm() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let comment = {
        userId: userData.userId,
        commentId: this.$.vnode.key,
        newContent: this.newContent
      };
      if (comment.newContent == "") {
        return
      }
      let res = await fetch("http://localhost:3000/api/comment/modify", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(comment)
      });
      if (!res.ok) {
        let data = await res.json();
        if (data == "Request not authorized" || data == "User ID invalid") {
          sessionStorage.removeItem("user");
          window.location.href="http://localhost:8080/login";
        }
        throw new Error()
      }
      let data = await res.json();
      console.log(data);
      window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
    },
    //Deletes a comment if the user is admin or the author and reloads the page
    async deleteCommentConfirm() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let comment = {
        userId: userData.userId,
        commentId: this.$.vnode.key
      };
      let res = await fetch("http://localhost:3000/api/comment/delete", {
        method: "DELETE",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: JSON.stringify(comment)
      });
      if (!res.ok) {
        let data = await res.json();
        if (data == "Request not authorized" || data == "User ID invalid") {
          sessionStorage.removeItem("user");
          window.location.href="http://localhost:8080/login";
        }
        throw new Error()
      }
      let data = await res.json();
      console.log(data);
      window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
    },
    //Comment like request with user and comment data, also changes display
    async commentLike() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let userLike = {
        userId: userData.userId,
        score: +1,
        comment_id: this.$.vnode.key,
      };
      if (this.isLiked == false) {
        this.userScore ++;
        let method = "POST";
        if (this.isDisliked == true) {
          method = "PUT";
          this.userScore ++
        }
        let res = await fetch("http://localhost:3000/api/commentlike", {
          method: `${method}`,
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
          },
          body: JSON.stringify(userLike)
        });
        if (!res.ok) {
          let data = await res.json();
          if (data == "Request not authorized" || data == "User ID invalid") {
            sessionStorage.removeItem("user");
            window.location.href="http://localhost:8080/login";
          }
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
      } else {
        this.userScore --;
        let res = await fetch("http://localhost:3000/api/commentlike", {
          method: "DELETE",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
          },
          body: JSON.stringify(userLike)
        });
        if (!res.ok) {
          let data = await res.json();
          if (data == "Request not authorized" || data == "User ID invalid") {
            sessionStorage.removeItem("user");
            window.location.href="http://localhost:8080/login";
          }
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
      }
      this.isLiked = !this.isLiked;
      this.isDisliked = false;
    },
    //Comment dislike request with user and comment data, also changes display
    async commentDislike() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let userLike = {
          userId: userData.userId,
          score: -1,
          comment_id: this.$.vnode.key,
      };
      if (this.isDisliked == false) {
        this.userScore --;
        let method = "POST";
        if (this.isLiked == true) {
          method = "PUT";
          this.userScore --
        }
        let res = await fetch("http://localhost:3000/api/commentlike", {
          method: `${method}`,
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
          },
          body: JSON.stringify(userLike)
        });
        if (!res.ok) {
          let data = await res.json();
          if (data == "Request not authorized" || data == "User ID invalid") {
            sessionStorage.removeItem("user");
            window.location.href="http://localhost:8080/login";
          }
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
      } else {
        this.userScore ++;
        let res = await fetch("http://localhost:3000/api/commentlike", {
          method: "DELETE",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
          },
          body: JSON.stringify(userLike)
        });
        if (!res.ok) {
          let data = await res.json();
          if (data == "Request not authorized" || data == "User ID invalid") {
            sessionStorage.removeItem("user");
            window.location.href="http://localhost:8080/login";
          }
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
      }
      this.isDisliked = !this.isDisliked;
      this.isLiked = false;
    },
  },
  created() {
    //Checks if the user is the author or admin
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user.username === this.author) {
      this.isAuthor = true
    }
    if (user.username === this.author || JSON.parse(sessionStorage.getItem("user")).isAdmin === true) {
      this.isAuthorOrAdmin = true
    }
},
  async mounted() {
    //Gets user dis/like data
    let userData = JSON.parse(sessionStorage.getItem("user"));
    let res = await fetch(`http://localhost:3000/api/commentlike/${userData.userId}_${this.$.vnode.key}`, {
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
.comment {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & p {
    margin-top: 8px;
    margin-bottom: 8px;
    word-wrap: break-word;
  }
}

.reply-comment-button {
  border-radius: 0;
  background-color: black;
  min-width: auto;
  min-height: auto;
  padding: 2px;
  font-size: revert;
}

.modify-comment-button {
  border-radius: 0;
  background-color: darkgreen;
  min-width: auto;
  min-height: auto;
  padding: 2px;
  font-size: revert;
}

.delete-comment-button {
  border-radius: 0;
  background-color: darkred;
  min-width: auto;
  min-height: auto;
  padding: 2px;
  font-size: revert;
}

.delete-confirm {
  border: red solid 2px;
  align-self: center;
  padding: 5px;
  margin: 5px;
}

.reply-comment {
  margin: 5px;
  width: 50%;
  height: 80px;
}

.modify-comment {
  margin: 5px;
  width: 50%;
  height: 80px;
}

.red {
  color: red
}

.grey {
  color: grey
}

@media (max-width: 900px) {
  .comment {
    & textarea {
      width: 90%;
      height: 80px;
    }
  }
}
</style>