<template>
  <v-app :style="BackGroundColor">
    <v-main>
      <div class="title">
        <v-row  justify="space-around">
          <v-col
          cols="6"
          sm="6"
          md="3"
        >
       <v-text-field
          :color="ThemeBtnColor"
            v-model="title"
            label="title"
            outlined
            class="mt-5"
          ></v-text-field>
          </v-col>
      </v-row>
        
      </div>
       <!-- 1st page 날짜 정하기 -->
   <div class="Month">
      <v-date-picker
        :color="ThemeBtnColor"
        v-model="dates"
        year-icon="mdi-calendar-blank"
        width="600"
        multiple
        @click:date ="dayclick"
        class="mt-5 mb-10"
        elevation="5"
      

    />
    <v-row align="center" justify="space-around">
      <v-btn :color="ThemeBtnColor"  @click="nextBtn" style="color: whitesmoke">선택완료</v-btn>
    </v-row>
  </div>


    </v-main>
  </v-app>
</template>


<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import { mapState } from "vuex";

export default {
  
  name: "App",
  data : () => ({
    meetCode:'',
    days : [],
    daysLength:0,
    title : "",
   dates:[],
  }),
  computed:{
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
    ThemeBtnColor() {
      if (this.themeStore == "basic") {
        return this.basicTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "purple") {
        return this.purpleTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "earth") {
        return this.earthTheme["groupInfoBtnColor"];
      }
      if (this.themeStore == "indigo") {
        return this.indigoTheme["groupInfoBtnColor"];
      }
    },
  },

  methods: {
    dayclick(day){
        console.log("day : ", day)
        console.log("date clicked!!")

        const idx = this.days.findIndex(d=> d === day);
        if (idx >= 0) {
        this.days.splice(idx, 1);
        this.daysLength--;
      } else {
        this.days.push(day)
        this.daysLength++;
      } 
      this.days = this.days.sort((a,b)=>{
        if(a>b)
          return 1
        else if(a<b)
          return -1
        else 
          return 0
        })
      // for(var i=0; i<this.daysLength;i++){  
      //   console.log("days array id ",this.days[i])
      // }
      console.log("날짜 배열 : ", this.days);
    },

    async nextBtn(){
      console.log("title : ", this.title);
      console.log("배열 서버에 보내기")
      if(this.days[0] ==null){
        alert("날짜를 선택하세요");
        return;
      }
      if(this.title == ""){
        alert("제목을 입력하세요");
        return;
      }

  try{
      const res = await axios.post(`${BASE_URL}/meet/createDate`,
      {
        teamCode : localStorage.getItem("teamCode"),
        title: this.title,
        date : this.days,
      },
      {
      headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
      });
  this.meetCode = res.data.result.meetCode;
    console.log("서버로부터 받은값 : ", res.data);
    console.log("meetCODE to pickdate", this.meetCode);
    localStorage.setItem("meetCode",this.meetCode);
    this.$router.push({ path: "/timePick", name:"timePick", params:{meetCode:this.meetCode }});
   
    
  }catch(err){
    console.log("err : ", err);
  }
    
    },
  },

}


</script>