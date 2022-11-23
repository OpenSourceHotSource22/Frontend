const rolesStore = {
  namespaced: true,
  state: {
    teamUsers: [],
    // userName: "지선",
  },
  //   getters: {
  //     getUserName: (state) => state.userName,
  //   },
  mutations: {
    updateTeamUsers(state, value) {
      state.teamUsers = value;
    },
  },
  //   actions: {
  //     AC_USER_NAME: ({ commit }, payload) => {
  //       commit("MU_USER_NAME", payload);
  //     },
  //   },
};

export default rolesStore;
