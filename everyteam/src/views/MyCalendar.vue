<template>
    <v-app>
        <v-main>
            <v-container>
                <v-sheet height="70">
                <v-toolbar>
                    <v-btn @click="setToday">Today</v-btn>
                    <v-btn text @click="goPrev">
                        <v-icon small>
                            mdi-chevron-left
                        </v-icon>
                    </v-btn>
                    <v-btn text @click="goNext">
                        <v-icon small>
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon color="primary">mdi-calendar-blank</v-icon>
                    <h3>{{userId}}의 일정</h3>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="500">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary">

                </v-calendar>
</v-sheet>
            </v-container>
        
       
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api";

export default {
    data : () =>({
        focus:'',
        userId: localStorage.getItem("userId"),
    }),

    methods:{
        setToday(){
            this.focus='';
        },
        goPrev(){
            this.$refs.calendar.prev();
        },
        goNext(){
            this.$refs.calendar.next();
        }
    },
    mounted(){
        this.$refs.calendar.checkChange();
    }
}
</script>
