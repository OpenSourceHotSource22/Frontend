<template>
    <v-app>
        <v-main>
           <v-row>
                <v-col>
                    <div class="resulttimeBox" v-for="i in 18" :key="i">
                                <ResultTimeBox />
                            </div>
                
                </v-col>
           </v-row>
        </v-main>
    </v-app>
</template>

<script>

import ResultTimeBox from "./ResultTimeBox.vue"

export default{
    components :{ResultTimeBox},

    data : ()=>{

    }

}
</script>
