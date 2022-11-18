<template>
  <v-app>
    <v-main>
      <v-container class="roles my-5">
        <h1>역할고르기</h1>
        <v-btn class="mx-5 my-5" @click="goToRoulette"> 룰렛 </v-btn>
        <v-btn class="my-5" @click="goToGhostLeg"> 사다리타기 </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goToRoulette() {
      this.$router.push({ path: "/roulette" });
    },
    goToGhostLeg() {
      this.$router.push({ path: "/ghostLeg" });
    },
  },
};
</script>

<style>

</style>