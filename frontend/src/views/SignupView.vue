<template>
  <div class="signup">
    <LogoutHeader/>
    <main>
      <p class="citation">"Un réseau social interne, moderne et ludique, qui permet aux employés de se connaître dans un cadre plus informel."</p>
      <h1>Créer un compte</h1>
      <form>
        <div>
          <label for="username">Nom d'utilisateur<span class="required">*</span> : </label>
          <input @keydown="filterUsername" type="text" name="username" id="username">
          <p class="username-invalid error-invalid">Veuillez entrer un nom d'utilisateur valide<br>4 caractères minimum<br>caractères invalides: {{ invalidCharacters }} et espaces</p>
        </div>
        <div>
          <label for="email">E-mail<span class="required">*</span> : </label>
          <input @keydown="filterEmail" type="text" name="email" id="email">
          <p class="email-invalid error-invalid">Veuillez entrer un e-mail valide</p>
        </div>
        <div>
          <label for="password">Mot de passe<span class="required">*</span> : </label>
          <input @keydown="filterPassword" type="password" name="password" id="password">
          <p class="password-invalid error-invalid">Veuillez entrer un mot de passe valide<br>8 caractères minimum</p>
        </div>
        <p class="required">* Champs requis</p>
      </form>
      <button @click="signup">Confirmer</button>
    </main>
    <FooterTemp/>
  </div>
</template>

<script>
import LogoutHeader from "@/components/LogoutHeader.vue";
import FooterTemp from "@/components/Footer.vue";
import Store from "@/store/index.js";
let invalidUsername = false;
let invalidEmail = false;
let invalidPassword = false;
export default {
  name: "SignupView",
  components: {
    LogoutHeader,
    FooterTemp
  },
  data() {
    return {
      invalidCharacters: "^±!@£$%^&*+¡€#¢§¶•ªº()\"'«\\/{}[]~<>?:;|=.,"
    }
  },
  methods: {
    //Takes the inputs and sends them to the api if they are valid
    async signup() {
      let user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      if (invalidUsername === false && user.username !== "" && invalidEmail === false && user.email !== "" && invalidPassword === false && user.password !== "") {
        let res = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(user)
        });
        if (!res.ok) {
          throw new Error()
        }
        let data = await res.json();
        console.log(data);
        //Uncomment below to also login after a signup and go to posts (and delete the redirect to login)
        /*let resLog = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(user)
        });
        if (!resLog.ok) {
          throw new Error()
        }
        let dataLog = await resLog.json();
        console.log(dataLog);
        sessionStorage.setItem("user", JSON.stringify(dataLog));
        window.location.href="http://localhost:8080/posts"*/
        window.location.href="http://localhost:8080/login"
      }
    },
  },
  mounted() {
    //Checks the inputs with regex
    document.getElementById("username").addEventListener("input", function(e) {
      if (Store.state.regexName.test(e.target.value) && e.target.value !== "") {
        document.getElementsByClassName("username-invalid")[0].style.display = "none";
        invalidUsername = false
      } else {
        document.getElementsByClassName("username-invalid")[0].style.display = "initial";
        invalidUsername = true
      }
    }),
    document.getElementById("email").addEventListener("input", function(e) {
      if (Store.state.regexEmail.test(e.target.value) && e.target.value !== "") {
        document.getElementsByClassName("email-invalid")[0].style.display = "none";
        invalidEmail = false
      } else {
        document.getElementsByClassName("email-invalid")[0].style.display = "initial";
        invalidEmail = true
      }
    }),
    document.getElementById("password").addEventListener("input", function(e) {
      if (Store.state.regexPass.test(e.target.value) && e.target.value !== "") {
        document.getElementsByClassName("password-invalid")[0].style.display = "none";
        invalidPassword = false
      } else {
        document.getElementsByClassName("password-invalid")[0].style.display = "initial";
        invalidPassword = true
      }
    })
  }
};
</script>

<style lang="scss">
main {
  margin-bottom: 50px;
}

.citation {
  font-size: larger;
  font-style: italic;
  text-align: center;
  margin: 40px 20%;
  border: double;
  padding: 20px;
}

h1 {
  margin: 35px 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 10% 35px 10%;
  & div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 10px;
    align-items: baseline;
    flex-wrap: wrap;
  }
  & input {
    width: 55%;
    height: 25px;
  }
  & .error-invalid {
    color: red;
    display: none;
    width: 100%;
  }
}

button {
  background-color: blue;
  color: white;
  border-radius: 15%/50%;
  min-width: 120px;
  min-height: 40px;
  font-size: large;
  padding: 10px;
}

.required {
  color: red;
}

@media (max-width: 500px) {
  form {
    margin: 0;
    & div {
      width: 90%;
    }
  }
}
</style>