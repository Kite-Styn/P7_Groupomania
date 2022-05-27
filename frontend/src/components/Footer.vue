<template>
  <footer>
    <img src="../assets/icon-left-font-monochrome-black.png" alt="Logo groupomania">
    <div>
      <h3>Contact</h3>
      <p>Addresse : <br>Rue du Banc</p>
      <p>Téléphone : <br>01 23 45 67 89</p>
      <p>E-mail : <br>groupomail@gmail.com</p>
    </div>
    <div>
      <h3>Management</h3>
      <p>Pierre Dufond</p>
      <p>Sophie Mara</p>
      <p>Rose Tess</p>
    </div>
    <div>
      <h3>Règles</h3>
      <p>1. Restez polis</p>
      <p>2. Respectez vous</p>
      <p>3. Ne postez rien d'illégal</p>
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

@media (max-width: 900px) {
  footer {
    & div {
      word-wrap: break-word;
      font-size: small;
    }
  }
}
</style>