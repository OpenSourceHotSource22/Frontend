<template>
    <div class="time">
        <div id="resulttimebox" :style="{ width: width + 'px', height: height + 'px',background:bColor }" ></div>
    </div>
</template>

<script>
export default{
    
    data() {  // Box 의 state
    return {
      width: 60, // 넓이
      height: 25, // 높이
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
            case 1: return "rgb(163, 207, 163)";
            case 2: return "rgb(78, 189, 78)";
            case 3: return "rgb(33, 168, 33)";
            case 4: return "rgb(24, 119, 24)";
            case 5: return "rgb(18, 73, 18)";
            case 6: return "rgb(8, 50, 8)";
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