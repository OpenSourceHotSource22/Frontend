<template>
  <v-app>
    <v-main>
      <div class="roles">
        <h1>roles page</h1>
        <v-btn @click="goToRoulette"> 룰렛 </v-btn>
        <v-btn @click="goToGhostLeg"> 사다리타기 </v-btn>
      </div>
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
