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
          <p class="email-invalid error-invalid">Veuillez entrer un e-mail valide</p>
        </div>
        <div>
          <label for="password">Mot de passe<span class="required">*</span> : </label>
          <input type="password" name="password" id="password">
          <p class="password-invalid error-invalid">Veuillez entrer un mot de passe valide<br>8 caractères minimum</p>
        </div>
        <p class="required">* Champs requis</p>
      </form>
      <p v-if="wrongId" class="red">Identifiants incorrects</p>
      <button @click="login">Login</button>
    </main>
    <FooterTemp/>
  </div>
</template>

<script>
import LogoutHeader from "@/components/LogoutHeader.vue";
import FooterTemp from "@/components/Footer.vue";
import Store from "@/store/index.js";
let invalidEmail = false;
let invalidPassword = false;
export default {
  name: "LoginView",
  components: {
    LogoutHeader,
    FooterTemp
  },
  data() {
    return {
      wrongId: false
    }
  },
  methods: {
    //Takes the inputs and sends them to the api if they are valid
    async login() {
      let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      if (invalidEmail === false && user.email !== "" && invalidPassword === false && user.password !== "") {
        let resLog = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(user)
        });
        if (!resLog.ok) {
          this.wrongId = true;
          throw new Error()
        }
        let dataLog = await resLog.json();
        console.log(dataLog);
        sessionStorage.setItem("user", JSON.stringify(dataLog));
        window.location.href="http://localhost:8080/posts"
      }
    }
  },
  mounted() {
    //Checks the inputs with regex
    document.getElementById("email").addEventListener("input", function(e) {
      if (Store.state.regexEmail.test(e.target.value) && e.target.value !== "") {
        document.getElementsByClassName("email-invalid")[0].style.display = "none";
        invalidEmail = false
      } else {
        document.getElementsByClassName("email-invalid")[0].style.display = "initial";
        invalidEmail = true
      }
    });
    document.getElementById("password").addEventListener("input", function(e) {
      if (Store.state.regexPass.test(e.target.value) && e.target.value !== "") {
        document.getElementsByClassName("password-invalid")[0].style.display = "none";
        invalidPassword = false
      } else {
        document.getElementsByClassName("password-invalid")[0].style.display = "initial";
        invalidPassword = true
      }
    });
  }
}
</script>

<style lang="scss">
</style>