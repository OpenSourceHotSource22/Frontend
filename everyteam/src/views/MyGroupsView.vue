<template>
  <v-app>
    <v-main>
      <div class="myGroups">
        <v-col>
          <h1>mygroups page</h1>
          <h2>{{ userId }}</h2>
        </v-col>
        <v-col
          v-for="(group, idx) in userGroups"
          :key="idx"
          @click="goMainPage(group)"
        >
          <v-btn>
            {{ group["name"] }}
          </v-btn>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-dialog v-model="joinGroupClick" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="green"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="joinGroup"
                >
                  ㄴ> 그룹 가입
                </v-btn>
              </template>

              <v-card shaped elevation="2">
                <v-card-title class="text-h5 grey lighten-2">
                  그룹 들어가기
                </v-card-title>

                <v-card-text> 초대코드 </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="joinGroupClick = false">
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
        <v-col>
          <v-btn @click="goCreateGroupPage" color="primary"
            >+ 그룹 만들기</v-btn
          >
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
      joinGroupClick: false,
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

        //store에 저장... 굳이 해야될까?
        this.updateUserGroups(res.data["result"].team);
        console.log("store usergrouplist:", this.userGroups);
      } catch (error) {
        // console.log(error);
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
    joinGroup() {
      //그룹 리드트에 들어가기

      //그룹 리스트에 들어간 다음에 다시 유저 그룹을 불러준다
      this.getUserGroupList();
    },
  },
};
</script>
