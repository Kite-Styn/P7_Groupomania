<template>
  <header>
    <div id="banner">
      <img src="../assets/icon-above-font.png" alt="Logo groupomania">
      <p>Réseau Social d'Entreprise</p>
    </div>
    <nav id="nav">
      <router-link to="/posts">Posts</router-link> |
      <router-link to="/create-post">Poster</router-link> |||
      <router-link to="/profile">Profil</router-link> |
      <router-link @click="logout" to="/login" id="logout">Logout</router-link> ||
      <span class="bold blue">{{ username }}</span>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'LogoutHeader',
  data() {
    return {
      username: ""
    }
  },
  methods: {
    //Logs out to /login and deletes sessionStorage
    logout() {
      sessionStorage.removeItem("user");
      window.location.href="http://localhost:8080/login"
    }
  },
  mounted() {
    //Checks that the user is logged in to use username and theme, and if he isn't, redirects to /login
    if (sessionStorage.getItem("user") === null) {
      sessionStorage.removeItem("user");
      window.location.href="http://localhost:8080/login"
    }
    let userData = JSON.parse(sessionStorage.getItem("user"));
    this.username = userData.username;
    document.body.style.backgroundColor = userData.themeColor;
  }
}
</script>

<style>
.blue {
  color: blue;
}
</style>
