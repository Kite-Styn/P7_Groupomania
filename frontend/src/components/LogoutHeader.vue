<template>
  <header>
    <div id="banner">
      <img src="../assets/icon-above-font.png" alt="Logo groupomania">
      <p>Réseau Social d'Entreprise</p>
    </div>
    <nav id="nav">
      <router-link to="/">Signup</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
    name: "LogoutHeader",
    mounted() {
      //Checks if the user is logged in and redirects to /login if he isn't
      if (sessionStorage.getItem("user") !== null) {
        window.location.href="http://localhost:8080/posts"
      }
    }
}
</script>

<style lang="scss">
header {
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: 0 5% 30px 5%;
  border-bottom: #7ff9ff solid;
  padding-top: 5px;
  flex-wrap: wrap;
  & img {
    height: 70px;
  }
  & p {
    color: red;
    align-self: center;
    font-size: xx-large;
    padding-left: 50px;
  }
}

#banner {
  display: flex;
  align-items: center;
}

nav {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  justify-content: center;
  & a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  & span {
    word-wrap: break-word;
  }
}

@media (max-width: 500px) {
  header {
    margin: 0 1% 30px 1%;
    flex-wrap: wrap;
    height: auto;
    & img {
      height: 130px;
    }
    & p {
      margin: 0;
      padding: 0;
    }
  }
  nav {
    width: 90%;
    padding: 20px;
  }
}
</style>