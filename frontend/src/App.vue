<template>
  <div id="app">
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

@media (min-width: 501px) and (max-width: 900px) {
  body {
    margin: 0 5%;
  }
}

@media (max-width: 500px) {
  body {
    margin: 0 2px;
  }
}
</style>
