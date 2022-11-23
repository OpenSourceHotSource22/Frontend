<template>
  <v-app>
    <v-main>
      <v-container class="roles my-3">
        <h1>역할고르기</h1>
        <v-row class="my-5">
          <v-col>
            <v-card class="my-5" @click="goToRoulette" style="height:550px; border-radius: 10%;">

              <v-img src="../assets/roulettePicture.png" max-height="550">
                <v-card-text style="position:absolute; top:50%; font-weight: bold; font-size: large;"></v-card-text>
              </v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="my-5" @click="goToGhostLeg" style="height:481px; border-radius:10%">
              <v-img src="../assets/loveLine.png" contain>
                <v-card-text style="position:absolute; top:50%; font-weight: bold; font-size: large;">
                </v-card-text>
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

  },
  mounted() {
    this.getTeamUserList();
  }
};
</script>

<style>

</style>