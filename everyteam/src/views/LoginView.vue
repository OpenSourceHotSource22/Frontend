<template>
  <v-app>
    <v-layout>
      <v-flex xs6 sm5 md4 lg3 xl2 style="position: relative; margin: auto">
        <h1>login page</h1>
        <v-form ref="form" v-model="loginValid" lazy-validation>
          <v-text-field
            v-model="loginId"
            :rules="idRules"
            label="Id"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="loginPw"
            :append-icon="loginPwShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="pwRules"
            :type="loginPwShow ? 'text' : 'password'"
            name="input-10-2"
            label="PW"
            class="input-group--focused"
            @click:append="loginPwShow = !loginPwShow"
            outlined
            required
          ></v-text-field>
        </v-form>

        <v-btn
          :disabled="!loginValid"
          color="success"
          class="mr-4"
          @click="validateCheck"
        >
          로그인
        </v-btn>

        <v-btn color="error" class="mr-4" @click="openSignup"> 회원가입 </v-btn>

        <v-overlay :opacity="opacity" :value="overlay">
          <div
            style="
              position: absolute;
              position: fixed;
              top: 200px;
              right: 100px;
            "
          >
            <v-btn fab color="green" @click="overlay = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-form ref="signupFrom" v-model="signupValid" lazy-validation>
            <v-text-field
              v-model="signupId"
              :rules="idRules"
              label="signupId"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="signupPw"
              :append-icon="signupPwShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="pwRules"
              :type="signupPwShow ? 'text' : 'password'"
              name="input-10-2"
              label="signupPw"
              class="input-group--focused"
              @click:append="signupPwShow = !signupPwShow"
              outlined
              required
            ></v-text-field>
          </v-form>
          <v-btn color="error" class="mr-4" @click="signup"> 회원가입 </v-btn>
        </v-overlay>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
export default {
  data: () => ({
    overlay: false,
    opacity: 1,
    loginValid: true,
    loginId: "",
    loginPw: "",
    loginPwShow: false,
    signupId: "",
    signupPw: "",
    signupValid: true,
    signupPwShow: false,
    idRules: [
      (v) => !!v || "id is required",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    pwRules: [
      (v) => !!v || "pw is required",
      // (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    // valid: true,
  }),

  methods: {
    validateCheck() {
      this.$refs.form.validate();
      if (this.loginValid & this.$refs.form.validate()) {
        this.login();
      }
    },
    async login() {
      //test data
      //   {
      //      "id":"user2",
      //      "pwd":"21341234"
      //   }
      try {
        const res = await axios.post(`${BASE_URL}/login`, {
          id: this.loginId,
          pwd: this.loginPw,
        });
        console.log("res:", res);
        console.log("로그인 성공!!");
      } catch (error) {
        console.log(error);
      }
    },
    openSignup() {
      this.overlay = true;
    },
    signup() {
      this.$refs.signupFrom.validate();
      if (this.signupValid & this.$refs.signupFrom.validate()) {
        alert("회원가입");
        this.overlay = false;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
