<template>
    <div class="time">
        <div id="resulttimebox" :style="{ width: width + 'px', height: height + 'px',background:bColor }" ></div>
    </div>
</template>

<script>
export default{
    
    data() {  // Box 의 state
    return {
      width: 40, // 넓이
      height: 20, // 높이
      //bColor:"white",
    };
  },

  props:{
    Color:{},
  },

  methods:{

  },

  computed:{
    bColor: function(){
        console.log("박스에서 ", this.Color)
        switch(this.Color){
            case 0:return "white";
            case 1: return "green";
        }
    }
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