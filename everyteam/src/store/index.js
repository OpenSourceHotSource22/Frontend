import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import groupStore from "@/store/modules/groupStore";
import rolesStore from "@/store/modules/rolesStore";
import userStore from "@/store/modules/userStore";
import whenWeMeetStore from "@/store/modules/whenWeMeetStore";

export default new Vuex.Store({
  state: {
    //주로 많이씀
    //값을 저장하는 객체
  },
  getters: {
    //state값을 반환하는 함수로 computed 속성이 들어있다
  },
  mutations: {
    //주로 많이씀
    //state의 값을 변경하는 함수, setter
  },
  actions: {
    //mutations에 값을 보내는 함수
    //methods라고 생각하면 된다
    //server의 db를 update할때 ..주로 사용
    //비동기적인 함수라고 보면 된다
  },
  modules: {
    groupStore,
    rolesStore,
    userStore,
    whenWeMeetStore,
  },
});
