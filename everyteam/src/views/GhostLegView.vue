
<template>
  <v-app>
    <v-main>
      <div class="roles">
        <div class="tooltip">
          <h1 style="margin-top:20px; margin-bottom:20px;" id="Title">사랑의 작대기</h1>
          <span class="tooltiptext">이건 툴팁입니다.</span>
        </div>
        <v-btn @click="goRolsPage" style="margin-bottom:20px;">선택메뉴 가기 </v-btn>
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-text-field label="제목작성" clearable outlined id="textInsert"></v-text-field>
          </v-col>
          <v-col></v-col>
        </v-row>
      </div>
      <v-card class="container" id="mainVue">
        <v-row class="isValid">
          <v-col class="pt-5">
            <v-btn :disabled="isStart" @click="minus" class="mx-4" v-bind:disabled="buttonDisable2"> - </v-btn>
            {{ count }}
            <v-btn :disabled="isStart" @click="plus" id="plusBtn" class="mx-4" v-bind:disabled="buttonDisable3"> +
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="startBtn my-5" @click="start">시작하기</v-btn>
          </v-col>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <div v-if="isStart">
          <v-row class="mt-3">
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(n)" :key="idx" class="mx-3 my-0" label="Name" clearable outlined
                v-model="textField[n - 1]" no-gutters>
              </v-text-field>
            </div>
          </v-row>

          <canvas id="canvas" width="3000" height="300"></canvas>

          <v-row class="mt-1">
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(-n)" :key="idx" class="mx-3" label="Role" clearable outlined
                v-model="resultField[n - 1]"></v-text-field>
            </div>
          </v-row>
        </div>
        <v-btn @click="confirm" class="check" v-bind:disabled="buttonDisable">확인하기</v-btn>
        <v-btn color="success" @click="submit" v-bind:disabled="isStart2">Submit</v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { BASE_URL } from "@/api";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      textInput: "",
      buttonDisable: true,
      buttonDisable2: false,
      buttonDisable3: false,
      datas: [

      ],
      position: [

      ],
      textField: [
      ],
      resultField: [

      ],
      saved: [
      ],
      count: 0,
      isStart: false,
      myText: '',
      isStart2: true,
    };
  },
  computed: {
  },
  watch: {
    warning() {
      console.log("count가작습니다.");
      if (this.count <= 0) {
        this.buttonDisable2 = true;
      }
    },
  },
  methods: {
    async submit() {
      let text = document.getElementById("textInsert").value;
      if (text.length <= 1) {
        alert("두글자 이상 입력해주세요!");
        goRolsPage();
      }
      this.textInput = document.getElementById("textInsert").value;
      axios
        .post(
          `${BASE_URL}/role/create`,
          {
            teamCode: localStorage.getItem("teamCode"),
            title: this.textInput,
            role: this.saved,
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
    },
    goRolsPage() {
      this.$router.push({ path: "/roles" });
    },
    plus() {
      if (this.count <= 0) {
        this.buttonDisable2 = false;
      }
      if (this.count >= 6) {
        alert("6이상은 불가능합니다.");
        this.buttonDisable3 = true;
        return;
      }
      this.count++;
    },
    minus() {
      if (this.count <= 6) {
        this.buttonDisable3 = false;
      }
      if (this.count <= 0) {
        alert("2이상부터 가능합니다.");
        this.buttonDisable2 = true;
        return;
      }
      this.count--;
    },
    start() {
      if (this.count <= 1) {
        alert("2이상으로 적으세요!");
      }
      else {
        this.isStart = true;
        this.buttonDisable3 = false;
        this.buttonDisable = false;
      }
    },
    shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    },
    confirm() {
      this.start();
      this.isStart2 = false;
      for (var i = 0; i < this.count; i++) {
        this.datas[i] = i;
      }
      this.buttonDisable = true;
      this.shuffle(this.datas);
      for (var i = 0; i < this.count; i++) {
        this.position[i] = document.getElementById(String(i + 1)).getBoundingClientRect();
      }
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.strokeStyle = "black";
      for (let i = 0; i < this.count; i++) {
        ctx.moveTo(this.position[i].x + 90, this.position[i].y - 100);
        ctx.lineTo(this.position[this.datas[i]].x + 90, this.position[this.datas[i]].y);
      }
      ctx.stroke();
      for (let i = 0; i < this.count; i++) {
        this.saved[i] = { user: String([this.textField[i]]), role: String(this.resultField[i]) };
      }
    },
  },
  mounted() {
    //페이지가 다시 불릴때 마다 불러짐
    this.position = document.getElementById("plusBtn");

  },
};
</script>

<style>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%),
    0px 0px 0px 0px rgb(0 0 0 / 14%),
    0px 0px 0px 0px rgb(0 0 0 / 12%);

}

.roles.tooltip.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

.container {
  padding: 30px;
}

.roles {
  margin-bottom: 30px;
}

.check {
  margin-right: 30px;
}
</style>
