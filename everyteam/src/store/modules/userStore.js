const userStore = {
  namespaced: true,
  state: {
    userId: "",
    userToken: "",
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
  },
  //   actions: {
  //     AC_USER_NAME: ({ commit }, payload) => {
  //       commit("MU_USER_NAME", payload);
  //     },
  //   },
};

export default userStore;
