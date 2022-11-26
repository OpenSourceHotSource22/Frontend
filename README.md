## 오픈소스소프트웨어 팀 프로젝트 Frontend part

## 프로젝트 주제

프로젝트명 : EveryTeam

팀플 또는 스터디를 위한 일정을 세울 때 일정 관리부터 역할 분담, 자료 모음 등을 서로 다 른 플랫폼을 사용하여 정하는 일이 빈번하다.
`EveryTeam`은 일정공유, 역할분담, 자료 공유 등을 하나의 플랫폼에서 진행할 수 있는 서비스이다.
팀프로젝트에 참여하는 인원이 모임이 가능한 날짜를 간편하게 체크하고, 이를 추합하여 모든 사람이 가능한 일정을 선택할 수 있는 기능. 사다리타기와 룰렛으로 간편한 역할분담 기능. 자료 공유를 편하게 할 수 있는 게시판 기능을 제공한다.
웹페이지로 구현하여 어떤 디바이스에서든 접근이 용이하고, 팀 링크로 누구든 편하게 서비스를 사용할 수 있다.
`EveryTeam`은 팀플 또는 스터디에 필요한 정보를 하나의 웹에서 결정하고 공유하는 것이 가능하다.

## 프로젝트 초기세팅

```
git clone https://github.com/OpenSourceHotSource22/Frontend.git
cd everyteam
npm install
npm run serve
```

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


## 기본기능

