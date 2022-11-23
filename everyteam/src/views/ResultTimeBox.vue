<template>
    <div class="time">
        <div id="resulttimebox" :style="{ width: width + 'px', height: height + 'px',background:bColor }" @click="whoSelect" ></div>
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
    name:{},
  },

  methods:{
    whoSelect(){
      console.log("child:",this.name);
      this.$emit("whoFromChild",this.name);
    },
    
  },

  computed:{
    bColor: function(){
        console.log("박스에서 ", this.Color)
        switch(this.Color){
            case 0:return "white";
            // case 1: return "rgb(163, 207, 163)";
            // case 2: return "rgb(78, 189, 78)";
            // case 3: return "rgb(33, 168, 33)";
            // case 4: return "rgb(24, 119, 24)";
            // case 5: return "rgb(18, 73, 18)";
            // case 6: return "rgb(8, 50, 8)";

            //  case 1: return "rgb(155, 212, 155)";
            // case 2: return "rgb(74, 119, 74)";
            // case 3: return "rgb(33, 73, 33)";
            // case 4: return "rgb(16, 57, 16)";
            // case 5: return "rgb(7, 37, 7)";
            // case 6: return "rgb(0, 5, 0)";

            //  case 1: return "rgb(155, 212, 155)";
            // case 2: return "rgb(33, 168, 33)";
            // case 3: return "rgb(24, 119, 24)";
            // case 4: return "rgb(16, 57, 16)";
            // case 5: return "rgb(7, 37, 7)";
            // case 6: return "rgb(0, 5, 0)";

             case 1: return "rgb(155, 212, 155)";
            case 2: return "rgb(30, 168, 30)";
            case 3: return "rgb(49, 129, 49)";
            case 4: return "rgb(16, 81, 16)";
            case 5: return "rgb(14, 37, 14)";
            case 6: return "rgb(0, 5, 0)";
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