<template>
    <v-app>
        <v-main>
           <v-row justify="space-around">  <!-- 로고 -->
                 <v-img src="@/assets/everyteamLogo.png" max-heigth="100" max-width="100"></v-img>
            </v-row>
        <!-- 스텝퍼 -->
        <div class="stepper" style="margin:20px" >
            <v-stepper
            
            v-model="process"
            ><!-- alt-lables는 번호 밑에 제목을 넣는 스테퍼 종류 -->
                <v-stepper-header>
                    <v-stepper-step
                :complete="process > 1"
                    step="1"
                    
                    >
                    이메일 인증
                    
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    :complete="process > 2"
                    step="2"
                    >
                    아이디, 비밀번호 설정
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    :complete="process > 3"
                    step="3"
                    
                    >
                    프로필 설정
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card
                        class="mb-12"
                        outlined
                        elevation="2"
                        height="350px"
                        >   
                            <!-- 첫번째 카드에 이메일인증 -->
                       
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            
                        >
                        <v-row justify-center style="padding:30px">
                            <v-col sm="1"></v-col>
                            <v-col sm="4">
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="이메일"
                            required
                            ></v-text-field> 
                            </v-col>
                            
                           <v-col cols="auto" align-self="center">@</v-col>
                            <v-col sm="4">
                                <v-select
                                :items="dotcom"
                                label="직접입력"
                                item-text="name"
                                item-value="value"
                                @change="dotcomSelect($event)"
                                ></v-select>
                            </v-col>
                            <v-col sm="1" align-self="center">
                                <v-btn color="primary" @click="sendCode">이메일 인증하기</v-btn>
                            </v-col>
                       
                        </v-row >

                        <v-row >
                            <v-col></v-col>
                            <v-col sm="4">
                            <v-text-field
                            v-model="emailCode"
                            :rules="emailCodeRules"
                            label="인증코드"
                            required
                            ></v-text-field></v-col>
                            
                            <v-col></v-col>
                        </v-row>

                        </v-form>
            
                        </v-card>

                        <v-btn
                        color="primary"
                        @click="process = 2"
                        >
                        다음 단계
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                        class="mb-12"
                        outlined
                        elevation="2"
                        height="350px"
                        >
                        <v-row style="padding:10px">
                            <v-col offset-lg="4" sm="2">
                            <v-text-field
                                label="아이디"
                                :rules="idRule"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col offset-lg="4" sm="2">
                            <v-text-field
                                label="비밀번호"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col offset-lg="4" sm="2">
                            <v-text-field
                                label="비밀번호 확인"></v-text-field>
                            </v-col>
                        </v-row>
                        </v-card>

                        <v-btn
                        color="primary"
                        @click= "process = 3"
                        >
                        다음 단계
                        </v-btn>
                        <v-btn
                        
                        @click="process = 1">
                        이전 단계
                        </v-btn>

                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card
                        class="mb-12"
                        outlined
                        elevation="2"
                        height="350px"
                        ></v-card>

                        <v-btn
                        color="primary"
                        @click="join"
                        >
                        완료
                        </v-btn>

                        <v-btn
                       
                        @click="process = 2"
                        >
                        이전 단계
                        </v-btn>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";

export default {
    data : () =>({
        process : 1, //stepper 넘어가는 거 조절

        //이메일작성
        email:'',
        emailRules:[
        v => !!v || '이메일을 입력하세요',
        //v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        emailCode:'',
        emailCodeRules:[
        v=> !!v ||'인증코드를 입력하세요'
        ],
        
        dotcom:[{name:'naver.com', value:'0'},
                {name:'gmail.com',value:'1'},
                {name:'daum.com',value:'2'},
        ],
        com:'',
        realEmail:''
    }),
    components:{

    },
    methods:{
        join(){
            console.log("회원가입 성공!");
        },
        sendCode(){
            if(this.email =='')
                {alert('이메일을 입력해주세요')
                return;}    
            this.realEmail = this.email+'@'+this.com;
            console.log(this.realEmail);
        },
        dotcomSelect(event){ //event를 출력하니까 선택한 dotcom리스트 value값을 가져옴
        this.com =  this.dotcom[event].name;
            console.log(this.com);
        }
    }
}
</script>
