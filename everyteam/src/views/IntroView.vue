<template>
  <div class="intro">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "IntroView",
  components: {
    HelloWorld,
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push({ path: "/mygroups" });
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>
