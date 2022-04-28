<template>
  <footer>
    <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo groupomania">
    <div>
      <h3>Contact</h3>
      <p>Addresse</p>
      <p>Téléphone</p>
      <p>E-mail</p>
    </div>
    <div>
      <h3>Management</h3>
      <p>Agent 1</p>
      <p>Agent 2</p>
      <p>Agent 3</p>
    </div>
    <div>
      <h3>Règles</h3>
      <p>Règle 1</p>
      <p>Règle 2</p>
      <p>Règle 3</p>
    </div>
  </footer>
</template>

<script>
export default {
    name: "FooterTemp"
}
</script>

<style lang="scss">
footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #7ff9ff;
  & img {
    height: 110px;
    margin: 0 40%;
  }
  & div {
    width: 30%;
    margin: 25px 0;
  }
}
</style>