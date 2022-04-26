<template>
  <div class="signup">
    <LogoutHeader/>
    <main>
      <h1>Créer un compte</h1>
      <form>
        <div>
          <label for="first name">Prénom<span>*</span> : </label>
          <input type="text" name="first name" id="first_name">
        </div>
        <div>
          <label for="last name">Nom<span>*</span> : </label>
          <input type="text" name="last name" id="last_name">
        </div>
        <div>
          <label for="email">E-mail<span>*</span> : </label>
          <input type="text" name="email" id="email">
        </div>
        <div>
          <label for="password">Mot de passe<span>*</span> : </label>
          <input type="text" name="password" id="password">
        </div>
        <div>
          <label for="photo">Ajouter une photo :</label>
          <button>Ajouter</button>
        </div>
        <p>* Champs requis</p>
      </form>
      <button>Confirmer</button>
    </main>
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import LogoutHeader from "@/components/LogoutHeader.vue";
export default {
  name: "SignupView",
  components: {
    LogoutHeader
  }
}
/*// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}*/
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10%;
  & div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
  & span {
    color: red;
  }
  & input {
    width: 55%;
    height: 25px;
  }
  & p {
    color: red;
  }
}
</style>