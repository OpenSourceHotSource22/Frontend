<template>
  <v-app>
    <v-main>
      <div class="title">
        <v-row  justify="space-around">
          <v-col
          cols="6"
          sm="6"
          md="3"
        >
       <v-text-field
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
        
        v-model="dates"
        year-icon="mdi-calendar-blank"
        width="600"
        multiple
        @click:date ="dayclick"
        class="mt-5 mb-10"
        elevation="5"
      

    />
    <v-row align="center" justify="space-around">
      <v-btn color="primary"  @click="nextBtn">선택완료</v-btn>
    </v-row>
  </div>


    </v-main>
  </v-app>
</template>


<script>
import axios from "axios";
import { BASE_URL } from "@/api";

export default {
  
  name: "App",
  data : () => ({
    meetCode:'',
    days : [],
    daysLength:0,
    title : "",
   dates:[],
  }),

  methods: {
    dayclick(day){
        console.log("day : ", day)
        console.log("date clicked!!")

        const idx = this.days.findIndex(d=> d === day);
        if (idx >= 0) {
        this.days.splice(idx, 1);
        this.daysLength--
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

    console.log("서버로부터 받은값 : ", res.data);
    localStorage.setItem("meetCode", res.data["result"].meetCode);
    this.meetCode = res.data["result"].meetCode;
   
    
  }catch(err){
    console.log("err : ", err);
  }
    this.$router.push({ path: "/timePick" });
    },
  },

}


</script>