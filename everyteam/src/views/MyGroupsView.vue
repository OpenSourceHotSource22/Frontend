<template>
  <v-app style="background-color: #e5e5bf">
    <v-main>
      <div class="myGroups">
        <v-row>
          <v-col>
            <h2>{{ userId }}님의 프로젝트</h2>
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
                style="margin-top: 30px; margin-bottom: 30px"
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
                <v-btn> 그룹 생성 </v-btn>
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

        <div class="container">
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="4"
              v-for="(group, idx) in userGroups"
              :key="idx"
            >
              <v-card class="mx-auto" max-width="344">
                <v-img :src="`${group['team'].imgUrl}`" height="250px"></v-img>

                <v-card-title> {{ group["team"].name }} </v-card-title>

                <v-card-subtitle>
                  {{ group["team"].description }}
                </v-card-subtitle>
                <v-card-subtitle> {{ group.countUser }} </v-card-subtitle>
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
      team: [
        {
          team: {
            teamIdx: 1,
            name: "team1",
            code: "SEqjXh",
            imgUrl:
              "https://storage.googleapis.com/weave_bucket/everyTeam_SEqjXh",
            description: "team1생성",
            topImgUrl: null,
          },
          countUser: 3,
        },
        {
          team: {
            teamIdx: 5,
            name: "team2",
            code: "bkQsvL",
            imgUrl:
              "https://storage.googleapis.com/weave_bucket/everyTeam_bkQsvL",
            description: "team2생성",
            topImgUrl: null,
          },
          countUser: 1,
        },
      ],
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
        console.log("store:", this.userGroups);
      } catch (error) {
        console.log(error);
      }
    },
    goMainPage(group) {
      //TODO: group이름 저장해서 넘기기
      // this.updateGroupName(group["name"]);
      this.$router.push({ path: "/main" });
    },

    goCreateGroupPage() {
      this.$router.push({ path: "/createGroup" });
    },
    joinGroup() {
      //TODO: api joingroup사용해서 그룹에 들어가기...구현
      alert(`${this.teamCode}그룹에 들어갔습니다`);
      this.teamCode = "";
      this.joinGroupBtn = false;
      this.plusBtnClick = false;
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
