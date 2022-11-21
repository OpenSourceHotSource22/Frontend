<template>
  <v-app>
    <v-main>
      <v-card class="container">
        <v-row>
          <v-btn :disabled="isStart" @click="plus" id="plusBtn"> + </v-btn>
          {{ count }}
          <v-btn :disabled="isStart" @click="minus"> - </v-btn>
        </v-row>
        <v-row>
          <v-btn @click="start">시작하기</v-btn>
        </v-row>
        <div v-if="isStart">
          <v-row class="my-0">
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(n)" :key="idx" class="mx-3 my-0" label="Regular" clearable outlined>
              </v-text-field>
            </div>
          </v-row>
          <v-row>
            <canvas id="canvas" width="1000" height="600"></canvas>
          </v-row>
          <v-row>
            <div v-for="(n, idx) in count">
              <v-text-field :id="String(-n)" :key="idx" class="mx-3" label="Regular" clearable outlined></v-text-field>
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
      count: 0,
      isStart: false,
    };
  },
  computed: {},
  methods: {
    plus() {
      console.log("+");
      this.count++;
    },
    minus() {
      this.count--;
    },
    start() {
      if (this.count <= 1) {
        alert("2이상으로 적으라");
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
      w
      for (var i = 0; i < this.count; i++) {
        this.postion[i] = document.getElementById({ i }).getBoundingClientRect();
      }
      for (var i = 0; i < this.count; i++) {
        console.log(this.position[i + 1]);
      }

      this.position1 = document.getElementById("2").getBoundingClientRect();
      this.position2 = document.getElementById("-2").getBoundingClientRect();

      console.log("position1", this.position1.x, this.position1.y);
      console.log("position2", this.position2.x, this.position2.y);

      const canvas = document.getElementById("canvas");
      console.log("canvas", canvas);
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(this.position1.x + 100, this.position1.y - 400);
      ctx.lineTo(this.position2.x + 100, this.position2.y);
      ctx.stroke();
    },
  },
  mounted() {
    //페이지가 다시 불릴때 마다 불러짐
    console.log("메인페이지 마운티드");
    this.position = document.getElementById("plusBtn");

    console.log(this.position.getBoundingClientRect());
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
