<template>
  <div class="login">
    <LogoutHeader/>
    <main>
      <p class="citation">"Un réseau social interne, moderne et ludique, qui permet aux employés de se connaître dans un cadre plus informel."</p>
      <h1>Se connecter</h1>
      <form>
        <div>
          <label for="email">E-mail<span class="required">*</span> : </label>
          <input type="text" name="email" id="email">
          <p class="email-invalid, error-invalid">Veuillez entrer un e-mail valide</p>
        </div>
        <div>
          <label for="password">Mot de passe<span class="required">*</span> : </label>
          <input type="text" name="password" id="password">
          <p class="password-invalid, error-invalid">Veuillez entrer un mot de passe valide</p>
        </div>
        <p class="required">* Champs requis</p>
      </form>
      <button>Confirmer</button>
    </main>
    <FooterTemp/>
  </div>
</template>

<script>
import LogoutHeader from "@/components/LogoutHeader.vue";
import FooterTemp from "@/components/Footer.vue";
export default {
  name: "LoginView",
  components: {
    LogoutHeader,
    FooterTemp
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

</style>