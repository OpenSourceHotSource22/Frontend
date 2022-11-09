const userStore = {
  namespaced: true,
  state: {
    userId: "",
    userToken: "",
    userGroups: [],
  },
  //   getters: {
  //     getUserName: (state) => state.userName,
  //   },
  mutations: {
    updateUserId(state, value) {
      state.userId = value;
    },
    updateUserToken(state, value) {
      state.userToken = value;
    },
    updateUserGroups(state, value) {
      state.userGroups = value;
    },
  },
  //   actions: {
  //     AC_USER_NAME: ({ commit }, payload) => {
  //       commit("MU_USER_NAME", payload);
  //     },
  //   },
};

export default userStore;
