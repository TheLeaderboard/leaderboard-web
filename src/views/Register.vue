<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>Sign Up</h1>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs12 sm10 md8 lg6>
                <v-form 
                  v-model="valid"
                  ref="form"
                  id="registerForm"
                  @submit.prevent="submitRegister">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    :rules="usernameRules"
                    required
                    autofocus></v-text-field>
                  <v-text-field
                    v-model="name"
                    label="Name"
                    :rules="nameRules"
                    required></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="passwordRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirm password"
                        type="password"
                        :rules="confirmPasswordRules"
                        required
                    ></v-text-field>
                    <v-btn
                    :disabled="!valid"
                    type="submit"
                    form="registerForm">Sign up</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
        <FullScreenLoadingModal v-if="loading"/>
    </v-container>
</template>

<script>
import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";
import jwtDecode from "jwt-decode";
import FullScreenLoadingModal from "@/components/layout/FullScreenLoadingModal.vue";

export default {
  components: {
    FullScreenLoadingModal: FullScreenLoadingModal
  },
  data: () => ({
    loading: false,
    valid: false,
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    name: "",
    nameRules: [v => !!v || "Name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length > 7 || "Password must be 8 characters or more"
    ],
    confirmPassword: "",
    confirmPasswordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    submitRegister() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const userData = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.confirmPassword
        };
        axios
          .post(`${process.env.VUE_APP_API_BASE}/api/users/register`, userData)
          .then(res => {
            const { token } = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwtDecode(token);
            this.$store.dispatch("setCurrentUser", decoded);
            this.loading = false;
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: center;
}
</style>
