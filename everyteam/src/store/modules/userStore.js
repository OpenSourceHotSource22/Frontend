const userStore = {
  namespaced: true,
  state: {
    userName: "정지선",
  },
  //   getters: {
  //     getUserName: (state) => state.userName,
  //   },
  mutations: {
    updateUserName(state, value) {
      state.userName = value;
    },
  },
  //   actions: {
  //     AC_USER_NAME: ({ commit }, payload) => {
  //       commit("MU_USER_NAME", payload);
  //     },
  //   },
};

export default userStore;
