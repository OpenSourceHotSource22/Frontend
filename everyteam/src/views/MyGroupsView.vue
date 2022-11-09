<template>
  <v-app>
    <v-main>
      <div class="myGroups">
        <h1>mygroups page</h1>
        <v-btn @click="goMain">웅나쓰자</v-btn>
        <br />
        <v-btn @click="goCreateGroupPage">creategroup</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
export default {
  data() {
    return {
      token: "",
    };
  },
  mounted() {
    // TODO: 사용자가 속한 그룹들 불러오기..........
    console.log(localStorage.getItem("token"));
    this.token = localStorage.getItem("token");
    this.userGroupList();
  },
  methods: {
    async userGroupList() {
      try {
        const res = await axios.get(`${BASE_URL}/team`, {
          headers: {
            "X-AUTH-TOKEN": this.token,
          },
        });
        console.log("그룹리스트 불러오기 성공!!");
        console.log("res:", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    goMain() {
      this.$router.push({ path: "/main" });
    },
    goCreateGroupPage() {
      this.$router.push({ path: "/createGroup" });
    },
  },
};
</script>
