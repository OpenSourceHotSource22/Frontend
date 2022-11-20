<template>
    <v-app>
        <v-main>
            <div class="timeResult">
                <v-row>
                    <v-col class="userResult">
                        <table>
                            <th>
                                <td>시간</td>
                                <div class="timeBox" v-for="t in time" :key="t.name">
                                    <tr>{{t.name}}</tr>
                                </div>
                            </th>
                            <th v-for="day in userTime" :key="day.idx">
                                <td>{{day.date}}</td>
                                <div class="resultTimeBox" v-for="i in 18" :key="i">
                                    <ResultTimeBox :Color="boxColor[day.idx].time[i-1]"
                                   
                                    />

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
        userTime:[],
        boxColor:[],
        
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
            
                var code = {
                teamCode : localStorage.getItem("teamCode"),
                meetCode : localStorage.getItem("meetCode"),
            }   
            const res = await axios.post(`${BASE_URL}/meet/getDate`, code
            // {
            //     teamCode: localStorage.getItem("teamCode"),
            //     meetCode: localStorage.getItem("meetCode"),
            // }
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
    },
}
</script>
