<template>
  <div id="app">
    <v-app-bar app color="blue" flat v-if="showAppBar">
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

      <!-- <div style="position: absolute; position: fixed; top: 10px; right: 50px">
        <v-menu open-on-hover top offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab small color="pink" v-on="on">
              <v-icon> mdi-account </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in groupList" :key="index">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              초대하기
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              선택하시오
            </v-card-title>

            <v-card-text> 초대링크 </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false"> 닫기 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn @click="logout">로그아웃</v-btn>
      </div> -->
      <div style="position: absolute; position: fixed; top: 10px; right: 50px">
        <v-btn @click="logout">로그아웃</v-btn>
      </div>
    </v-app-bar>

    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      showAppBar: true,
    };
  },
  methods: {
    logout() {
      //localstoreage에 저장된 값을 삭제해줌
      localStorage.setItem("token", "");
      localStorage.setItem("userId", "");
      this.$router.push({ path: "/login" });
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
        this.showAppBar = false;
      } else {
        this.showAppBar = true;
      }
    },
  },
  mounted() {
    if (
      this.$route.name == "login" ||
      this.$route.name == "intro" ||
      this.$route.name == "myGroups" ||
      this.$route.name == "createGroup"
    ) {
      this.showAppBar = false;
    } else {
      this.showAppBar = true;
    }
    console.log("router: ", this.routerName);
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
