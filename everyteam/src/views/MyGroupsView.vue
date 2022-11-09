<template>
  <v-app>
    <v-main>
      <div class="myGroups">
        <h1>mygroups page</h1>
        <v-btn @click="login">웅나쓰자</v-btn>
        <br />
        <v-btn @click="goCreateGroupPage">creategroup</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    goMain() {
      this.$router.push({ path: "/main" });
    },
    goCreateGroupPage() {
      this.$router.push({ path: "/createGroup" });
    },
  },
};
</script>
