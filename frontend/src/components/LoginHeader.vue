<template>
  <header>
    <div id="banner">
      <img src="../assets/icon-above-font.png" alt="Logo groupomania">
      <p>Réseau Social d'Entreprise</p>
    </div>
    <nav id="nav">
      <router-link to="/posts">Posts</router-link> |
      <router-link to="/create-post">Créer un post</router-link> |
      <router-link to="/my-posts">Mes posts</router-link> |||
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/" id="logout">Logout</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'LogoutHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
