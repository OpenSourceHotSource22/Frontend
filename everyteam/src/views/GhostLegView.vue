
<template>
  <v-app :style="BackGroundColor">
    <v-main>
      <div class="roles">
        <div class="tooltip">
          사랑의 작대기
          <span id="toolTipText" class="tooltiptext">원할한 진행을 위해 화면을 100%로 맞춰주세요.</span>
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
      <v-card class="container" id="mainVue"
        style="padding:0px; width:auto; background-color:white; margin-bottom:30px;">
        <v-row class="isValid">
          <v-col class="pt-5">
            <v-btn :disabled="isStart" @click="minus" class="mx-4" v-bind:disabled="buttonDisable2"> - </v-btn>
            {{ count }}
            <v-btn :disabled="isStart" @click="plus" id="plusBtn" class="mx-4" v-bind:disabled="buttonDisable3"> +
            </v-btn>
            <v-btn class="startBtn my-5" @click="start" v-bind:disabled="buttonDisable4">시작하기</v-btn>
          </v-col>
          <v-col>

          </v-col>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-container>
          <v-form ref="form" lazy-validation>
            <div v-if="isStart">
              <v-row style="width:1200px; display:flex; flex-wrap: nowrap;">
                <div v-for="(n, idx) in count">
                  <v-text-field :id="String(n)" :key="idx" class="mx-3 my-0" label="Name" clearable outlined
                    v-model="textField[n - 1]" no-gutters :rules="user_text_rule">
                  </v-text-field>
                </div>
              </v-row>

              <canvas id="canvas" width="1200" height="300"></canvas>

              <v-row class="mt-1" style="width:1200px; display:flex; flex-wrap: nowrap;">
                <div v-for="(n, idx) in count">
                  <v-text-field :id="String(-n)" :key="idx" class="mx-3" label="Role" clearable outlined
                    v-model="resultField[n - 1]" :rules="user_text_rule"></v-text-field>
                </div>
              </v-row>
            </div>
          </v-form>
        </v-container>
        <v-btn @click="confirm" class="check mt-3 mb-3" v-bind:disabled="buttonDisable">확인하기</v-btn>
        <v-btn color="success" class="mt-3 mb-3" @click="submit" v-bind:disabled="isStart2">Submit</v-btn>
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
      buttonDisable4: false,
      user_text_rule: [
        v => !(v && v.length >= 10) || '이름은 10자 이상 입력할 수 없습니다.'
      ],
      datas: [

      ],
      position: [

      ],
      minusPosition: [

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
        this.buttonDisable4 = true;
        let ToolText = document.getElementById("toolTipText");
        ToolText.style.visibility = "visible";
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
        this.minusPosition[i] = document.getElementById(String(-(i + 1))).getBoundingClientRect();
      }

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.strokeStyle = "black";
      for (let i = 0; i < this.count; i++) {
        ctx.moveTo(this.position[i].x - 239 / 2, this.position[i].y - 107);
        ctx.lineTo(this.minusPosition[this.datas[i]].x - 239 / 2, this.minusPosition[this.datas[i]].y - 107);
      }
      ctx.stroke();
      for (let i = 0; i < this.count; i++) {
        this.saved[i] = { user: String([this.textField[i]]), role: String(this.resultField[this.datas[i]]) };
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



.tooltip {
  position: relative;
  display: block;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 250px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 20px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 70%;
  margin-left: -40px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
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

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)>.v-input__control>.v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 12px;
  margin: 0px;
}
</style>
