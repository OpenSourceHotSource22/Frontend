<template>
  <v-app>
    <v-main :style="mainBackColor">
      <v-img v-if="teamTopImg == null" src="@/assets/groupBack.png" max-height="250">
        <!-- teamtopimg 추가 -->
        <v-dialog v-model="teamTopImgDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="1" color="#A3BBBC" dark small v-bind="attrs" v-on="on" class="mt-5" rounded bottom right
              absolute>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              그룹배경이미지 추가하기
            </v-card-title>

            <v-card-text>
              <v-file-input v-model="teamTopInputImg" show-size label="main페이지의 top이미지를 선택해주세요"
                @change="previewFile(teamTopInputImg)"></v-file-input>
              <img class="inputImg" :src="preview" />
            </v-card-text>
            <v-btn class="mb-5" @click="updateTeamTopImg"> 적용하기 </v-btn>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="teamTopImgDialog = false">
                닫기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-img>

      <v-img v-else :src="teamTopImg" max-height="250">
        <!-- teamtopimg 추가 -->
        <v-dialog v-model="teamTopImgDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="1" color="#A3BBBC" dark small v-bind="attrs" v-on="on" class="mt-5" rounded bottom right
              absolute>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              그룹배경이미지 추가하기
            </v-card-title>

            <v-card-text>
              <v-file-input v-model="teamTopInputImg" show-size label="main페이지의 top이미지를 선택해주세요"
                @change="previewFile(teamTopInputImg)"></v-file-input>
              <img class="inputImg" :src="preview" />
            </v-card-text>
            <v-btn class="mb-5" @click="updateTeamTopImg"> 적용하기 </v-btn>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="teamTopImgDialog = false">
                닫기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-img>

      <v-row>
        <!-- 그룹 정보 -->
        <v-col cols="2">
          <v-card :color="groupInfoBackColor" class="group rounded-lg mt-3 mb-10" elevation="0"
            style="color: whitesmoke">
            <v-avatar size="100px" class="mt-4">
              <img alt="Avatar" :src="teamProfileImg" />
            </v-avatar>

            <v-card-title class="justify-center text-h4">
              {{ teamName }}
            </v-card-title>
            <v-card-text style="color: whitesmoke">
              {{ teamDesc }}
            </v-card-text>
            <v-card-text>
              <!-- 그룹 list -->
              <v-menu open-on-hover top offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn :color="groupInfoBtnColor" v-on="on" elevation="0" fab style="color: whitesmoke">
                    {{ teamUserCount }}
                    <v-icon> mdi-account </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in teamUserList" :key="index">
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-text>
            <v-list-item-content class="mx-3">
              <!-- 초대하기 btn -->
              <v-dialog v-model="inviteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn :color="groupInfoBtnColor" dark v-bind="attrs" v-on="on" elevation="0"
                    style="color: whitesmoke">
                    초대하기
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5"> teamCode </v-card-title>

                  <v-card-text>
                    {{ teamCode }}
                    <v-icon @click="copy(teamCode)">mdi-content-copy</v-icon>
                  </v-card-text>

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
                  <v-btn :color="groupInfoBtnColor" dark v-bind="attrs" v-on="on" elevation="0" class="mt-3"
                    style="color: whitesmoke">
                    작성하기
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5"> 추가하기 </v-card-title>

                  <v-card-text>
                    <v-row class="ma-10" style="justify-content: space-between">
                      <v-btn rounded large color="primary" @click="$router.push({ path: '/post' })">post</v-btn>
                      <v-btn rounded large color="primary" @click="$router.push({ path: '/whenWeMeet' })">meet</v-btn>
                      <v-btn rounded large color="primary" @click="$router.push({ path: '/roles' })">role</v-btn>
                    </v-row>
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
              <v-select v-model="theme" :items="themeItems" label="theme"></v-select>
            </v-list-item-content>
          </v-card>
        </v-col>
        <!-- context 생성일 -->
        <v-col class="cardList" v-if="TeamPostListDate[0] != undefined">
          <!-- <v-select :items="items" label="Standard" v-model="select"></v-select> -->
          <v-row>
            <v-switch v-model="switch1" flat color="primary" :label="switch1 ? `항목별` : `생성일`"></v-switch>
          </v-row>
          <v-row v-if="!switch1" v-masonry item-selector=".item">
            <v-col v-for="(post, idx) in TeamPostListDate" :key="idx" cols="3" v-masonry-tile class="item">
              <v-card :id="post['category']" class="rounded-xl" @click="MeetCardClick(post)" :color="
                meetContent(post) == `진행중입니다`
                  ? `${meetCardColor}`
                  : `white`
              ">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5">
                      {{ post["title"] }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ createdAtSplit(post["createdAt"]) }}
                    </v-list-item-subtitle>

                    <v-row>
                      <v-col md="6" offset-md="3">
                        <v-list-item-subtitle style="
                            background-color: blanchedalmond;
                            border-radius: 5px;
                          ">
                          {{ post["category"] }}
                        </v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <!-- <v-row
                    v-if="post['category'] == `ROLE`"
                    v-for="role in roleContent(post)"
                  >
                    <v-col cols="2" v-for="result in role">{{ result }}</v-col>
                  </v-row> -->
                  <v-list-item v-if="post['category'] == `ROLE`" v-for="role in roleContent(post)">
                    <v-list-item-subtitle v-for="result in role">{{
                        result
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-card-text v-if="post['category'] == `ROLE_ROULETTE`">
                    {{ roleContent(post) }}
                  </v-card-text>
                  <v-card-text v-else-if="post['category'] == 'MEET'">
                    {{ meetContent(post) }}
                  </v-card-text>
                  <v-card-text v-else>
                    {{ post["content"] }}
                  </v-card-text>
                  <v-list-item class="grow">
                    <v-row justify="end">
                      <div style="
                          background-color: lightcyan;
                          padding: 10px;
                          border-radius: 50%;
                        ">
                        {{ post["userId"] }}
                      </div>
                    </v-row>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- context 항목별 -->
          <v-row v-else>
            <v-col>
              <v-sheet class="rounded-xl" style="background-color: #ebebeb">
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
                            createdAtSplit(post["createdAt"])
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-card-text>
                        {{ post["content"] }}
                      </v-card-text>
                      <v-list-item class="grow">
                        <v-row justify="end">
                          <div style="
                              background-color: lightcyan;
                              padding: 10px;
                              border-radius: 50%;
                            ">
                            {{ post["userId"] }}
                          </div>
                        </v-row>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="rounded-xl" style="background-color: #ebebeb">
                <p class="font-weight-light pt-3 mb-0" style="font-size: 20px">
                  whenWeMeet
                </p>
                <v-col v-for="(post, idx) in teamMeetList" :key="idx">
                  <v-card class="rounded-xl" @click="MeetCardClick(post)" :color="
                    meetContent(post) == `진행중입니다`
                      ? `${meetCardColor}`
                      : `white`
                  ">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5">
                          {{ post["title"] }}
                        </v-list-item-title>

                        <v-list-item-subtitle>{{
                            createdAtSplit(post["createdAt"])
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-card-text>
                        {{ meetContent(post) }}
                      </v-card-text>
                      <v-list-item class="grow">
                        <v-row justify="end">
                          <div style="
                              background-color: lightcyan;
                              padding: 10px;
                              border-radius: 50%;
                            ">
                            {{ post["userId"] }}
                          </div>
                        </v-row>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="rounded-xl" style="background-color: #ebebeb">
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
                            createdAtSplit(post["createdAt"])
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <!-- <v-card-text>
                        {{ roleContent(post) }}
                      </v-card-text> -->
                      <v-list-item v-if="post['category'] == `ROLE`" v-for="role in roleContent(post)">
                        <v-list-item-subtitle two-line v-for="result in role">{{
                            result
                        }}</v-list-item-subtitle>
                      </v-list-item>

                      <v-card-text v-if="post['category'] == `ROLE_ROULETTE`">
                        {{ roleContent(post) }}
                      </v-card-text>

                      <v-list-item class="grow">
                        <v-row justify="end">
                          <div style="
                              background-color: lightcyan;
                              padding: 10px;
                              border-radius: 50%;
                            ">
                            {{ post["userId"] }}
                          </div>
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
        <v-col v-else>
          <div class="pa-16">
            <v-alert type="info" dense border="left" prominent>
              + 버튼을 눌러 기능을 사용해보세요 !!
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      teamName: localStorage.getItem("teamName"),
      teamCode: localStorage.getItem("teamCode"),
      teamDesc: localStorage.getItem("teamDesc"),
      teamProfileImg: localStorage.getItem("teamProfileImg"),
      teamTopImg: localStorage.getItem("teamTopImg"),
      inviteDialog: false,
      plusDialog: false,
      teamTopImgDialog: false,
      teamTopInputImg: [],
      invite: false,
      preview: "",
      tab: null,
      switch1: false,
      items: ["생성일s", "항목별"],
      select: "",
      teamUserList: [],
      teamPostList: [],
      teamMeetList: [],
      teamRoleList: [],
      TeamPostListDate: [],
      // color

      theme: "basic",
      themeItems: ["basic", "earth", "purple", "indigo"],
    };
  },
  computed: {
    mainBackColor() {
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
    groupInfoBackColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["groupInfoBackColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["groupInfoBackColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["groupInfoBackColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["groupInfoBackColor"];
      }
    },
    groupInfoBtnColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["groupInfoBtnColor"];
      }
    },
    meetCardColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["meetCardColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["meetCardColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["meetCardColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["meetCardColor"];
      }
    },
    teamUserCount() {
      return this.teamUserList.length;
    },
    ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
      groupList: "groupList",
    }),
  },
  methods: {
    ...mapMutations("themeStore", {
      updateTheme: "updateTheme",
    }),
    // ...mapActions("themeStore", {
    //   actionTheme: "actionTheme",
    // }),

    copy(copyText) {
      navigator.clipboard.writeText(copyText).then(function () {
        alert("클립보드에 복사되었습니다");
      });
      this.inviteDialog = false;
    },
    createdAtSplit(date) {
      return date.split(" ")[0];
    },
    roleContent(post) {
      if (post["category"] == "ROLE") {
        // console.log(Object.keys(post["roles"]).length);
        var str = "";
        var arr = [];
        var prettyArr = [];
        for (var i = 0; i < Object.keys(post["roles"]).length; i++) {
          prettyArr.push("|");
        }
        arr.push(Object.keys(post["roles"]));
        arr.push(prettyArr);
        arr.push(Object.values(post["roles"]));
        // console.log("arr", arr);
        //사다리타기
        for (var i = 0; i < Object.keys(post["roles"]).length; i++) {
          str +=
            Object.keys(post["roles"])[i] +
            " - " +
            Object.values(post["roles"])[i] +
            "/";
        }
        return arr;
      } else if (post["category"] == "ROLE_ROULETTE") {
        //룰렛
        return "당첨자 : " + post["content"];
      }
    },
    meetContent(post) {
      if (
        post["category"] == "MEET" &&
        post["content"].split("/")[0] != "result"
      ) {
        return "진행중입니다";
      } else if (post["category"] == "MEET") {
        //마감완료된 카드
        return "만나는시간: " + post["content"].split("/")[1];
      }
    },
    inviteButtonClick() {
      console.log("초대하기 버튼이 클릭되었습니다");
    },

    async getTeamPostListDate() {
      try {
        const res = await axios.get(`${BASE_URL}/team/${this.teamCode}/date`, {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("팀 생성일 불러오기 성공");
        console.log("getTeamPostListdate:", res.data["result"]["postList"]);
        this.TeamPostListDate = res.data["result"]["postList"].reverse();
        console.log("TeamPostListDate", this.TeamPostListDate[0]);
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
        console.log("getTeamPostList:", res.data["result"]);
        this.teamPostList = res.data["result"]["postList"]["post"].reverse();
        this.teamMeetList = res.data["result"]["postList"]["meet"].reverse();
        this.teamRoleList = res.data["result"]["postList"]["role"].reverse();
        //팀 상단 이미지 저장
        console.log("팀 상단 이미지", res.data["result"]["team"].topImgUrl);
        this.teamTopImg = res.data["result"]["team"].topImgUrl;
        localStorage.setItem("teamTopImg", this.teamTopImg),
          //teamuserlist update
          console.log("userlist:", res.data["result"]["userList"]);
        this.teamUserList = res.data["result"]["userList"];
      } catch (error) {
        console.log(error);
      }
    },
    MeetCardClick(post) {
      // console.log("split test", post["content"].split("/")[0]);
      // console.log("카드클릭", post["content"]);
      if (
        post["category"] == "MEET" &&
        post["content"].split("/")[0] != "result"
      ) {
        // this.$router.push({
        //   path: "/WhenWeMeetResult",
        //   name: "WhenWeMeetResult",
        //   params: { meetCode: post["content"].split("/")[0] },
        // });
        localStorage.setItem("meetCode", post["content"].split("/")[0]);
        this.$router.push({
          path: "/WhenWeMeetResult",
        });
      } else if (post["category"] == "ROLE") {
        //사다리타기
        // this.roleCardClick();
      }
    },
    roleCardClick() {
      alert("롤카드");
      document.getElementById("ROLE").style.width = "700px";
    },
    async updateTeamTopImg() {
      if (this.preview != "") {
        const data = new FormData();
        const teamData = {
          teamCode: this.teamCode,
        };
        data.append(
          "team",
          new Blob([JSON.stringify(teamData)], { type: "application/json" })
        );
        data.append("image", this.teamTopInputImg);

        try {
          const res = await axios.put(`${BASE_URL}/team/updateTopImage`, data, {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("팀 top img update 성공!!");
          console.log("res:", res);
          this.teamTopImgDialog = false;
          this.$router.go();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("사진을 선택해주세요!");
      }
    },
    previewFile(file) {
      if (this.teamTopInputImg != null) {
        const filedata = (data) => {
          this.preview = data;
        };
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener(
          "load",
          function () {
            filedata(reader.result);
          },
          false
        );
      } else {
        this.preview = "";
      }
    },
  },
  mounted() {
    console.log("컬러", this.basicTheme["groupInfoBackColor"]);
    // 컬러 변경해주기

    console.log("파라미터", this.$route.params.test);
    //페이지가 다시 불릴때 마다 불러짐
    console.log("메인페이지 마운티드");
    // this.getTeamUserList();
    this.getTeamPostList();
    this.getTeamPostListDate();
  },
  watch: {
    theme() {
      // localStorage.setItem("theme", this.theme);
      this.updateTheme(this.theme);
      console.log("store theme", this.themeStore);
      // const payload = {
      //   theme: this.theme,
      // };
      // this.actionTheme(payload);
    },
  },
};
</script>
<style>
.main {
  background-color: #f5f5f5;
}

.btn_gotop {
  display: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  border: 1px solid #ccc;
  outline: none;
  background-color: white;
  color: #333;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 100%;
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

.inputImg {
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 400px;
}
</style>
