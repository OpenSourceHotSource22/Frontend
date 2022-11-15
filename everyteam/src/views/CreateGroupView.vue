<template>
  <v-app>
    <v-container>
      <v-flex>
        <h1>GreateGroup</h1>
        <v-col>
          <v-text-field
            v-model="groupName"
            :append-outer-icon="groupName ? 'mdi-send' : ''"
            :prepend-icon="icon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="그룹이름을 입력하세요"
            type="text"
            @click:append-outer="createGroup"
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
          <v-btn @click="goMyGroupsPage" color="pink"> Mygroups </v-btn>
        </v-col>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
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
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  methods: {
    async createGroup() {
      try {
        const res = await axios.post(
          `${BASE_URL}/team`,
          {
            name: this.groupName,
          },
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        console.log("팀생성 성공!!");
        console.log("res:", res);
        this.$router.push({ path: "/myGroups" });
      } catch (error) {
        console.log(error);
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
    },
  },
  watch: {
    profileImg() {
      console.log(this.profileImg);
      const formdata = new FormData();
      formdata.append("profileImg", this.profileImg);
      console.log("formdata:", formdata);
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
