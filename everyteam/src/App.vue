<template>
  <div id="app">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
      app
      style="padding: 20px"
    >
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

          <v-list-item style="background-color: lightblue; margin-top: 10px">
            <v-list-item-title :style="logoColor" @click="goMyGroupsPage">
              나의 그룹리스트
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app v-if="showAppBar">
      <v-app-bar-nav-icon @click="clickDrawer"></v-app-bar-nav-icon>

      <div @click="$router.push({ path: '/main' })">
        <!-- <v-img src="@/assets/everyteamBar.png" width="100"></v-img> -->
        <h3 :style="logoColor">everyteam</h3>
      </div>
      <!-- 마이페이지 -->
      <div style="position: absolute; position: fixed; right: 160px">
        <v-menu rounded bottom min-width="200px" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <span class="white--text text-h5">son</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text text-h5">SON</span>
                </v-avatar>
                <h3>{{ userId }}</h3>
                <p class="text-caption mt-1">jieun@naver.com</p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="profile">
                  프로필 변경
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="myCalender()">
                  마이캘린더
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
      <!-- ///마이페이지 -->
      <div style="position: absolute; position: fixed; top: 10px; right: 50px">
        <v-btn @click="logout">로그아웃</v-btn>
      </div>
    </v-app-bar>

    <router-view />
    <v-footer padless>
      <v-card flat tile width="100%" class="text-center">
        <v-card-text class="white--text">
          <strong>EVERYTEAM</strong>
          <v-btn class="mx-4" icon @click="goGithub">
            <v-icon size="24px"> mdi-github </v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>created by 웅나쓰자</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
      theme: localStorage.getItem("theme"),
    };
  },
  methods: {
    clickDrawer() {
      this.drawer = !this.drawer;
      document.getElementById("start").scrollTo(0, 0);
    },
    goGithub() {
      window.open("https://github.com/OpenSourceHotSource22", "_blank");
    },
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
      this.$router.push({ path: "/main" });
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
    goMyGroupsPage() {
      this.$router.push({ path: "/mygroups" });
    },
    myCalender() {
      this.$router.push({ path: "/mycalendar" });
    },
    profile() {
      this.$router.push({ path: "/profile" });
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
    logoColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["logoColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["logoColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["logoColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["logoColor"];
      }
    },
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
        this.$route.name == "createGroup" ||
        this.$route.name == "mycalendar"
      ) {
        this.drawer = false;
        this.showAppBar = false;
      } else if (this.$route.name == "main") {
        this.getUserGroupList();
        this.showAppBar = true;
      } else {
        this.getUserGroupList();
        this.showAppBar = true;
      }
    },
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    console.log("selectedidx", this.selectedItem);
    if (
      this.$route.name == "login" ||
      this.$route.name == "intro" ||
      this.$route.name == "myGroups" ||
      this.$route.name == "createGroup" ||
      this.$route.name == "mycalendar"
    ) {
      this.showAppBar = false;
    } else if (this.$route.name == "main") {
      this.showAppBar = true;
      this.getUserGroupList();
    } else {
      this.getUserGroupList();
      this.showAppBar = true;
    }
    console.log("router: ", this.routerName);
    // this.getUserGroupList();
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
  // background-color: #f5f5f5;
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
