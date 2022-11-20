<template>
    <v-app>
        <v-main>
            <div class="timeResult">
                <v-row>
                    <v-col class="userResult">
                        <p>{{this.userId}}의 가능시간</p> 
                        <table>
                            <th style="font-size:13.4px;">
                                <td>시간</td>
                                <div class="timeBox" v-for="t in time" :key="t.name" >
                                    <tr>{{t.name}}</tr>
                                </div>
                            </th>
                            <th v-for="day in userTime" :key="day.idx">
                                <td>{{day.date}}</td>
                                <div class="resultTimeBox" v-for="i in 18" :key="i">
                                    <ResultTimeBox :Color="boxColor[day.idx].time[i-1]"/>
                                </div>
                            </th>
                        </table>
                    </v-col>
                    <v-col class="teamResult">  
                        <p>팀원의 가능시간</p> 
                        <table>
                            <th style="font-size:13.4px;">
                                <td>시간</td>
                                <div class="timeBox" v-for="t in time" :key="t.name">
                                    <tr>{{t.name}}</tr>
                                </div>
                            </th>
                            <th v-for="day in userTime" :key="day.idx">
                                <td>{{day.date}}</td>
                                <div class="teamresultTimeBox" v-for="i in 18" :key="i">
                                    <ResultTimeBox :Color="teamTime[day.idx].time[i-1]"/>
                                </div>
                            </th>
                        </table>
                    </v-col>
                </v-row>
           </div>
        </v-main>
    </v-app>
</template>

<script>

import ResultTimeBox from "./ResultTimeBox.vue"
import axios from "axios";
import { BASE_URL } from "@/api";

export default{
    components :{ResultTimeBox},

    data : ()=>({
        userId : localStorage.getItem("userId"),
        userTime:[],
        boxColor:[],
        teamTime:[],
        completeUser:[],
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
    methods:{
       async  getUserTime(){
            
             
            const res = await axios.post(`${BASE_URL}/meet/getDate`,
            {
                teamCode: localStorage.getItem("teamCode"),
                meetCode: localStorage.getItem("meetCode"),
            }
            ,{
                headers:
                {
                    "X-AUTH-TOKEN": localStorage.getItem("token"),
                }
            })

            console.log("res:",res.data);
            for(var i in res.data.result.date){
                var timeSplit = res.data.result.date[i].time.split(',');
                console.log("timesplit : ", timeSplit);
                this.userTime.push({
                    date : res.data.result.date[i].date,
                    time : timeSplit,
                    idx : i,
                });
                //선택한 시간의 색을 결정하기 우히ㅐ
                
                this.boxColor.push({time:this.resultColorArray(timeSplit) });
                console.log("boxColor: ", this.boxColor);
            }

            


        },
       async getAllTime(){

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
                //어떤 유저들이 시간을 체크했는지 유저이름 저장하기
                for(var i in res.data.result.meetList){
                    this.completeUser.push(res.data.result.meetList[i].userId);
                }

                console.log("모든 유저 정보 가져오기 성공!",res.data);

                for(var j =0;j< res.data.result.meetList[0].meet.length; j++){
                    var allTime="";
                    console.log("몇번째 날짜:",j);
                    for(var i in res.data.result.meetList)
                    {   console.log("몇번재 유저:",i);
                        allTime+=res.data.result.meetList[i].meet[j].time
                        var timeSplit = allTime.split(',');
                    }
                    this.teamTime.push({time:this.resultColorArray(timeSplit)});
                }

                console.log("팀 합친 color : ", this.teamTime);
                
            }catch(err){
                console.log(err);
            }
        },

        resultColorArray(timeSplit){
            var forBoxColor=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            for(var i =0; i < timeSplit.length; i++){
                var idx=0;
               
                switch(timeSplit[i]){
                    case '6': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '7': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '8': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '9': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '10': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '11': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '12': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '13': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '14': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '15': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '16': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '17': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '18': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '19': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '20': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '21': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '22': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}
                    case '23': { idx = forBoxColor[i]; forBoxColor[i] = ++idx;  break;}

                }
            }
            console.log("forboxcolor:",forBoxColor);
            return forBoxColor;
        },
    },
    mounted(){
        this.getUserTime();
        this.getAllTime();
    },
}
</script>
