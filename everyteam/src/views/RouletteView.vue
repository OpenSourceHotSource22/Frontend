<template>
  <v-app>
    <v-main>
      <div id="app2">
        <h1 id="hh">룰렛</h1>
        <v-row justify="space-around">
          <v-col>
          </v-col>
          <v-col>
            <v-text-field label="역할작성" clearable outlined id="textInsert"></v-text-field>
          </v-col>
          <v-col>
            <v-btn class="my-5" @click="goRolsPage">선택메뉴 가기</v-btn>
          </v-col>
        </v-row>
        <div class="roulette-outer">
          <div class="roulette-pin" id="roulette-pin"></div>
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
        <v-btn class="play-btn my-5 mx-5" v-on:click="play" v-bind:disabled="buttonDisable" color="secondary">
          돌려돌려 돌림판~
        </v-btn>
        <v-btn color="success" @click="submit" v-bind:disabled="buttonDisable2">Submit</v-btn>
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
      textInput: "",
      itemStyles: [],
      lineStyles: [],
      current: 0, //실제 가리키는 데이터
      count: 0,
      history: [],
      buttonDisable: false,
      buttonDisable2: true,
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
      let cycle = this.count * 360 * 10; //5바퀴
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
    async submit() {
      let vari = this.history[0];
      let text = document.getElementById("textInsert").value;
      if (text.length <= 1) {
        alert("두글자 이상 입력해주세요!");
        return;
      }
      axios
        .post(
          `${BASE_URL}/role/roulette`,
          {
            teamCode: localStorage.getItem("teamCode"),
            title: this.textInput,
            userId: vari,
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
      this.buttonDisable2 = false;
      this.count++;
      this.current = Math.floor(Math.random() * this.teamUsers.length);
      this.history.push(this.currentItem.value);
      this.textInput = document.getElementById("textInsert").value;
      let startTime = new Date().getTime();
      let particles = [];
      const colors = ["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"];
      function pop() {
        console.log("pop함수");
        for (let i = 0; i < 150; i++) {
          const p = document.createElement('particule');
          p.x = window.innerWidth * 0.5;
          p.y = window.innerHeight + (Math.random() * window.innerHeight * 0.3);
          p.vel = {
            x: (Math.random() - 0.5) * 10,
            y: Math.random() * -20 - 15
          };
          p.mass = Math.random() * 0.2 + 0.8;
          particles.push(p);
          p.style.transform = `translate(${p.x}px, ${p.y}px)`;
          const size = Math.random() * 15 + 5;
          p.style.width = size + 'px';
          p.style.height = size + 'px';
          p.style.background = colors[Math.floor(Math.random() * colors.length)];
          document.body.appendChild(p);
        }
      };
      function render() {
        console.log("render함수");
        for (let i = particles.length - 1; i--; i > -1) {
          const p = particles[i];
          p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

          p.x += p.vel.x;
          p.y += p.vel.y;

          p.vel.y += (0.5 * p.mass);
          if (p.y > (window.innerHeight * 2)) {
            p.remove();
            particles.splice(i, 1);
          }
        }
        const currentTime = new Date().getTime();
        if (currentTime - 10000 > startTime) {
          console.log("timer end");
        } else {
          requestAnimationFrame(render);
        }
      };
      pop();
      setTimeout(render, 5500);
      if (this.count >= 1) {
        this.buttonDisable = true;
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



#app2 {
  text-align: center;
  background: linear-gradient(#eb6383 25%, #fa9191 25% 50%, #ffe9c5 50% 75%, #b4f2e1 75%);
}


.char,
.word {
  display: inline-block;
}

.splitting .char {
  animation: slide-in 1s cubic-bezier(0.17, 0.84, 0.4, 1.49) both;
  animation-delay: calc(30ms * var(--char-index));
}

@keyframes slide-in {
  0% {
    transform: scale(2) rotate(60deg);
    opacity: 0;
  }
}

@keyframes bump-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
}

particule {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 1px 1px 4px #eb6383;
}


.roulette-outer {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;
  font-size: 30px;
  margin-left: auto;
  margin-right: auto;
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
  border-color: #007bff transparent transparent transparent
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
