<template>
  <div id="app">
    <v-navigation-drawer v-model="drawer" absolute app style="padding: 20px">
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-subheader>{{ userId }} Groups</v-subheader>
          <v-list-item
            v-for="(group, idx) in userGroupList"
            :key="idx"
            style="padding-top: 10px"
          >
            <v-list-item-title @click="goToGroupMain(group, idx)">{{
              group["team"].name
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="blue" flat v-if="showAppBar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      everyTeam
      <nav>
        <router-link to="/">Intro</router-link> |
        <router-link to="/login">Login</router-link>|
        <router-link to="/mygroups">mygroups</router-link> |
        <router-link to="/createGroup">GreateGroup</router-link>|
        <router-link to="/main">main</router-link>|
        <router-link to="/post">post</router-link>|
        <router-link to="/roles">Roles</router-link>|
        <router-link to="/whenWeMeet">whenwemeet</router-link>|
        <router-link to="/example">example</router-link>
      </nav>

      <div style="position: absolute; position: fixed; top: 10px; right: 50px">
        <v-btn @click="logout">로그아웃</v-btn>
      </div>
    </v-app-bar>

    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { BASE_URL } from "@/api";
export default {
  data() {
    return {
      selectedItem: localStorage.getItem("selectedItem"),
      userId: localStorage.getItem("userId"),
      dialog: false,
      showAppBar: true,
      drawer: false,
      group: null,
      userGroupList: [],
    };
  },
  methods: {
    logout() {
      //localstoreage에 저장된 값을 삭제해줌
      localStorage.setItem("token", "");
      localStorage.setItem("userId", "");
      this.$router.push({ path: "/login" });
    },
    async getUserGroupList() {
      try {
        const res = await axios.get(`${BASE_URL}/user/teamList`, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        this.userGroupList = res.data["result"]["team"];
        console.log("dreawer:", res.data["result"]["team"]);
      } catch (error) {
        console.log(error);
      }
    },
    goToGroupMain(team, idx) {
      // console.log("idx", idx);
      localStorage.setItem("selectedItem", idx);
      localStorage.setItem("teamName", team["team"].name);
      localStorage.setItem("teamCode", team["team"].code);
      localStorage.setItem("teamDesc", team["team"].description);
      localStorage.setItem("teamProfileImg", team["team"].imgUrl);
      localStorage.setItem("teamTopImg", team["team"].topImgUrl);
      localStorage.setItem("teamUserCount", team.countUser);
      //새로고침해줌
      this.$router.go();
    },
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
    ...mapState("groupStore", {
      groupList: "groupList",
    }),
  },
  watch: {
    routerName() {
      if (
        this.$route.name == "login" ||
        this.$route.name == "intro" ||
        this.$route.name == "myGroups" ||
        this.$route.name == "createGroup"
      ) {
        this.drawer = false;
        this.showAppBar = false;
      } else if (this.$route.name == "main") {
        this.getUserGroupList();
        this.showAppBar = true;
      } else {
        this.showAppBar = true;
      }
    },
    group() {
      this.drawer = false;
    },
    // drawer() {
    //   this.getUserGroupList();
    // },
  },
  mounted() {
    console.log("selectedidx", this.selectedItem);
    if (
      this.$route.name == "login" ||
      this.$route.name == "intro" ||
      this.$route.name == "myGroups" ||
      this.$route.name == "createGroup"
    ) {
      this.showAppBar = false;
    } else if (this.$route.name == "main") {
      this.showAppBar = true;
      this.getUserGroupList();
    } else {
      this.showAppBar = true;
    }
    console.log("router: ", this.routerName);
    this.getUserGroupList();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
