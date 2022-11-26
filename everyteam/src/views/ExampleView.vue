<template>
  <v-app>
    <v-main>
      <v-card class="container">
        <v-row>
          <v-btn :disabled="isStart" @click="plus" id="plusBtn" class="mx-4"> + </v-btn>
          {{ count }}
          <v-btn :disabled="isStart" @click="minus" class="mx-4"> - </v-btn>
          <v-btn class="my-4" @click="start">시작하기</v-btn>
        </v-row>
        <v-row>

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
        <v-btn @click="confirm"> 확인하기 </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>



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
      count: 0,
      isStart: false,
      myText: '',
    };

  },
  computed: {},
  methods: {
    keyCheck(e) {
      this.insertSave.key = e.target.value;
    },
    valueCheck(e) {
      this.insertSave.value = e.target.value;
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

      for (var i = 0; i < this.count; i++) {
        this.datas[i] = i;
      }

      this.shuffle(this.datas);
      for (var i = 0; i < this.count; i++) {
        console.log(this.datas[i]);
      }
      console.log("여기까진 작동");
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

      for (var i = 0; i < this.count; i++) {
        console.log(this.textField[i]);
        console.log(this.resultField[i]);
      }

    },
  },
  mounted() {
    //페이지가 다시 불릴때 마다 불러짐
    this.position = document.getElementById("plusBtn");

  },
  watch: {
    //값이 바뀔 때 마다 action을 취하기 위해서는 여기 넣어두면 됨!
    userId: function () {
      console.log("사용자 이름이 변경되었습니다!");
    },
    count() {
      console.log("count값이 변경되었습니다", this.count);
    },
  },
};
</script>

<style>
.container {
  padding: 30px;
}
</style>
