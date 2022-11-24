import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import groupStore from "@/store/modules/groupStore";
import rolesStore from "@/store/modules/rolesStore";
import userStore from "@/store/modules/userStore";
import whenWeMeetStore from "@/store/modules/whenWeMeetStore";
import themeStore from "@/store/modules/themeStore";

export default new Vuex.Store({
  modules: {
    groupStore,
    rolesStore,
    userStore,
    whenWeMeetStore,
    themeStore: themeStore,
  },
});
