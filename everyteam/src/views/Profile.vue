<template>
    <v-app>
        <v-main>
            <h2 style="padding:30px">프로필 변경</h2>
            <v-container style="width:500px; padding:100px">
                <v-text-field v-model="loginId" :rules="idRules" label="아이디" outlined required style="width:300px; margin-bottom: 30px;" ></v-text-field>
                <v-text-field v-model="pw" :rules="idRules" label="비밀번호" outlined required></v-text-field>
                <v-text-field v-model="pw2" :rules="idRules" label="비밀번호 확인" outlined required style="margin-bottom: 50px;"></v-text-field>

                <v-btn @click="ok" color="primary" style="margin-right:20px">적용</v-btn>
                <v-btn @click="cancle" >취소</v-btn>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";

export default {
    data : () =>({
        loginId: localStorage.getItem("userId"),
        pw:'*****'
    }),
    methods:{

    }
}
</script>
