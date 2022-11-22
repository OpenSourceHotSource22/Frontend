
<template>
  <v-app>
    <v-main>
      <div class="roles">
        <h1>사다리타기</h1>
        <v-btn @click="goRolsPage">선택메뉴 가기 </v-btn>
      </div>
      <v-card class="container">
        <v-row>
          <v-btn :disabled="isStart" @click="plus" id="plusBtn" class="mx-4"> + </v-btn>
          {{ count }}
          <v-btn :disabled="isStart" @click="minus" class="mx-4"> - </v-btn>
        </v-row>
        <v-row>
          <v-btn class="my-4" @click="start">시작하기</v-btn>
        </v-row>
        <div v-if="isStart">
          <v-row class="my-0">
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(n)" :key="idx" class="mx-3 my-0" label="Regular" clearable outlined
                v-model="textField[n - 1]">
              </v-text-field>
            </div>
          </v-row>
          <v-row>
            <canvas id="canvas" width="2000" height="400"></canvas>
          </v-row>
          <v-row>
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(-n)" :key="idx" class="mx-3" label="Regular" clearable outlined
                v-model="resultField[n - 1]"></v-text-field>
            </div>
          </v-row>
        </div>
        <v-btn @click="confirm" class="check">확인하기</v-btn>
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
  computed: {},
  methods: {
    async submit() {
      axios
        .post(
          `${BASE_URL}/role/create`,
          {
            teamCode: localStorage.getItem("teamCode"),
            title: "role test",
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
      this.count++;
    },
    minus() {
      this.count--;
    },
    start() {
      if (this.count <= 1) {
        alert("2이상으로 적으세요!");
      } else {
        this.isStart = true;
      }
    },
    shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    },
    confirm() {
      this.isStart2 = false;
      for (var i = 0; i < this.count; i++) {
        this.datas[i] = i;
      }

      this.shuffle(this.datas);
      for (var i = 0; i < this.count; i++) {
        this.position[i] = document.getElementById(String(i + 1)).getBoundingClientRect();
      }
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "black";
      for (let i = 0; i < this.count; i++) {
        ctx.moveTo(this.position[i].x + 90, this.position[i].y - 150);
        ctx.lineTo(this.position[this.datas[i]].x + 90, this.position[this.datas[i]].y + 200);
        ctx.stroke();
      }
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
