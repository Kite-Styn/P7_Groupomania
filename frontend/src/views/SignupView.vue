<template>
  <div class="signup">
    <LogoutHeader/>
    <main>
      <p class="citation">"Un réseau social interne, moderne et ludique, qui permet aux employés de se connaître dans un cadre plus informel."</p>
      <h1>Créer un compte</h1>
      <form>
        <div>
          <label for="first name">Prénom<span class="required">*</span> : </label>
          <input @keydown="filterFirstName" type="text" name="first name" id="first_name">
          <p class="first-name-invalid error-invalid">Veuillez entrer un prénom valide</p>
        </div>
        <div>
          <label for="last name">Nom<span class="required">*</span> : </label>
          <input @keydown="filterLastName" type="text" name="last name" id="last_name">
          <p class="last-name-invalid error-invalid">Veuillez entrer un nom valide</p>
        </div>
        <div>
          <label for="email">E-mail<span class="required">*</span> : </label>
          <input @keydown="filterEmail" type="text" name="email" id="email">
          <p class="email-invalid error-invalid">Veuillez entrer un e-mail valide</p>
        </div>
        <div>
          <label for="password">Mot de passe<span class="required">*</span> : </label>
          <input @keydown="filterPassword" type="text" name="password" id="password">
          <p class="password-invalid error-invalid">Veuillez entrer un mot de passe valide</p>
        </div>
        <div>
          <label for="photo">Ajouter une photo :</label>
          <input type="file" id="picture" accept=".png, .jpg, .jpeg">
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
let invalidFirstName = false;
let invalidLastName = false;
let invalidEmail = false;
let invalidPassword = false;
export default {
  name: "SignupView",
  components: {
    LogoutHeader,
    FooterTemp
  },
  methods: {
    filterFirstName() {
      document.getElementById("first_name").addEventListener("input", function(e) {
        if (Store.state.regexName.test(e.target.value) && e.target.value !== "") {
          document.getElementsByClassName("first-name-invalid")[0].style.display = "none";
          invalidFirstName = false
        } else {
          document.getElementsByClassName("first-name-invalid")[0].style.display = "initial";
          invalidFirstName = true
        }
      })
    },
    filterLastName() {
      document.getElementById("last_name").addEventListener("input", function(e) {
        if (Store.state.regexName.test(e.target.value) && e.target.value !== "") {
          document.getElementsByClassName("last-name-invalid")[0].style.display = "none";
          invalidLastName = false
        } else {
          document.getElementsByClassName("last-name-invalid")[0].style.display = "initial";
          invalidLastName = true
        }
      })
    },
    filterEmail() {
      document.getElementById("email").addEventListener("input", function(e) {
        if (Store.state.regexEmail.test(e.target.value) && e.target.value !== "") {
          document.getElementsByClassName("email-invalid")[0].style.display = "none";
          invalidEmail = false
        } else {
          document.getElementsByClassName("email-invalid")[0].style.display = "initial";
          invalidEmail = true
        }
      })
    },
    filterPassword() {
      document.getElementById("password").addEventListener("input", function(e) {
        if (e.target.value !== "") {
          document.getElementsByClassName("password-invalid")[0].style.display = "none";
          invalidPassword = false
        } else {
          document.getElementsByClassName("password-invalid")[0].style.display = "initial";
          invalidPassword = true
        }
      })
    },
    signup() {
      let user = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      if (invalidFirstName === false && user.first_name !== "" && invalidLastName === false && user.last_name !== "" && invalidEmail === false && user.email !== "" && invalidPassword === false && user.password !== "") {
        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .catch(function(err) {
          console.log(err)
        });
        //window.location.href="http://localhost:8080/login"
      }
    },
    login() {
      let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(function(res) {
        if (res.ok) {
          console.log(res.json());
          return res.json();
        }
      })
      .catch(function(err) {
        console.log(err)
      });
    }
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
  width: 120px;
  height: 40px;
  font-size: large;
}

.required {
  color: red;
}
</style>