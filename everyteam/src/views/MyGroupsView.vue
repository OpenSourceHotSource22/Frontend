<template>
  <v-app>
    <v-main>
      <div class="myGroups">
        <v-col>
          <h1>mygroups page</h1>
          <h2>{{ userId }}</h2>
        </v-col>
        <v-col v-for="group in userGroups" @click="goMainPage(group)">
          <v-btn>
            {{ group["name"] }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="goCreateGroupPage" color="primary">createGroup</v-btn>
        </v-col>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },
  mounted() {
    // TODO: 사용자가 속한 그룹들 불러오기..........
    this.getUserGroupList();
    console.log(this.userToken);
  },
  computed: {
    ...mapState("userStore", {
      // userId: "userId",
      userToken: "userToken",
      userGroups: "userGroups",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
    }),
  },
  methods: {
    ...mapMutations("userStore", {
      updateUserGroups: "updateUserGroups",
    }),
    ...mapMutations("groupStore", {
      updateGroupName: "updateGroupName",
    }),
    async getUserGroupList() {
      try {
        const res = await axios.get(`${BASE_URL}/team`, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("그룹리스트 불러오기 성공!!");
        console.log("res:", res.data);
        this.updateUserGroups(res.data["result"].team);
        console.log("store usergrouplist:", this.userGroups);
      } catch (error) {
        console.log(error);
      }
    },
    goMainPage(group) {
      // console.log("gomainpage group", group["name"]);
      this.updateGroupName(group["name"]);
      this.$router.push({ path: "/main" });
    },

    goCreateGroupPage() {
      this.$router.push({ path: "/createGroup" });
    },
  },
};
</script>
