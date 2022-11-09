# Frontend

## 오픈소스소프트웨어 팀 프로젝트 Frontend part

---

## 팀원별 수정권한 파일

### 지은

everyteam/src/views/WhenWeMeetView.js
everyteam/src/store/modules/whenWeMeetStore.js

### 성호

everyteam/src/views/RolesView.js
everyteam/src/views/RouletteView.js
everyteam/src/views/GhostLegView.js
everyteam/src/store/modules/rolesStore.js

#### 새로운 파일 생성시 아래 경로에서 가능

everyteam/src/views/"새로운파일명"
everyteam/src/components/"새로운파일명"

---

## 코드 사용법 예시

### api 사용할 때

```
import { BASE_URL } from "@/api";
...
//api 호출시 url 예시
`${BASE_URL}/login`
```

### store파일 설명

state -> 전역에서 사용할 변수
getters -> 변수를 불러서 쓸 때
mutations -> state를 update할 때 사용

### 다른 파일에서 store사용시

```
import { mapState, mapMutations } from "vuex";
...
computed: {
    //변수
    ...mapState("userStore", {
      userName: "userName",
    }),
    ...mapState("groupStore", {
      groupName: "groupName",
      groupList: "groupList",
    }),
  },
methods: {
    //함수
    ...mapMutations("userStore", {
      updateUserName: "updateUserName",
    }),
}
```
