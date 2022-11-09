const groupStore = {
  namespaced: true,
  state: {
    groupName: "웅크린 나무를 쓰러뜨린 자들",
    groupList: ["음휘영", "정지선", "손지은", "손성호"],
  },
  getters: {
    getGroupList: (state) => state.groupList,
  },
  mutations: {
    updateGroupName(state, value) {
      state.groupName = value;
    },
    updateGroupList: (state, value) => {
      state.groupList = value;
    },
  },
  //   actions: {
  //     AC_USER_NAME: ({ commit }, payload) => {
  //       commit("MU_POST_LIST", payload);
  //     },
  //   },
};

export default groupStore;
