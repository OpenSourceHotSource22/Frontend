<template>
    <v-app :style="BackGroundColor">
        <v-main>
            <div class="TimePick container text-center" >
                <v-row justify="space-around">
                     <v-col class="text-center" style="text-align:center; overflow:auto;" >
                     
                    <table style="margin-left:auto; margin-right:auto">
                        <th>
                            <td>시간</td>
                            <div class="timeBox" style="font-size:9px; width:65px; height:25px; text-align:right"
                             v-for="t in time" :key="t.name">
                                {{t.name}}
                            </div>
                        </th>
                       
                        <th  v-for="day in date" :key="day.idx" :a="day" >
                            <td style="width:65px; height:25px;">{{day.date}}</td>
                            
                            <div class="timeBox" v-for="i in 18" :key="i">
                                <TimeBox :userIdx="day.idx" :userTime="i+5" v-on:timeFromChild="ChildTimeReceived"/>
                            </div>
                        
                        </th>
                    </table>
               
                   </v-col>
                </v-row>

                <v-row  justify="space-around" class="mt-8">
                    <v-col align="right" cols="7"> <v-btn  rounded color="primary" width="200px" @click="btnSubmit">선택완료</v-btn></v-col>

                    <v-col cols="5"> <v-btn color="primary" @click="goPrev" text> <v-icon>mdi-arrow-left</v-icon>결과창으로 가기</v-btn></v-col>

                </v-row>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import TimeBox from './TimeBox.vue';
import { mapState } from "vuex";
//import DragSelect from 'drag-select-vue';

export default {
    components: {TimeBox},

    data : () =>({
        meetCode:"",
        dateLength:0,
        timeString:[],
        userTime : [ ], //서버에 보낼 날짜와 시간이 담긴 배열
        times:[], //선택한 시간들 넣는 배열
        date :[], //받아온 날
        time :[
            {name:'time'},
            {name:'6:00 AM'},
            {name:'7:00 AM'},
            {name:'8:00 AM'},
            {name:'9:00 AM'},
            {name:'10:00 AM'},
            {name:'11:00 AM'},
            {name:'12:00 PM'},
            {name:'1:00 PM'},
            {name:'2:00 PM'},
            {name:'3:00 PM'},
            {name:'4:00 PM'},
            {name:'5:00 PM'},
            {name:'6:00 PM'},
            {name:'7:00 PM'},
            {name:'8:00 PM'},
            {name:'9:00 PM'},
            {name:'10:00 PM'},
            {name:'11:00 PM'},
            {name:'12:00 AM'}
            ],
    }),
    computed:{
        ...mapState("themeStore", {
      basicTheme: "basicTheme",
      purpleTheme: "purpleTheme",
      earthTheme: "earthTheme",
      indigoTheme: "indigoTheme",
      themeStore: "themeStore",
      }),
      BackGroupdColor() {
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
    methods :{
       async btnSubmit(){
            for(var j=0; j<this.dateLength; j++){
                 var stringTime = "";
                 
                 for(var i =0; i<this.times[j].uTime.length;i++){
                    stringTime+=this.times[j].uTime[i];
                    if(i<this.times[j].uTime.length-1)
                       { stringTime+=",";}
                 }
                 console.log("스트링으로 변환한 시간",stringTime);
                 this.timeString.push(stringTime);
                 console.log("스트링으로 넣은 전체값 : ", this.timeString);
                 
            }
           
            

            //times 배열 string으로 변환 후 서버에 보내기
            for(var i=0; i<this.dateLength;i++){
                this.userTime.push({
                    date : this.date[i].date,
                    time : this.timeString[i],
                })
            }
                console.log("선택완료");
            try{
            const res = await axios.put(`${BASE_URL}/meet/updateTime`,
            {
                "teamCode" : localStorage.getItem("teamCode"),
                "meetCode" : this.meetCode,
                "meet" : this.userTime,
            },
            {
            headers:
                {
                    "X-AUTH-TOKEN": localStorage.getItem("token"),
                }
            });
            console.log("put성공하고 받은값",res.data);
            }catch(err){
                console.log(err);
            }
            
            //result에 반영하기
           
            
            this.$router.push({
                path: "/WhenWeMeetResult",});
        },
        ChildTimeReceived(usertime,useridx){
            console.log("자식으로부터 받음",usertime,useridx)
            const idx = this.times[useridx].uTime.findIndex(d => d === usertime);
            if (idx >= 0) {
                this.times[useridx].uTime.splice(idx, 1);
                console.log("겹치는 거 삭제");
                //this.timeLength--;
                
            } else {

                this.times[useridx].uTime.push(usertime);
                console.log("시간 추가됨",this.times[useridx]);
                //this.timeLength++;
            }
            this.times[useridx].uTime = this.times[useridx].uTime.sort((a,b)=>a-b)
            // for(var i=0; i<this.daysLength;i++){  
            //     console.log("days array id ",this.days[i].id)
            // // console.log("days array date ",this.days[i].date)
            //     console.log("days array time ",this.days[i].time)
            //     console.log("days array idx",this.days[i].idx)
            for(var i =0; i<this.dateLength;i++){
                console.log("time array ",i,": ",this.times);
            }
            }
        ,

       async getDate(){
       
            var code = {
                teamCode : localStorage.getItem("teamCode"),
                meetCode : this.meetCode,
            }   
            console.log("code",code);
            console.log("달력 받아오자");
            try{
            const res = await axios.post(`${BASE_URL}/meet/getDate`, code,{
                headers:
                {
                    "X-AUTH-TOKEN": localStorage.getItem("token"),
                }
            })
            console.log(res.data);
            //받아온 달력을 배열에 담기
            for(var i in res.data.result.date){
                this.times.push({uTime :[]});//findIndex
                this.date.push({
                    date : res.data.result.date[i].date,
                    idx : i,
            }); this.dateLength++;
            }
            }catch(err){
                console.log(err);
            }
        
       },
       
       goPrev(){
            this.$router.push({path:"/WhenWeMeetResult"})
       }
       
    },
    beforeMount(){
        console.log("마운팅 전 실행");
        //this.visited();
       
        
        
    },
    mounted(){//pageload 전에 실행
        console.log("마운트 후 실행");
        this.meetCode = localStorage.getItem("meetCode");
            this.getDate();
            
       },
}

</script>

<style scoped>
#timeBox{
font-size : 2px;
}
</style>
