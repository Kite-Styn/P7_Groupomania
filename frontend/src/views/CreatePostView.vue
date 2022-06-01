<template>
  <div class="create-post">
    <LoginHeader/>
    <main>
      <h1>Créer un post</h1>
      <div id="post-data">
        <div>
          <label for="post-title">Titre du post : <br>255 caractères max</label>
          <textarea type="text" maxlength="255" cols="60" name="post-title" id="post-title"></textarea>
        </div>
        <div>
          <label for="post-image">Sélectionnez une image : <br>*png, jpg ou jpeg</label>
          <input type="file" name="post-image" id="post-image" accept=".png, .jpg, .jpeg, .gif">
        </div>
        <p v-show="invalidPost" class="red">Veuillez ajouter un titre et une image</p>
        <button @click="postCreate">Créer</button>
      </div>
    </main>
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
  },
  data() {
    return {
      invalidPost: false
    }
  },
  methods: {
    //Gathers the inputs, checks them and sends them to the api to create a post
    async postCreate() {
      let postTitle = document.getElementById("post-title").value;
      let postImage = document.getElementById("post-image").files[0];
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let user = {
        title: postTitle,
        userId: userData.userId
      };
      if (userData == null) {
        sessionStorage.removeItem("user");
        window.location.href="http://localhost:8080/login";
        return
      }
      if (postImage == undefined || postTitle == "") {
        this.invalidPost = true;
        return
      }
      let formData = new FormData();
      formData.append("image", postImage);
      formData.append("user", JSON.stringify(user));
      let res = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: formData
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
      window.location.href="http://localhost:8080/posts";
    }
  }
}
</script>

<style lang="scss">
#post-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  & div {
    display: flex;
    align-items: center;
    & label {
      margin: 5px;
    }
    & textarea {
      height: 5em;
    }
  }
}

@media (max-width: 500px) {
  #post-data {
    & div {
      flex-direction: column;
      & textarea {
        width: 15em;
        height: 9em;
      }
    }
  }
}
</style>