<template>
  <v-app :style="BackGroundColor">
    <v-main>
      <v-container class="roles my-3">
        <h1>역할고르기</h1>
        <v-row class="my-5">
          <v-col>
            <v-card class="leftPic my-5" @click="goToRoulette" style="height:550px; border-radius: 10%;">
              <v-img src="../assets/roulettePicture.png" max-height="550">
                <v-card-text style="position:absolute; top:50%; font-weight: bold; font-size: large;  ">
                </v-card-text>
              </v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="my-5" @click="goToGhostLeg" style="height:550px; border-radius:10%; border-color: black;">
              <v-img src="../assets/Frame 1.png" max-height="550">
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { BASE_URL } from "@/api";
import axios from "axios";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tempUsers: [],
    }
  },
  methods: {
    ...mapMutations("rolesStore", {
      updateTeamUsers: "updateTeamUsers",
    }),

    goToRoulette() {
      this.$router.push({ path: "/roulette" });
    },
    goToGhostLeg() {
      this.$router.push({ path: "/ghostLeg" });
    },
    async getTeamUserList() {
      try {
        const res = await axios.get(`${BASE_URL}/role/userList`, {
          params: {
            teamCode: localStorage.getItem("teamCode"),
          },
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("팀 유저 불러오기 성공!!");
        console.log("teamUserList:", res.data["result"]);
        for (let i = 0; i < res.data["result"].length; i++) {
          this.tempUsers[i] = { value: String(res.data["result"][i]) };
          console.log(this.tempUsers[i]);
        }
        //this.$store.commit("updateTeamUsers", this.tempUsers);
        this.updateTeamUsers(this.tempUsers);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
    }),
    BackGroundColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["mainBackColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["mainBackColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["mainBackColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["mainBackColor"];
      }
    },
  },
  mounted() {
    this.getTeamUserList();
  }
};
</script>

<style>

</style>