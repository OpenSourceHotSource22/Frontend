<template>
  <v-app :style="BackGroundColor">
    <v-main>
      <div class="post">
        <h1 class="mt-10">post</h1>
        <editor
          api-key="2a8jyeuhltv0bq3alulb9uzo2tlgbb5q2b827iek63ejo66i"
          :init="{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          }"
        />
        <!-- <template>
          <v-container fluid>
            <v-text-field
              v-model="post_Title"
              outlined
              label="title"
              clearable
            ></v-text-field>
            <v-textarea
              v-model="post_Context"
              clearable
              outlined
              label="Text"
              rows="10"
              shaped
            ></v-textarea>
          </v-container>
          <v-btn color="primary" @click="makePost">제출</v-btn>
        </template> -->
      </div>
      <v-btn @click="submit">제출</v-btn>
      <div v-html="postValue"></div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState } from "vuex";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      post_Title: "",
      post_Context: "",
      msg: "hi",
      postValue: "",
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
    submit() {
      var content = tinymce.activeEditor.getContent();
      this.postValue = content;
      console.log(content);
    },
  },
  computed: {
    ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
    }),
    BackGroundColor() {
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
