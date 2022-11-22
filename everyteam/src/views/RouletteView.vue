<template>
  <v-app>
    <v-main>
      <div id="app">
        <h1 id="hh">룰렛</h1>
        <v-btn class="my-5" @click="goRolsPage">선택메뉴 가기</v-btn>
        <div class="roulette-outer">
          <div class="roulette-pin"></div>
          <div class="roulette" v-bind:style="rouletteStyle">
            <!--값 영역-->
            <div class="item-wrapper">
              <div class="item" v-for="(item, index) in teamUsers" v-bind:style="itemStyles[index]">
                {{ item.value }}
              </div>
            </div>

            <!--선 영역-->
            <div class="line-wrapper">
              <div class="line" v-for="(item, index) in teamUsers" v-bind:style="lineStyles[index]"></div>
            </div>
          </div>
        </div>
        <v-btn class="play-btn my-5 mx-5" v-on:click="play" v-bind:disabled="buttonDisable">
          돌려돌려 돌림판~
        </v-btn>
        <v-btn color="success" @click="">Submit</v-btn>
        <hr />
        <ul>
          <li v-for="(h, idx) in history">{{ h }}</li>
        </ul>
      </div>
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

      items: [
        { value: "100점" },
        { value: "200점" },
        { value: "-500점" },
        { value: "0점" },
      ],
      itemStyles: [],
      lineStyles: [],
      current: 0, //실제 가리키는 데이터
      count: 0,
      history: [],
      buttonDisable: false,
      teamcode: "",
    };
  },

  computed: {
    ...mapState("rolesStore", {
      teamUsers: "teamUsers"
    }),
    segment() {
      return 360 / this.teamUsers.length;
    },
    offset() {
      return this.segment / 2;
    },
    angle() {
      // return -this.current * this.segment; 각도가 너무일정함.
      let temp = -this.current * this.segment;
      let randomOffset =
        Math.floor(Math.random() * this.segment) - this.offset - 1;
      let cycle = this.count * 360 * 5; //5바퀴
      return (temp + randomOffset + cycle); //랜덤변화
    },
    rouletteStyle() {
      return {
        transform: "rotate(" + this.angle + "deg)",
      };
    },
    currentItem() {
      return this.teamUsers[this.current];
    },
  },
  methods: {
    async getTeamUserList() {
      try {
        const res = await axios.get(`${BASE_URL}/role/userList`, {
          params: {
            teamCode: localStorage.getItem("teamCode"),
          },
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        });
        console.log("팀 유저 불러오기 성공!!");
        console.log("teamUserList:", res.data["result"]);
        for (let i = 0; i < res.data["result"].length; i++) {
          this.teamUsers[i] = { value: String(res.data["result"][i]) };
          console.log(this.teamUsers[i]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    play() {
      this.buttonDisable = true;
      this.count++;
      this.current = Math.floor(Math.random() * this.teamUsers.length);
      this.history.push(this.currentItem.value);
      if (count >= 1) {
        this.buttonDisable = false;
        return;
      }
    },
    goRolsPage() {
      this.$router.push({ path: "/roles" });
    },
  },
  mounted() {
    //itemStyles정의
    console.log("store에 저장된 TEAMUSERS", this.teamUsers)
    this.getTeamUserList();
    this.teamUsers.forEach((el, idx) => {
      this.itemStyles.push({
        transform: "rotate(" + this.segment * idx + "deg)",
      });
      //lineStyles정의
      this.lineStyles.push({
        transform: "rotate(" + (this.segment * idx + this.offset) + "deg)",
      });
    });
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
}

.roulette-outer {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;
  font-size: 30px;
  margin-left: auto;
  margin-right: auto;
  background: #ffeaa7;
}

.roulette-outer>.roulette {
  position: absolute;
  top: 5%;
  left: 5%;
  right: 5%;
  bottom: 5%;
  border-radius: 50%;
  border: 2px solid black;
}

.roulette-outer>.roulette-pin {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -4px;
  border-style: solid;
  border-width: 25px 5px 0 5px;
  border-color: #007bff transparent transparent transparent;
}

.roulette-outer>.roulette>.item-wrapper>.item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding-top: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.roulette-outer>.roulette>.line-wrapper>.line {
  position: absolute;
  top: 0;
  bottom: 50%;
  left: 50%;
  width: 2px;
  margin-left: -1px;
  background: black;
  transform-origin: bottom;
}

.roulette-outer>.roulette {
  transition: transform 5s ease-in-out;
}
</style>
