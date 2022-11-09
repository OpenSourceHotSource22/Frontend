# Frontend

#### 오픈소스소프트웨어 팀 프로젝트 Frontend part

## 커밋 컨벤션

```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```

## 팀원별 수정권한 파일

### 지은

everyteam/src/views/WhenWeMeetView.vue
everyteam/src/store/modules/whenWeMeetStore.js

### 성호

everyteam/src/views/RolesView.vue
everyteam/src/views/RouletteView.vue
everyteam/src/views/GhostLegView.vue
everyteam/src/store/modules/rolesStore.js

#### +새로운 파일 생성시 아래 경로에서 가능

everyteam/src/views/"새로운파일명"
everyteam/src/components/"새로운파일명"

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
