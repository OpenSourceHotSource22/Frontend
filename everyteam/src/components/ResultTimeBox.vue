<template>
  <v-menu open-on-hover :offset-x="true">
    <template v-slot:activator="{on}">
    <div class="time">
        <div id="resulttimebox" :style="{ width: width + 'px', height: height + 'px',background:bColor }"  @click="changeColor" v-on="on"></div>
    </div>
    </template>
      <v-card>
        <div v-for="name in name" :key="name">
           <v-icon v-if="name!=''" color="primary">mdi-account-circle</v-icon>{{name}}</div>
      </v-card>
    </v-menu>
</template>

<script>
export default{
    
    data() {  // Box 의 state
    return {
      width: 60, // 넓이
      height: 25, // 높이
      //bColor:"white",
      whoSelect:[],
      
    };
  },

  props:{
    Color:{},
    name:{},
    auth:{}
  },

  methods:{
   
    
    changeColor(){
      if(this.auth)
        console.log("?");
      else
        return;
    }
    
  },

  computed:{
    bColor: function(){
        //console.log("박스에서 ", this.Color)
        switch(this.Color){
            case 0:return "white";
            case 1: return "rgb(155, 212, 155)";
            case 2: return "rgb(30, 168, 30)";
            case 3: return "rgb(49, 129, 49)";
            case 4: return "rgb(16, 81, 16)";
            case 5: return "rgb(14, 37, 14)";
            case 6: return "rgb(0, 5, 0)";
        }
    },
    
  },


}
</script>


<style>

</style>

<style scoped>
#resulttimebox{
    border: solid 1px black;
}
</style>