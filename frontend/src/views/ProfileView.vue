<template>
  <div class="profile">
    <LoginHeader/>
    <main>
      <h1>Profil</h1>
      <div id="user-info">
        <div id="user-info-image">
          <div>
            <img id="profile-image" src="http://localhost:3000/images/user-default.png" alt="Image profil">
          </div>
          <input type="file" name="new-picture" id="new-picture" accept=".png, .jpg, .jpeg">
          <button @click="changePicture">Modifier l'image profil</button>
        </div>
        <div id="user-info-data">
          <p class="bold">Nom d'utilisateur : <span id="username">Utilisateur</span></p>
          <p class="bold">E-mail : <span id="email">E-mail</span></p>
          <div id="theme-select-block">
            <label for="theme-select">Choisir une couleur de fond : </label>
            <select name="theme-select" id="theme-select">
              <option value="">--Choisissez une couleur--</option>
              <option value="#c2bebe">Gris</option>
              <option value="red">Rouge</option>
              <option value="blue">Bleu</option>
              <option value="green">Vert</option>
              <option value="yellow">Jaune</option>
              <option value="black">Noir</option>
            </select>
            <button id="theme-button" @click="saveTheme">Enregistrer la couleur</button>          
          </div>
        </div>
      </div>
      <button id="delete-account" @click="deleteAccount">Supprimer le compte</button>
      <div v-show="deleteShow" id="delete-hidden">
        <p>La suppression est définitive.</p>
        <button id="delete-account-confirm" @click="deleteAccountConfirm">Confirmer</button>
      </div>
    </main>
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
  },
  data() {
    return {
      deleteShow: false
    }
  },
  methods: {
    async changePicture() {
      let userPicture = document.getElementById("new-picture");
      console.log(userPicture.files[0]);
      if (userPicture.files[0] == undefined) {
        return
      }
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let formData = new FormData();
      formData.append("image", userPicture.files[0]);
      formData.append("user", userData);
      console.log(formData);
      let res = await fetch(`http://localhost:3000/api/auth/image/${userData.userId}`, {
        method: "PUT",
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
      let resGet = await fetch(`http://localhost:3000/api/auth/${userData.userId}`, {
        method: "GET",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userData.token}`
        }
      });
      if (!resGet.ok) {
        throw new Error()
      }
      let dataGet = await resGet.json();
      console.log(dataGet);
      document.getElementById("profile-image").src = dataGet.picture;
    },
    deleteAccount() {
      let userId = JSON.parse(sessionStorage.getItem("user"));
      console.log(userId);
      this.deleteShow = !this.deleteShow
    },
    async deleteAccountConfirm() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let res = await fetch(`http://localhost:3000/api/auth/${userData.userId}`, {
      method: "DELETE",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
      },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      throw new Error()
    }
    let data = await res.json();
    console.log(data);
    sessionStorage.removeItem("user");
    window.location.href="http://localhost:8080/"
    },
    async saveTheme() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      let selectedColor = document.getElementById("theme-select").value;
      if (selectedColor !== "") {
        console.log(selectedColor);
        userData.themeColor = selectedColor;
        let res = await fetch(`http://localhost:3000/api/auth/color/${userData.userId}`, {
          method: "PUT",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
          },
          body: JSON.stringify(userData)
        });
        if (!res.ok) {
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(userData));
        document.body.style.backgroundColor = selectedColor;
      }
    }
  },
  async created() {
    let userData = JSON.parse(sessionStorage.getItem("user"));
    let res = await fetch(`http://localhost:3000/api/auth/${userData.userId}`, {
      method: "GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${userData.token}`
      }
    });
    if (!res.ok) {
      throw new Error()
    }
    let data = await res.json();
    console.log(data);
    document.getElementById("username").textContent = data.username;
    document.getElementById("email").textContent = data.email;
    document.getElementById("profile-image").src = data.picture;
  }
}
</script>

<style lang="scss">
#user-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
  &-image {
    width: 50%;
    height: 300px;
    max-width: 350px;
  }
  &-data {
    width: 50%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

#theme-select-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 15px;
}

#profile-image {
  border: blue solid 2px;
  border-radius: 50%;
  width: 255px;
  height: 255px;
  object-fit: cover;
}

#new-picture {
  margin: 5px 0;
}

.bold {
  font-weight: bold;
}

#delete-account {
  background-color: red;
}

#delete-hidden {
  & p {
    color: red;
  };
  & button {
    background-color: red;
  }
}

@media (max-width: 500px) {
  #user-info {
    flex-wrap: wrap-reverse;
    &-image {
      width: 90%;
    }
    &-data {
      width: 90%;
    }
  }
}
</style>