<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold text-h2 basil--text">{{ groupName }}</h1>

          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                  +
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  선택하시오
                </v-card-title>

                <v-card-text>
                  <router-link to="/post">post</router-link>|
                  <router-link to="/roles">Roles</router-link>|
                  <router-link to="/whenWeMeet">whenwemmet</router-link>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-title>
        <v-row>
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
                            <!--  -->
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
                            <!--  -->
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

          <!-- <v-col cols="3">
            <v-card outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    사용자
                  </v-list-item-title>
                  <div v-for="user in groupList" :key="user">
                    <v-list-item-subtitle>{{ user }}</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <div class="text-center">
                  <v-dialog v-model="invite" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="green lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click="inviteButtonClick"
                      >
                        초대하기
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 grey lighten-2">
                        초대링크
                      </v-card-title>

                      <v-card-text> 링크 </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="invite = false">
                          닫기
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card-actions>
            </v-card>
          </v-col> -->
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "성호",
      dialog: false,
      invite: false,
      tab: null,
      items: ["생성일", "항목별"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    ...mapState("userStore", {
      userName: "userName",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
      groupList: "groupList",
    }),
  },
  methods: {
    //함수 넣으면 됨
    ...mapMutations("userStore", {
      updateUserName: "updateUserName",
    }),
    inviteButtonClick() {
      console.log("초대하기 버튼이 클릭되었습니다");
    },
  },
  mounted() {
    //페이지가 다시 불릴때 마다 불러짐
    console.log("메인페이지 마운티드");
  },
  watch: {
    //값이 바뀔 때 마다 action을 취하기 위해서는 여기 넣어두면 됨!
    userName: function () {
      console.log("사용자 이름이 변경되었습니다!");
    },
  },
};
</script>
