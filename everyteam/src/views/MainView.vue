<template>
  <v-app>
    <v-main>
      <v-card color="#A3D4A2">
        <v-img src="@/assets/groupBack.png" max-height="250"></v-img>

        <v-row>
          <!-- 그룹 정보 -->
          <v-col cols="3">
            <v-card color="#FDFFAA" class="group">
              <v-avatar size="100px">
                <img alt="Avatar" :src="teamProfileImg" />
              </v-avatar>

              <v-card-title class="text-h5">
                {{ teamName }}
              </v-card-title>
              <v-card-text> {{ teamDesc }} </v-card-text>
              <v-card-text> {{ teamUserCount }} 명 </v-card-text>
              <v-list-item-content>
                <!-- 그룹 list -->
                <v-menu open-on-hover top offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="pink" v-on="on">
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
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
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
                      <v-btn color="primary" text @click="dialog = false">
                        닫기
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- group list -->
                <v-btn color="primary"> + </v-btn>
              </v-list-item-content>
            </v-card>
          </v-col>
          <!-- context -->
          <v-col>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card color="basil" flat>
                  <div v-if="item == '생성일'">
                    <v-card-text>
                      <v-row>
                        <v-col v-for="n in 24" :key="n" cols="3">
                          <v-card height="200"></v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                  <div v-else>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <v-sheet rounded="lg" min-height="268">
                            게시물

                            <v-col v-for="n in 6" :key="n">
                              <v-card height="200"></v-card>
                            </v-col>
                          </v-sheet>
                        </v-col>

                        <v-col>
                          <v-sheet min-height="70vh" rounded="lg">
                            whenWeMeet
                            <v-col v-for="n in 3" :key="n">
                              <v-card height="200"></v-card>
                            </v-col>
                          </v-sheet>
                        </v-col>

                        <v-col>
                          <v-sheet>
                            역할 정하기
                            <v-col v-for="n in 4" :key="n">
                              <v-card height="200"></v-card>
                            </v-col>
                            <!--  -->
                          </v-sheet>
                        </v-col>

                        <v-col>
                          <v-sheet>
                            투표
                            <v-col v-for="n in 4" :key="n">
                              <v-card height="200"></v-card>
                            </v-col>
                            <!--  -->
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card>
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

      dialog: false,
      invite: false,
      tab: null,
      items: ["생성일", "항목별"],
      teamUserList: [],
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
        this.teamUserList = res.data["result"];
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    //페이지가 다시 불릴때 마다 불러짐
    console.log("메인페이지 마운티드");
    this.getTeamUserList();
  },
  watch: {
    //값이 바뀔 때 마다 action을 취하기 위해서는 여기 넣어두면 됨!
  },
};
</script>
<style>
.group {
  padding: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
