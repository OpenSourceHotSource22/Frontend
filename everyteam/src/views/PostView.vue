<template>
  <v-app>
    <v-main>
      <div class="post">
        <h1>post page</h1>

        <template>
          <v-container fluid>
            <v-text-field v-model="post_Title" outlined label="title" clearable></v-text-field>
            <v-textarea v-model="post_Context" clearable outlined label="Text"></v-textarea>
          </v-container>
          <v-btn color="primary" @click="makePost">제출</v-btn>
        </template>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
export default {
  data() {
    return {
      post_Title: "",
      post_Context: "",
      msg: "hi",
    };
  },
  methods: {
    async makePost() {
      if (this.post_Context != "" && this.post_Title != "") {
        axios
          .post(
            `${BASE_URL}/post`,
            {
              teamCode: localStorage.getItem("teamCode"),
              title: this.post_Title,
              content: this.post_Context,
              category: "POST",
            },
            {
              headers: {
                "X-AUTH-TOKEN": localStorage.getItem("token"),
              },
            }
          )
          .then(function (res) {
            console.log("post 완료", res.data);
          })
          .catch(function (err) {
            console.log(err);
          });

        this.$router.push({
          path: "/main",
        });
      } else {
        alert("내용/제목을 입력해주세요!");
      }
    },
  },
  // watch: {
  //   post_Title: function () {
  //     console.log(this.post_Title);
  //   },
  //   post_Context: function () {
  //     console.log(this.post_Context);
  //   },
  // },
};
</script>
