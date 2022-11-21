<template>
  <v-app>
    <v-main>


      <div class="roles">
        <h1>사다리타기 page</h1>
        <v-btn @click="goRolsPage">다시선택하기 </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  methods: {
    goRolsPage() {
      this.$router.push({ path: "/roles" });
    },
  },
};
</script>
