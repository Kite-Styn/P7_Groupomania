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
      <router-link @click="logout" to="/login" id="logout">Logout</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'LogoutHeader',
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      window.location.href="http://localhost:8080/login"
    }
  },
  mounted() {
    if (sessionStorage.getItem("user") === null) {
      sessionStorage.removeItem("user");
      window.location.href="http://localhost:8080/login"
    }
    let userData = JSON.parse(sessionStorage.getItem("user"));
    document.body.style.backgroundColor = userData.themeColor;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
