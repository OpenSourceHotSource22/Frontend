<template>
  <v-app :style="myGroupsBackColor">
    <v-main>
      <div class="myGroups">
        <v-row>
          <v-col>
            <h2>{{ userId }}님의 그룹리스트</h2>
          </v-col>

          <v-dialog v-model="plusBtnClick" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="green" dark v-bind="attrs" v-on="on"> + </v-btn>
            </template>

            <v-card>
              <v-card-title class="justify-center align-center">
                <v-btn @click="joinGroupBtn = !joinGroupBtn"> 그룹 가입 </v-btn>
              </v-card-title>

              <div
                v-show="joinGroupBtn"
                style="margin: 20px; padding: 20px; border-radius: 5px"
                class="green lighten-2"
              >
                그룹코드를 입력하세요
                <v-row>
                  <v-col cols="9">
                    <div class="ma-auto" style="max-width: 300px">
                      <v-otp-input
                        v-model="teamCode"
                        length="6"
                        dark
                      ></v-otp-input>
                    </div>
                  </v-col>

                  <v-col cols="2" class="my-3">
                    <v-btn block :disabled="!isActive" @click="joinGroup"
                      >Ready</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
              <v-card-title class="justify-center align-center">
                <v-btn @click="goCreateGroupPage"> 그룹 생성 </v-btn>
              </v-card-title>

              <v-card-actions class="justify-center align-center">
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="primary" text @click="plusBtnClick = false">
                  x
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- user team list -->
        <div class="container">
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="4"
              v-for="(group, idx) in userGroups"
              :key="idx"
            >
              <v-card class="mx-auto" @click="teamCardClick(group)">
                <v-img
                  v-if="group['team'].imgUrl != null"
                  :src="`${group['team'].imgUrl}`"
                  height="250px"
                ></v-img>

                <v-img v-else src="@/assets/groupProfile.png"> </v-img>

                <v-card-title> {{ group["team"].name }} </v-card-title>

                <v-card-subtitle>
                  {{ group["team"].description }}
                </v-card-subtitle>
                <v-card-subtitle>
                  {{ group.countUser }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
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
      plusBtnClick: false,
      joinGroupBtn: false,
      teamCode: "",
      // myGroupsBackColor: "#f5f5f5",
    };
  },
  mounted() {
    // TODO: 사용자가 속한 그룹들 불러오기..........
    this.getUserGroupList();
    console.log(this.userToken);
  },
  computed: {
    myGroupsBackColor() {
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
    ...mapState("userStore", {
      // userId: "userId",
      userToken: "userToken",
      userGroups: "userGroups",
    }),
    ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
    }),
    isActive() {
      // console.log(this.teamCode);
      return this.teamCode.length === 6;
    },
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
        const res = await axios.get(`${BASE_URL}/user/teamList`, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("그룹리스트 불러오기 성공!!");
        this.updateUserGroups(res.data["result"]["team"]);
        console.log("res:", res.data["result"]["team"]);
        // 유저의 테마 저장하기
        console.log("theme: ", res.data["result"]["user"].color);
        localStorage.setItem("theme", res.data["result"]["user"].color);
      } catch (error) {
        console.log(error);
      }
    },
    goMainPage() {
      //TODO: group이름 저장해서 넘기기
      // this.updateGroupName(group["name"]);
      this.$router.push({
        name: "main",
        params: { teamCode: "123" },
      });
    },

    goCreateGroupPage() {
      this.$router.push({ path: "/createGroup" });
    },
    async joinGroup() {
      //TODO: api joingroup사용해서 그룹에 들어가기...구현

      try {
        const res = await axios.post(
          `${BASE_URL}/team/join`,
          {
            teamCode: this.teamCode,
          },
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        console.log("팀가입 성공!!");
        console.log("res:", res);
        alert(`${this.teamCode}그룹에 들어갔습니다`);
        this.teamCode = "";
        this.joinGroupBtn = false;
        this.plusBtnClick = false;
        //새로고침해줌
        this.$router.go();
      } catch (error) {
        alert(error["response"].data["message"]);
        console.log(error["response"].data["message"]);
        this.teamCode = "";
      }
    },
    teamCardClick(team) {
      localStorage.setItem("teamName", team["team"].name);
      localStorage.setItem("teamCode", team["team"].code);
      localStorage.setItem("teamDesc", team["team"].description);
      localStorage.setItem("teamProfileImg", team["team"].imgUrl);
      localStorage.setItem("teamTopImg", team["team"].topImgUrl);
      localStorage.setItem("teamUserCount", team.countUser);
      // alert(
      //   team["team"].name +
      //     team["team"].code +
      //     team["team"].description +
      //     team["team"].imgUrl +
      //     team["team"].topImgUrl +
      //     team.countUser
      // );
      //TODO: 팀코드를 local에 저장하기
      //라우터로 main페이지로 넘기기
      this.$router.push({
        path: "/main",
        name: "main",
        params: { test: 33333 },
      });
    },
  },
};
</script>

<style>
.myGroups {
  margin: 30px;
}

.container {
  padding: 30px;
}
</style>
