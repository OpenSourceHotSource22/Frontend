<template>
  <v-app>
    <v-main>
      <v-container class="roles my-5">
        <h1>역할고르기</h1>
        <v-btn class="mx-5 my-5" @click="goToRoulette"> 룰렛 </v-btn>
        <v-btn class="my-5" @click="goToGhostLeg"> 사다리타기 </v-btn>
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