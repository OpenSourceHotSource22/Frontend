<template>
  <v-app :style="createGroupsBackColor">
    <v-container>
      <v-flex>
        <h1>CreateGroup</h1>
        <v-col>
          <v-text-field
            v-model="groupName"
            :prepend-icon="icon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="그룹이름을 입력하세요"
            type="text"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-textarea
            v-model="description"
            solo
            label="그룹 설명"
            clearable
            rows="10"
          ></v-textarea>
        </v-col>
        <v-col>
          <v-file-input
            v-model="profileImg"
            show-size
            label="그룹의 프로필 사진을 선택해주세요"
            @change="previewFile(profileImg)"
          ></v-file-input>
          <img class="img" :src="preview" />
        </v-col>
        <v-col>
          <v-btn @click="createGroup" color="blue">그룹생성하기</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="goMyGroupsPage">go Mygroups </v-btn>
        </v-col>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState } from "vuex";
export default {
  data: () => ({
    show: false,
    groupName: "",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
    description: "",
    profileImg: [],
    preview: "",
    teamcode: "",
  }),

  mounted() {
    // this.createGroup();
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
    createGroupsBackColor() {
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
    ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
    }),
  },

  methods: {
    async createGroup() {
      const data = new FormData();
      data.append("image", this.profileImg);
      const teamData = {
        name: this.groupName,
        description: this.description,
      };

      // formData.append('key', new Blob([ JSON.stringify(data) ], {type : "application/json"}));
      data.append(
        "team",
        new Blob([JSON.stringify(teamData)], { type: "application/json" })
      );
      // data.append("team", {
      //   name: this.groupName,
      //   description: this.description,
      // });

      // console.log("formdata:", formdata.entries());
      // for (var pair of data.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      if (this.groupName == "" || this.description == "") {
        alert("내용을 모두 입력해주세요!");
      } else {
        try {
          const res = await axios.post(`${BASE_URL}/team/create`, data, {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          });
          alert(res.data["message"]);
          console.log("팀생성 성공!!");
          console.log("res:", res);
          this.$router.push({ path: "/myGroups" });
        } catch (error) {
          console.log(error);
        }
      }
    },

    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
      alert("완료");
    },
    clearMessage() {
      this.groupName = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    goMyGroupsPage() {
      this.$router.push({ path: "/myGroups" });
    },
    previewFile(file) {
      if (this.profileImg != undefined) {
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
  watch: {
    profileImg() {
      console.log("이미지", this.profileImg);
      const data = new FormData();
      data.append("profileImg", this.profileImg);
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    },
  },
};
</script>

<style>
.img {
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 400px;
  border-radius: 40%;
}
</style>
