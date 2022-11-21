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
          ></v-text-field>
          </v-col>
      </v-row>
        
      </div>
       <!-- 1st page 날짜 정하기 -->
   <div class="Month">
      <v-date-picker
        
        v-model="dates"
        multiple
        @click:date ="dayclick"
      

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
    days : [],
    daysLength:0,
    title : "",
    formats: {
         input: ['YYYY-MM-DD'],
      },
    selectedDate: [ new Date()],

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
    //메인페이지에 whenwemeet 게시물 생성, 이 게시물에 접근시 mmetCode가 일치하는 whenwemeet화면 출력

    this.$router.push({ path: "/timePick" });
  }catch(err){
    console.log("err : ", err);
  }
    },
    
    
  
  },

  computed: {
    // dates() {
    //   return this.days.map(day => day.date);
    // },
    // attributes() {
    //   return this.dates.map(date => ({
    //     highlight: true,
    //     dates: date,
    //   }));
    // },

    
  },
}
//console.log(this.days.id);

</script>