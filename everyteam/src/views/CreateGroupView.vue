<template>
  <v-app>
    <v-container>
      <v-flex>
        <h1>GreateGroup</h1>
        <v-text-field
          v-model="message"
          :append-outer-icon="message ? 'mdi-send' : ''"
          :prepend-icon="icon"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="그룹이름을 입력하세요"
          type="text"
          @click:append-outer="sendMessage"
          @click:prepend="changeIcon"
          @click:clear="clearMessage"
        ></v-text-field>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: "",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
      alert("완료");
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>
