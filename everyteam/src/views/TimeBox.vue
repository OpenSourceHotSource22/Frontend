<template>
    <div class="time">
<div id="timebox" :style="{ width: width + 'px', height: height + 'px',background:bColor}" @click="changeColor"></div>
    </div>
</template>

<script>
export default {
    
  data() {  // Box 의 state
    return {
      width: 40, // 넓이
      height: 20, // 높이
      bColor:"white",
      clicked:false
    };
  },

  props:{
    userIdx:{},
    userTime:{},
   
  },

  methods:{
    changeColor(){
        if(this.clicked)
            this.bColor = 'white'
        else
        this.bColor='green'

        this.clicked = !this.clicked
        //console.log(this.userDate,this.userTime, this.bColor)
        this.sendTimeToParent()
    },

    sendTimeToParent(){
        console.log("자식이 보냄")
        this.$emit('timeFromChild', this.userTime,this.userIdx)
    }
  }
};
</script>

<style scoped>
#timebox{
    border : solid 1px black
}
</style>