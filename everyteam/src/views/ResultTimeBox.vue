<template>
    <div class="time">
        <div id="resulttimebox" :style="{ width: width + 'px', height: height + 'px',background:bColor}" @click="changeColor"></div>
    </div>
</template>

<script>
export default{
    
    data() {  // Box 의 state
    return {
      width: 40, // 넓이
      height: 20, // 높이
      bColor:"white",
    };
  },

}
</script>


<style scoped>
#resulttimebox{
    border: solid 1px black;
}
</style>