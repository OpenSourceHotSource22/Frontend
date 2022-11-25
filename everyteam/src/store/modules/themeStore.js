const themeStore = {
  namespaced: true,
  state: {
    themeStore: "basic",
    basicTheme: {
      groupInfoBackColor: "#80C0CC",
      groupInfoBtnColor: "#1096A4",
      mainBackColor: {
        backgroundColor: "#f5f5f5",
      },
      meetCardColor: "#D6E6F2",
      logoColor: {
        color: "#1096A4",
      },
    },
    purpleTheme: {
      groupInfoBackColor: "#B4A9E3",
      groupInfoBtnColor: "#AB8BD2",
      mainBackColor: {
        backgroundColor: "#DEE1EC",
      },
      meetCardColor: "#D0CAEB",
      logoColor: {
        color: "#AB8BD2",
      },
    },

    earthTheme: {
      groupInfoBackColor: "#5F8D4E",
      groupInfoBtnColor: "#285430",
      mainBackColor: {
        backgroundColor: "#F2E8C9",
      },
      meetCardColor: "#BCDAB1",
      logoColor: {
        color: "#285430",
      },
    },
    indigoTheme: {
      groupInfoBackColor: "#546E91",
      groupInfoBtnColor: "#212E61",
      mainBackColor: {
        backgroundColor: "#AFC1C4",
      },
      meetCardColor: "#8AA5C3",
      logoColor: {
        color: "#244F87",
      },
    },

    // actions: {
    //   actionTheme: ({ commit }, payload) => {
    //     commit("updateTheme", payload);
    //   },
    // },
  },
  mutations: {
    updateTheme: (state, payload) => {
      state.themeStore = payload;
    },
  },
};

export default themeStore;
