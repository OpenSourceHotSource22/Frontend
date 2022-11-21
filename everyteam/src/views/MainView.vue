<template>
  <v-app>
    <v-main class="main">
      <v-img src="@/assets/groupBack.png" max-height="250"></v-img>

      <v-row>
        <!-- 그룹 정보 -->
        <v-col cols="2">
          <v-card color="#FDFFAA" class="group rounded-lg" elevation="0">
            <v-avatar size="100px">
              <img alt="Avatar" :src="teamProfileImg" />
            </v-avatar>

            <v-card-title class="text-h5">
              {{ teamName }}
            </v-card-title>
            <v-card-text> {{ teamDesc }} </v-card-text>
            <v-card-text> {{ teamUserCount }} 명 </v-card-text>
            <v-list-item-content class="mx-3">
              <!-- 그룹 list -->
              <v-menu open-on-hover top offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="#a8dba8" v-on="on" elevation="0">
                    <v-icon> mdi-account </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in teamUserList"
                    :key="index"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- 초대하기 btn -->
              <v-dialog v-model="inviteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="#79bd9a"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    elevation="0"
                    class="mt-5"
                  >
                    초대하기
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    teamCode
                  </v-card-title>

                  <v-card-text> {{ teamCode }} </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="inviteDialog = false">
                      닫기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- +btn -->
              <v-dialog v-model="plusDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="#3b8686"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    elevation="0"
                    class="mt-5"
                    style="color: aliceblue; font-size: 25px"
                  >
                    +
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    추가하기
                  </v-card-title>

                  <v-card-text>
                    <router-link to="/post">post</router-link>|
                    <router-link to="/roles">Roles</router-link>|
                    <router-link to="/whenWeMeet">whenwemeet</router-link>|
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="plusDialog = false">
                      닫기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-content>
          </v-card>
        </v-col>
        <!-- context -->
        <v-col class="cardList">
          <!-- <v-select :items="items" label="Standard" v-model="select"></v-select> -->
          <v-row>
            <v-switch
              v-model="switch1"
              flat
              color="indigo darken-3"
              :label="switch1 ? `항목별` : `생성일`"
            ></v-switch>
          </v-row>
          <v-row v-if="!switch1" v-masonry item-selector=".item">
            <v-col
              v-for="(post, idx) in TeamPostListDate"
              :key="idx"
              cols="4"
              v-masonry-tile
              class="item"
            >
              <v-card class="rounded-xl" @click="MeetCardClick(post)">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5">
                      {{ post["title"] }}
                    </v-list-item-title>

                    <v-list-item-subtitle>{{
                      post["createdAt"]
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <v-card-text>
                    {{ post["content"] }}
                  </v-card-text>
                  <v-card-text>
                    {{ post["roles"] }}
                  </v-card-text>
                  <v-list-item class="grow">
                    <v-row justify="end">
                      <span class="subheading">
                        <v-list-item-avatar color="grey lighten-3">
                          {{ post["userId"] }}
                        </v-list-item-avatar></span
                      >
                    </v-row>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-sheet class="rounded-xl">
                <p class="font-weight-light pt-3 mb-0" style="font-size: 20px">
                  post
                </p>

                <v-col v-for="(post, idx) in teamPostList" :key="idx">
                  <v-card class="rounded-xl">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5">
                          {{ post["title"] }}
                        </v-list-item-title>

                        <v-list-item-subtitle>{{
                          post["createdAt"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-card-text>
                        {{ post["content"] }}
                      </v-card-text>
                      <v-list-item class="grow">
                        <v-row justify="end">
                          <span class="subheading">
                            <v-list-item-avatar color="grey lighten-3">
                              {{ post["userId"] }}
                            </v-list-item-avatar></span
                          >
                        </v-row>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="rounded-xl">
                <p class="font-weight-light pt-3 mb-0" style="font-size: 20px">
                  whenWeMeet
                </p>
                <v-col v-for="(post, idx) in teamMeetList" :key="idx">
                  <v-card class="rounded-xl" @click="MeetCardClick(post)">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5">
                          {{ post["title"] }}
                        </v-list-item-title>

                        <v-list-item-subtitle>{{
                          post["createdAt"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-card-text>
                        {{ post["content"] }}
                      </v-card-text>
                      <v-list-item class="grow">
                        <v-row justify="end">
                          <span class="subheading">
                            <v-list-item-avatar color="grey lighten-3">
                              {{ post["userId"] }}
                            </v-list-item-avatar></span
                          >
                        </v-row>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="rounded-xl">
                <p class="font-weight-light pt-3 mb-0" style="font-size: 20px">
                  Role
                </p>
                <v-col v-for="(post, idx) in teamRoleList" :key="idx">
                  <v-card class="rounded-xl">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5">
                          {{ post["title"] }}
                        </v-list-item-title>

                        <v-list-item-subtitle>{{
                          post["createdAt"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-card-text>
                        {{ post["content"] }}
                      </v-card-text>
                      <v-card-text>
                        {{ post["roles"] }}
                      </v-card-text>
                      <v-list-item class="grow">
                        <v-row justify="end">
                          <span class="subheading">
                            <v-list-item-avatar color="grey lighten-3">
                              {{ post["userId"] }}
                            </v-list-item-avatar></span
                          >
                        </v-row>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
      teamName: localStorage.getItem("teamName"),
      teamCode: localStorage.getItem("teamCode"),
      teamDesc: localStorage.getItem("teamDesc"),
      teamProfileImg: localStorage.getItem("teamProfileImg"),
      teamTopImg: localStorage.getItem("teamTopImg"),
      teamUserCount: localStorage.getItem("teamUserCount"),
      inviteDialog: false,
      plusDialog: false,
      invite: false,
      tab: null,
      switch1: false,
      items: ["생성일s", "항목별"],
      select: "",
      teamUserList: [],
      teamPostList: [],
      teamMeetList: [],
      teamRoleList: [],
      TeamPostListDate: [],
    };
  },
  computed: {
    ...mapState("userStore", {
      userId: "userId",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
      groupList: "groupList",
    }),
  },
  methods: {
    //함수 넣으면 됨
    ...mapMutations("userStore", {
      updateUserId: "updateUserId",
    }),
    inviteButtonClick() {
      console.log("초대하기 버튼이 클릭되었습니다");
    },
    // async getTeamUserList() {
    //   try {
    //     const res = await axios.get(`${BASE_URL}/role/userList`, {
    //       params: {
    //         teamCode: localStorage.getItem("teamCode"),
    //       },
    //       headers: {
    //         "X-AUTH-TOKEN": localStorage.getItem("token"),
    //       },
    //     });
    //     console.log("팀 유저 불러오기 성공!!");
    //     console.log("teamUserList:", res.data["result"]);
    //     this.teamUserList = res.data["result"];
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getTeamPostListDate() {
      try {
        const res = await axios.get(`${BASE_URL}/team/${this.teamCode}/date`, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("팀 생성일 불러오기 성공");
        console.log("getTeamPostList:", res.data["result"]["postList"]);
        this.TeamPostListDate = res.data["result"]["postList"];
        //teamuserlist update
      } catch (error) {
        console.log(error);
      }
    },
    async getTeamPostList() {
      try {
        const res = await axios.get(
          `${BASE_URL}/team/${this.teamCode}/category`,
          {
            // params: {
            //   teamCode: localStorage.getItem("teamCode"),
            // },
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        console.log("팀 postlist 불러오기 성공");
        console.log("getTeamPostList:", res.data["result"]["postList"]);
        this.teamPostList = res.data["result"]["postList"]["post"];
        this.teamMeetList = res.data["result"]["postList"]["meet"];
        this.teamRoleList = res.data["result"]["postList"]["role"];
        //teamuserlist update
        console.log("userlist:", res.data["result"]["userList"]);
        this.teamUserList = res.data["result"]["userList"];
      } catch (error) {
        console.log(error);
      }
    },
    MeetCardClick(post) {
      // console.log("split test", post["content"].split("/")[0]);
      console.log(typeof post["content"]);
      if (
        post["category"] == "MEET" &&
        post["content"].split("/")[0] != "result"
      ) {
        this.$router.push({
          path: "/WhenWeMeetResult",
          name: "WhenWeMeetResult",
          params: { meetCode: post["content"].split("/")[0] },
        });
      }
    },
  },
  mounted() {
    console.log("파라미터", this.$route.params.test);
    //페이지가 다시 불릴때 마다 불러짐
    console.log("메인페이지 마운티드");
    // this.getTeamUserList();
    this.getTeamPostList();
    this.getTeamPostListDate();
  },
  watch: {
    //값이 바뀔 때 마다 action을 취하기 위해서는 여기 넣어두면 됨!
  },
};
</script>
<style>
.main {
  background-color: #83c882;
}
.cardList {
  margin: 30px;
}
.group {
  padding: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
.card {
  border-radius: 10%;
}
</style>
