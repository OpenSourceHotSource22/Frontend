<template>
    <v-app>
        <v-main>
            <div class="TimePick">
                <v-row justify="space-around">
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
                                <TimeBox :userIdx="day.idx" :userTime="i+5" v-on:timeFromChild="ChildTimeReceived"/>
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
        userTime : [ ], //서버에 보낼 날짜와 시간이 담긴 배열
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
                "meetCode" : localStorage.getItem("meetCode"),
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
           
            
            this.$router.push({ path: "/WhenWeMeetResult" });
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
                meetCode : localStorage.getItem("meetCode"),
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
       async visited(){
        //meetCode의 모든 유저를 가져와 첫번째 방문이면 continue, 두 번째 방문이면 결과창으로 이동
            try{
                const res = await axios.post(`${BASE_URL}/meet/getResultTime`,
                {
                    "teamCode" : localStorage.getItem("teamCode"),
                    "meetCode" : localStorage.getItem("meetCode"),
                },
                {
                    headers:
                    {
                        "X-AUTH-TOKEN": localStorage.getItem("token"),
                    }
                });

                for(var i in res.data.result.meetList){
                    if(localStorage.getItem("userId") ==  res.data.result.meetList[i].userId){
                        console.log("두번째 방문이므로 결과창으로 이동");
                        this.$router.push({ path: "/WhenWeMeetResult" });
                        return;
                    }
                }
                console.log("첫번째 방문했으므로 시간체크");

            }catch(err){
                console.log(err);
            }
       },
       
    },
    beforeMount(){
        console.log("마운팅 전 실행");
        //this.visited();
    },
    mounted(){//pageload 전에 실행
        console.log("마운트 후 실행")
            this.getDate();
       },
}

</script>

<style scoped>
#timeBox{
font-size : 2px;
}
</style>