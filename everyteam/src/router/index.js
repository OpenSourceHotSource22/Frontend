import Vue from "vue";
import VueRouter from "vue-router";
import Intro from "@/views/IntroView.vue";
import MyGroups from "@/views/MyGroupsView.vue";
import Main from "@/views/MainView.vue";
import Login from "@/views/LoginView.vue";
import WhenWeMeet from "@/views/WhenWeMeetView.vue";
import Roles from "@/views/RolesView.vue";
import CreateGroup from "@/views/CreateGroupView.vue";
import Post from "@/views/PostView.vue";
import Example from "@/views/ExampleView.vue";
import Roulette from "@/views/RouletteView.vue";
import GhostLeg from "@/views/GhostLegView.vue";
import TimePick from "@/views/TimePick.vue";
import WWMResult from "@/views/WhenWeMeetResult.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    component: Intro,
  },
  {
    path: "/myGroups",
    name: "myGroups",
    component: MyGroups,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/whenWeMeet",
    name: "whenWeMeet",
    component: WhenWeMeet,
  },
  {
    path: "/timePick",
    name: "timePick",
    component: TimePick,
  },
  {
    path: "/WhenWeMeetResult",
    name: "WhenWeMeetResult",
    component: WWMResult,
  },
  {
    path: "/roles",
    name: "roles",
    component: Roles,
  },
  {
    path: "/createGroup",
    name: "createGroup",
    component: CreateGroup,
  },
  {
    path: "/post",
    name: "post",
    component: Post,
  },
  {
    path: "/example",
    name: "example",
    component: Example,
  },
  {
    path: "/roulette",
    name: "roulette",
    component: Roulette,
  },
  {
    path: "/ghostLeg",
    name: "ghostLeg",
    component: GhostLeg,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
