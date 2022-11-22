<template>
    <v-app>
        <v-main>
            <div  class="timeResult mt-5">
                <v-row>
                    <v-col cols="5" class="userResult">
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
                    <v-col cols="5" class="teamResult">  
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
                    <v-col cols="2" class="completeUser">
                        <p>선택 완료한 유저들</p>
                        <div v-for="user in completeUser" :key="user">
                            <v-icon color="primary">mdi-checkbox-marked-circle</v-icon> {{user}}
                        </div>
                    </v-col>
                </v-row>
                <v-row class="btn">
                    <v-col cols="6"  class="prevBtn"> <v-btn rounded color="primary" @click="goPrev"> <v-icon>mdi-alarm</v-icon>  가능시간 선택하기</v-btn> </v-col>
                   <v-col class="goToMain"><v-btn color="primary" @click="goMain" text> <v-icon>mdi-arrow-left</v-icon>  메인으로 돌아가기</v-btn></v-col>
                </v-row>

                <v-row class="submit mt-5" justify="space-around">
                    <v-form v-show="isShow">
                        <v-row>
                            <v-col><v-text-field style="width:400px" v-model="content" label="최종날짜를 입력하시오" outlined ></v-text-field></v-col>
                            <v-col> <v-btn color="primary" @click="submit"> <v-icon>mdi-pencil</v-icon>  마감</v-btn></v-col>
                        </v-row>
                        
                       
                    </v-form>
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
        meetCode:'',
        content:"",
        isShow : false,
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
                meetCode: this.meetCode,
            }
            ,{
                headers:
                {
                    "X-AUTH-TOKEN": localStorage.getItem("token"),
                }
            })

            console.log("res:",res.data);
            try{
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
            }catch(err){
                console.log(err);
                for(var i in res.data.result.date){
                var timeSplit = 0;
                console.log("timesplit : ", timeSplit);
                this.userTime.push({
                    date : res.data.result.date[i].date,
                    time : timeSplit,
                    idx : i,
                });
                //선택한 시간의 색을 결정하기 우히ㅐ
                
                this.boxColor.push({time:this.resultColorArray(timeSplit) });
                console.log("boxColor: ", this.boxColor);}
            }

            


        },
       async getAllTime(){
       
            try{ 
                const res = await axios.post(`${BASE_URL}/meet/getResultTime`,
                {
                    "teamCode" : localStorage.getItem("teamCode"),
                    "meetCode" : this.meetCode,
                },
                {
                    headers:
                    {
                        "X-AUTH-TOKEN": localStorage.getItem("token"),
                    }
                });
                //meet생성자라면 마감버튼 보여주기
                if(this.userId == res.data.result.post.userId){
                    this.isShow = true;
                }
                //console.log("팀 합친 color : ", this.teamTime);
                //어떤 유저들이 시간을 체크했는지 유저이름 저장하기
                for(var i in res.data.result.meetTime){
                    this.completeUser.push(res.data.result.meetTime[i].userId);
                }

                console.log("모든 유저 정보 가져오기 성공!",res.data);
               // console.log("날짜 길이",res.data.result.meetTime[0].meet.length)
                for(var j =0;j< res.data.result.meetTime[0].meet.length; j++){
                    var allTime="";
                    console.log("몇번째 날짜:",j);
                    for(var i in res.data.result.meetTime)
                    {   console.log("몇번재 유저:",i);  
                        allTime+=res.data.result.meetTime[i].meet[j].time;
                        allTime+=',';
                    }var timeSplit = allTime.split(',');
                    console.log(j,"번째 날 유저들의 날짜 합친것 : ",timeSplit);
                    this.teamTime.push({time:this.resultColorArray(timeSplit)});
                }
                
                
                
            }catch(err){
                console.log(err);
            }
        },

        resultColorArray(timeSplit){
            var forBoxColor=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            for(var i =0; i < timeSplit.length; i++){
                var idx=0;
               
                switch(timeSplit[i]){
                    case '6': { idx = forBoxColor[0]; forBoxColor[0] = ++idx;  break;}
                    case '7': { idx = forBoxColor[1]; forBoxColor[1] = ++idx;  break;}
                    case '8': { idx = forBoxColor[2]; forBoxColor[2] = ++idx;  break;}
                    case '9': { idx = forBoxColor[3]; forBoxColor[3] = ++idx;  break;}
                    case '10': { idx = forBoxColor[4]; forBoxColor[4] = ++idx;  break;}
                    case '11': { idx = forBoxColor[5]; forBoxColor[5] = ++idx;  break;}
                    case '12': { idx = forBoxColor[6]; forBoxColor[6] = ++idx;  break;}
                    case '13': { idx = forBoxColor[7]; forBoxColor[7] = ++idx;  break;}
                    case '14': { idx = forBoxColor[8]; forBoxColor[8] = ++idx;  break;}
                    case '15': { idx = forBoxColor[9]; forBoxColor[9] = ++idx;  break;}
                    case '16': { idx = forBoxColor[10]; forBoxColor[10] = ++idx;  break;}
                    case '17': { idx = forBoxColor[11]; forBoxColor[11] = ++idx;  break;}
                    case '18': { idx = forBoxColor[12]; forBoxColor[12] = ++idx;  break;}
                    case '19': { idx = forBoxColor[13]; forBoxColor[13] = ++idx;  break;}
                    case '20': { idx = forBoxColor[14]; forBoxColor[14] = ++idx;  break;}
                    case '21': { idx = forBoxColor[15]; forBoxColor[15] = ++idx;  break;}
                    case '22': { idx = forBoxColor[16]; forBoxColor[16] = ++idx;  break;}
                    case '23': { idx = forBoxColor[17]; forBoxColor[17] = ++idx;  break;}

                }
            }
            console.log("forboxcolor:",forBoxColor);
            return forBoxColor;
        },
        goPrev(){
             this.$router.push({ path: "/timePick"});
        },
       async submit(){
            //input 서버에 저장, 메인 게시물에 보여주기
            if(this.content==""){
                alert("최종시간을 입력해주세요");
                return;
            }
            try{
                const res = await axios.post(`${BASE_URL}/meet/updatePostMeet`,
                {
                    teamCode:localStorage.getItem("teamCode"),
                    meetCode: this.meetCode,
                    content: this.content,
                },
                {
                    headers:
                    {
                         "X-AUTH-TOKEN": localStorage.getItem("token"),
                    }
                });

                this.$router.push({ path: "/main" });
            }catch(err){
                console.log(err);
            }
        },
        goMain(){
            this.$router.push({path:"/main"});
        }
    },
    beforeMount(){
        
       // localStorage.setItem("meetCode",this.$route.params.meetCode);
        this.meetCode = localStorage.getItem("meetCode");
    },
    mounted(){
        
        this.getUserTime();
        this.getAllTime();
    },
}
</script>
