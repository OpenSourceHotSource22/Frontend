<template>
    <v-app>
        
        <v-main>
            <div class="TimePick">
                <v-row>
                    <table>
                        <th>
                            <td>시간</td>
                            <div class="timeBox" v-for="t in time" :key="t.name">
                                <tr>{{t.name}}</tr>
                            </div>
                        </th>
                        <th v-for="day in date" :key="day.idx">
                            <td>{{day.date}}</td>
                            <div class="timeBox" v-for="i in 18" :key="i">
                                <TimeBox :userIdx="day.idx" :userTime="i+6" v-on:timeFromChild="ChildTimeReceived"/>
                            </div>
                        </th>
                    </table>
                </v-row>

                <v-row justify="space-around">
                    <v-btn color="success" @click="btnSubmit">선택완료</v-btn>
                </v-row>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";
import TimeBox from './TimeBox.vue'

export default {
    components: {TimeBox},
    data : () =>({
        dateLength:0,
        //timeLength : 0,
        timeString:[],
        userTime : [], //서버에 보낼 날짜와 시간이 담긴 배열
        times:[], //선택한 시간들 넣는 배열
        date :[], //받아온 날
        time :[
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
    
    methods :{
       async btnSubmit(){
            for(var j=0; j<this.dateLength; j++){
                 var stringTime = "";
                 for(i in this.times[j]){
                    stringTime+=this.times[j].time[i];
                    stringTime+=",";
                 }
                 timeString[j].push(stringTime);
                 console.log("스트링으로 변환한 시간",stringTime);
            }
           
            

            //times 배열 string으로 변환 후 서버에 보내기
            for(var i=0; i<this.dateLength;i++){
                this.userTime.push({
                    date : date[i].date,
                    time : timeString[j],
                })
            }
                console.log("선택완료");
            const res = await axios.put(`${BASE_URL}/meet/updateTime`,
            {
                "teamCode" : localStorage.getItem("teamCode"),
                "meetCode" : localStorage.getItem("meetCode"),
                "meet" : this.userTime,
            },
            {
            headers:
                {
                    "X-AUTH-TOKEN": localStorage.getItem("token"),
                }
            })
               // this.$router.push({ path: "/WhenWeMeetResult" });
        },
        ChildTimeReceived(usertime,useridx){
            console.log("자식으로부터 받음",usertime,useridx)
            const idx = this.times[useridx].findIndex(d => d === usertime);
            if (idx >= 0) {
                this.times[useridx].splice(idx, 1);
                console.log("겹치는 거 삭제");
                //this.timeLength--;
                
            } else {

                this.times[useridx].push(usertime);
                console.log("시간 추가됨",this.times[useridx]);
                //this.timeLength++;
            }
            this.times = this.times.sort((a,b)=>a-b)
            // for(var i=0; i<this.daysLength;i++){  
            //     console.log("days array id ",this.days[i].id)
            // // console.log("days array date ",this.days[i].date)
            //     console.log("days array time ",this.days[i].time)
            //     console.log("days array idx",this.days[i].idx)
            for(var i =0; i<this.dateLength;i++){
                console.log("time array ",i,": ",this.times);
            }
            }
        },

       async getDate(){
            var code = {
                teamCode : localStorage.getItem("teamCode"),
                meetCode : localStorage.getItem("meetCode"),
            }
            const res = await axios.post(`${BASE_URL}/meet/getDate`, code)
            console.log(res.data);
            //받아온 달력을 배열에 담기
            for(i in res.data.result.date){
                this.date.push({
                    date : res.data.result.date[i].date,
                    idx : i,
            }); this.dateLength++;
            }
        
       },
       beforeMount(){//pageload 전에 실행
            this.getDate();
       },


    }

</script>
