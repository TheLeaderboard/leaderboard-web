<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>Login</h1>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs12 sm10 md8 lg6>
                <v-form 
                  v-model="valid"
                  ref="form"
                  id="loginForm"
                  @submit.prevent="submitLogin">
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
                        autocomplete="current-password"
                        :rules="passwordRules"
                        required
                    ></v-text-field>
                    <v-btn
                    :disabled="!valid"
                    type="submit"
                    form="loginForm">Login</v-btn>
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
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length > 7 || "Password must be 8 characters or more"
    ]
  }),
  methods: {
    submitLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const userData = {
          email: this.email.trim(),
          password: this.password
        };
        axios
          .post(`${process.env.VUE_APP_API_BASE}/api/users/login`, userData)
          .then(res => {
            const { token } = res.data;
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
