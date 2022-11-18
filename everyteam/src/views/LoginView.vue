<template>
  <v-app>
    <v-layout>
      <v-flex xs6 sm5 md4 lg3 xl2 style="position: relative; margin: auto">
        <h1>login page~~~~</h1>
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
          @click="loginValidateCheck"
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
          <v-btn color="error" class="mr-4" @click="signupValidateCheck">
            회원가입
          </v-btn>
        </v-overlay>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState, mapMutations } from "vuex";
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
    loginValidateCheck() {
      this.$refs.form.validate();
      if (this.loginValid & this.$refs.form.validate()) {
        this.login();
      }
    },
    async login() {
      //login test data
      //   {
      //      "id":"user2",
      //      "pwd":"21341234"
      //   }
      try {
        const res = await axios.post(`${BASE_URL}/login`, {
          id: this.loginId,
          pwd: this.loginPw,
        });
        console.log("로그인 성공!!");
        console.log("res:", res.data["result"]);
        localStorage.setItem("token", res.data["result"].token);
        localStorage.setItem("userId", res.data["result"].id);

        //store에 user정보 update -> 새로고침시 사라짐.. ㅜㅜ localstoreage에 저장하자
        // this.updateUserId(res.data["result"].id);
        // this.updateUserToken(res.data["result"].token);
        // console.log("store user token: ", this.userToken);
        // console.log("store user id: ", this.userId);
        this.loginId = "";
        this.loginPw = "";
        this.$router.push({ path: "/myGroups" });
      } catch (error) {
        console.log(error);
      }
    },
    openSignup() {
      this.overlay = true;
    },
    signupValidateCheck() {
      this.$refs.signupFrom.validate();
      if (this.signupValid & this.$refs.signupFrom.validate()) {
        this.signup();
        alert("회원가입이 완료되었습니다!");
        this.signupId = "";
        this.signupPw = "";
        this.overlay = false;
      }
    },
    async signup() {
      try {
        const res = await axios.post(`${BASE_URL}/join`, {
          id: this.signupId,
          pwd: this.signupPw,
        });
        console.log("회원가입 성공!!");
        console.log("res:", res);
      } catch (error) {
        console.log(error);
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
