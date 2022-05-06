<template>
  <div class="create-post">
    <LoginHeader/>
    <main>
      <h1>Créer un post</h1>
      <div id="post-data">
        <div>
          <label for="post-title">Titre du post : </label>
          <input type="text" name="post-title" id="post-title">
        </div>
        <div>
          <label for="post-image">Sélectionnez une image : </label>
          <input type="file" name="post-image" id="post-image">
        </div>
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
  methods: {
    async postCreate() {
      let postTitle = document.getElementById("post-title").value;
      let postImage = document.getElementById("post-image").files[0];
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let user = {
        title: postTitle,
        userId: userData.userId
      };
      console.log(user);
      if (userData == null || postImage == undefined || postTitle == "") {
        return
      }
      let formData = new FormData();
      formData.append("image", postImage);
      formData.append("user", user);
      let res = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          //"Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        },
        body: formData
      });
      if (!res.ok) {
        throw new Error()
      }
      let data = await res.json();
      console.log(data);
    }
  }
}
</script>

<style lang="scss">
#post-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>