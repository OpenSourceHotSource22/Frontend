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
                    color="primary"
                    :events="events"
                     @change="updateRange">

                </v-calendar>
</v-sheet>
<v-btn color="priimary" @click="goMain" text style="margin-top:20px"> <v-icon>mdi-arrow-left</v-icon>  메인으로 돌아가기</v-btn>
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
        events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
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
        },
        goMain(){
            this.$router.push({path:"/main"});  
        },
        updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
       // const eventCount = this.rnd(days, days + 20)

        //for (let i = 0; i < 1; i++) {
          //const allDay = this.rnd(0, 3) === 0
          //const firstTimestamp = 2//this.rnd(min.getTime(), max.getTime())
          const first = new Date('2023-1-2') //new Date(firstTimestamp - (firstTimestamp % 900000))
          //const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date('2023-1-2')//new Date(first.getTime() + secondTimestamp)

          events.push({
            name: '일본여행',//this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: 'blue',//this.colors[this.rnd(0, this.colors.length - 1)],
            timed: 0// !allDay,
          })
       // }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
    mounted(){
        this.$refs.calendar.checkChange();
    }
}
</script>