[손성호](https://github.com/Hosung99)

### 역할정하기 
 <img width="534" alt="스크린샷 2022-11-26 오후 11 23 30" src="https://user-images.githubusercontent.com/65282581/204093617-b85992fd-17f8-4bb5-94ca-503c1ba3fa02.png">


1.	룰렛 기능

룰렛기능은 한사람을 랜덤으로 뽑을 때, 사용하는 기능입니다. 

<img width="535" alt="스크린샷 2022-11-26 오후 11 24 14" src="https://user-images.githubusercontent.com/65282581/204093664-0adb5ba4-378c-4129-b991-9a5c426cf484.png">

 <img width="539" alt="스크린샷 2022-11-26 오후 11 26 56" src="https://user-images.githubusercontent.com/65282581/204093787-ab98d0d4-ec71-414b-9c16-a0ecc5c212ee.png">
 제출버튼은 돌림판을 돌리기전에는 제출할 수 없게 되어있습니다. 그리고 역할작성에 최소 두글자 이상 작성해야 제출할 수 있습니다.
 
 결과는 이런식으로 ROLE_ROULETTE 게시물이란 type으로 메인페이지에 작성됩니다.
 <img width="543" alt="스크린샷 2022-11-26 오후 11 31 22" src="https://user-images.githubusercontent.com/65282581/204094012-e28c0e9c-098c-4d8e-a1ae-3cc6fadc6768.png">



1.	사랑의 작대기 기능
<img width="538" alt="스크린샷 2022-11-26 오후 11 26 14" src="https://user-images.githubusercontent.com/65282581/204093761-0dceae02-3b0e-47c2-9d2e-faa2900bbac0.png">

  <img width="534" alt="스크린샷 2022-11-26 오후 11 26 04" src="https://user-images.githubusercontent.com/65282581/204093755-eb2dd39b-0371-4549-aeec-f9e067c763d3.png">
  
<img width="538" alt="스크린샷 2022-11-26 오후 11 26 39" src="https://user-images.githubusercontent.com/65282581/204093772-1db13223-18cf-4453-8f54-43a5c57e2496.png">


[손지은](https://github.com/Ji-Ag)

### WhenWeMeet(웬위밋)

소개 :  ‘회의 시간을 결정하는 더 쉬운 방법’.
캘린더 UI로 간편하게 가능한 시간을 체크하고 공유함으로써 여러 명의 인원이 날짜와 시간을 조율하기 편하게 한다.

이용방법 및 기능 :

처음 게시물을 생성하는 사람이 제목과 날짜를 정한다. 캘린더에서 날짜를 선택하고 선택완료를 클릭한다.
<img width="642" alt="스크린샷 2022-11-26 오후 11 27 45" src="https://user-images.githubusercontent.com/65282581/204093822-74772482-8df2-4326-91c2-b20a89b5725b.png">

<img width="565" alt="스크린샷 2022-11-26 오후 11 27 58" src="https://user-images.githubusercontent.com/65282581/204093836-1c8a5105-455b-4386-ab2b-caa8abe66077.png">

선택한 날짜를 오름차순으로 정렬하여 보여준다.
<img width="564" alt="스크린샷 2022-11-26 오후 11 28 12" src="https://user-images.githubusercontent.com/65282581/204093854-de310096-d279-442a-9e3f-f21205ae91aa.png">

 사용자는 해당 날짜에 따른 상세 시간을 지정할 수 있다. 
시간을 선택하면 내가 선택한 시간과 팀원과 함께 선택한 시간이 보인다.
선택한 시간이 겹칠수록 색은 진해져 한눈에 확인하기 쉽다. 

오른쪽 상단에는 몇명 그리고 누가 선택을 완료했는지 확인할 수 있다. 팀원의 가능시간 표에서 박스를 클릭하면 이 시간을 누가 선택했는지 오른쪽에 ‘기능유저들’칸에서 확인할 수 있다.
예시로 현재 화면은 2022년 11월 25일의 오전 8시 칸을 클릭한 것이며 이 시간을 선택한 유저 3명을 확인할 수 있다.



하단의 최종날짜 입력창과 마감버튼은 게시물을 생성한 사람에게만 제공한다. 마감버튼을 누르기 전까지 팀원들은 시간을 자유롭게 수정할 수 있다. 생성자가 최종 날짜를 정하고 마감을 한다면 더 이상 팀원들은 시간을 수정할 수 없다. 
<img width="537" alt="스크린샷 2022-11-26 오후 11 30 26" src="https://user-images.githubusercontent.com/65282581/204093957-f7bd1df1-2c45-4ffc-a65e-e65a3cab85e8.png">


마감이 완료되어 메인화면에서 제목과 작성한 메시지를 확인할 수 있다.
<img width="311" alt="스크린샷 2022-11-26 오후 11 29 12" src="https://user-images.githubusercontent.com/65282581/204093896-6652d2f5-2781-4bc0-9931-f767ad3c70f5.png">


[정지선](https://github.com/jisunchung)

3.1.3 나머지 기능 
 저는 초기 파일 구조 세팅과 라우팅을 포함하여 아래의 기능 구현을 맡았습니다. 
https://everyteam.netlify.app/ 로 들어올 시 localstorage에 user token이 있는 경우는 mygroups 페이지로 redirect해줍니다. Token이 없는 경우는 로그인 페이지로 redirect 해줍니다


 1. 로그인/회원가입 
   
로그인 페이지에 <v-overlay>를 사용하여 회원가입 페이지를 구현하였습니다.
v-text-field prop의 type을 사용하여 password 보호를 해주었습니다.
  
아무런 값도 넣지 않고 버튼을 클릭시 Validation 체크를 진행해줍니다. 
로그인 성공 시 api response로 부터 받은 user token과 id를 localstorage에 저장해줍니다.

 2. myGroups
 
유저가 속해있는 그룹 리스트를 card형식으로 보여줍니다. +버튼 클릭시 그룹 가입과 그룹 생성을 할 수 있습니다. 
     
그룹 코드를 사용하여 그룹에 가입 할 수 있습니다. 해당 그룹이 존재하는 경우 alert창이 뜨고 그룹 리스트에 추가됩니다. 

3. createGroup
  
그룹 이름과 설명, 그룹 프로필 이미지를 사용자에게 받아 form-data 형태로 묶어 서버에 전송해주었습니다. 프로필 이미지 선택시 FileReader를 사용하여 사용자에게 선택한 사진을 미리 보여주는 기능을 구현하였습니다 


4. main
 4.1. 생성일/항목별
 
생성일을 기준으로 모든 게시물들을 확인할 수 있습니다. 
각 게시물에는 title, 생성날짜, 카테고리, 내용, 작성자에 대한 내용이 들어있습니다. 
Vue-masonry를 플러그인 하여 각 게시물의 높이에 맞춰 카드가 정렬되도록 하였습니다. 
 
항목별로 게시물을 확인할 수 있습니다. WhenWeMeet게시물이 진행중인 경우 색을 다르게 하여 사용자가 구분할 수 있도록 하였고, 클릭시 진행중인 whenWeMeet페이지로 이동합니다. 
 4.2 그룹 배경 이미지
 
 
 
이미지 위에 +버튼을 눌러 그룹 배경 이미지를 바꿀 수 있습니다. 

 4.3 그룹 정보 확인
  
가장 첫번째 버튼은 그룹에 가입되어 있는 user list를 확인할 수 있습니다. 
초대하기 클릭시 그룹의 고유한 코드가 보이고 옆에 있는 아이콘을 클릭하면 클립보드에 복사되어 다른 이들에게 쉽게 공유할 수 있습니다. 
 
추가하기 버튼 클릭시 post, whenWeMeet, Role 기능을 사용할 수 있습니다.

 4.4 테마
    
Basic, earth, purple, indigo 총 4가지 테마를 제공합니다. 각 유저가 선택한 테마는 저장되어 다시 로그인 시 유저가 선택한 테마로 보여줍니다. 

 5. post
 
제목과 내용을 입력하여 post 게시물을 작성할 수 있습니다
![image](https://user-images.githubusercontent.com/65282581/204093384-2838cabe-680c-4e04-aca1-4b34ff00ace6.png)

