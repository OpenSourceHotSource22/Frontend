<template>
    <div class="time">
<div id="timebox" :style="{ width: width + 'px', height: height + 'px',background:prevColor, }" @click="changeColor"></div>
    </div>
</template>

<script>
export default {
    
  data() {  // Box 의 state
    return {
      width: 60, // 넓이
      height: 25, // 높이
     bColor:0,
      clicked:false,
      
    };
  },

  props:{
    Color:{}, 
    userIdx:{},
    userTime:{},
   
  },
  computed:{
   prevColor : function(){
        //console.log("박스에서 ", this.Color)
      if(this.Color == 0){
         if(this.bColor == 0)
        return "white"
      else if(this.bColor == 1)
        return "green"
      }
        
      else if(this.Color == 1){
        if(this.bColor == 0)
        return "rgb(155, 212, 155)"
      else if(this.bColor == 1)
        return "green"
      }
      
        // switch(this.bColor){
        //   case 0: return "black";
        //   case 1:return "green;"
        // }
        // switch(this.Color){
        //     case 0: this.bColor="white";
        //     case 1:  this.bColor="red";
        // }
    },
  },

  methods:{

    changeColor(){
      
      if(this.clicked)
            this.bColor = 0;
        else
        this.bColor=1

        this.clicked = !this.clicked
        //console.log(this.userDate,this.userTime, this.bColor)
        this.sendTimeToParent()
    },

    sendTimeToParent(){
        console.log("자식이 보냄")
        this.$emit('timeFromChild', this.userTime,this.userIdx)
    }
  },
  
};
</script>

<style scoped>
#timebox{
    border : solid 1px black;
}


</style>