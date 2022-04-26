<template>
  <div id="app">
    <!--<header>
      <nav>
        <router-link to="/">Signup</router-link> |
        <router-link to="/login">Login</router-link>
      </nav>
    </header>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #c2bebe;
  margin: 0 20%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

</style>
