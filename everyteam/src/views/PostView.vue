<template>
  <v-app>
    <v-main>
      <div class="post">
        <h1>post page</h1>

        <template>
          <v-container fluid>
            <v-text-field
              v-model="post_Title"
              outlined
              label="title"
              clearable
            ></v-text-field>

            <v-textarea
              clearable
              outlined
              label="Text"
              :value="post_Context"
            ></v-textarea>
          </v-container>
        </template>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      post_Title: "",
      post_Context: "",
      msg: "hi",
    };
  },
};
</script>
