# 사전 과제 수행

## 어플리케이션 동작 예시


https://user-images.githubusercontent.com/44064122/183724188-9b43a8f6-0418-4d46-bcad-c7de6a4b20c5.mp4


## 어떻게 설계했나요?

- 서버 API와 통신하는 코드는 useHooks로 작성하여 View와 분리하였습니다.
- React Query를 사용해서 삭제 수정시 서버에 변경된 아이템을 재요청하는 코드를 작성하지 않았습니다.
- FormContainer는 compound component 디자인 패턴을 사용해서 만들었습니다.
- React Router Dom의 Outlet을 사용해서 "한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요." 조건을 수행하였습니다.
- url을 사용해 TodoDetail 컴포넌트를 불러오기 때문에 "새로고침을 했을 때 현재 상태가 유지되어야 합니다."라는 조건을 지킬 수 있었습니다.
- form은 컨트롤드 폼으로 설계하였습니다. useControlTodoForm 훅을 사용해서 제어할 수 있습니다.

## 어플리케이션을 만들면서 궁금했고 앞으로 개선하고 싶은 부분

- React Query를 사용할때 가끔 isLoading이 매우 짧아서 화면이 깜빡 거리는 경우가 있는데 이럴 때 로딩 화면은 어떻게 컨트롤 하는지 궁금합니다.
- 로그인 할 때, Recoil에 유저의 정보를 담았습니다. isLogin이라는 값으로 로그인 여부를 판단하여 로그인이 되어있는데 /login으로 접근하는 것을 막습니다. 하지만 로그인을 하면서 isLogin이 true로 바뀌면서 아직 로그인이 다 되지 않았는데 /login을 막아버려서 그 다음 코드(리다이렉팅)가 동작하지 않는 문제가 있었습니다.
- 정합성을 깨뜨리지 않기 위한 코드를 작성하는 것이 아직 조금 어렵습니다.
- 서버 에러, 서식 입력 에러 등의 처리가 미숙한 부분이 있습니다. 이 부분을 개선하고 싶습니다.

## 자기 소개

프론트 앤드 개발자 고현수입니다.

- 저는 좋은 코드를 작성하기 위해 이미 완성된 코드를 돌아보고 개선하려고 노력합니다. 바닐라 자바스크립트 [프로젝트를 3번 리펙토링](https://github.com/movie42/ychung) 해보고 그 프로젝트를 [리액트와 타입스크립트를 사용해서 마이그레이션 한 경험](https://github.com/movie42/ychung-frontend)이 있습니다.
- 함께 일하고 대화를 통해 문제를 해결하는 것을 좋아합니다. UX/UI 디자이너로 7개월간 재직하면서 특수교육청 담당자와 많은 대화를 통해 사용자의 불편함을 개선한 경험이 있습니다. 과거 영화를 하면서 한 영화를 만들기 위해 많은 사람들과 대화를 통해 문제를 해결한 경험이 있습니다.
- 배운 것을 생각해보고 다른 사람들과 [공유하고 있습니다](https://movie42.github.io/blog). 공유를 통해 지식은 개선되고 발전된다고 믿고 있습니다.
- 혹시 저의 코드를 보시고 채용에 관심이 있으시면 언제든지 연락주세요.

> [이력서](https://movie42.github.io/)  
> email : movie3342@gmail.com  
> github : https://github.com/movie42  
> blog : https://movie42.github.io/blog  

# :: 원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제 안내 & API

# 1-1) 사전과제 진행 가이드

- 제공해드리는 API Repository를 활용하여 가이드에 따라 `Todo App`을 작성, 본인의 github에 `Public`으로 올려주세요. (주의: Public이 아닐 경우 과제를 확인할 수 없습니다)
- 완성한 과제는 모집 마감 후 설문 조사를 통해 제출해주세요. (개강 시 설문 조사 링크 전달 예정)
- 제출 레파지토리 명은 `wanted-pre-onboarding-challenge-fe-1`로 생성해 주세요.
- 과제 수행 개수에 따라 기본적인 평가가 이루어지며, 커리큘럼 운영 과정에서 최소한의 수준을 파악하기 위한 용도입니다.
- 코드의 일관성, 가독성, 함수 분리, 컴포넌트 설계, 코드 퀄리티 등을 기준으로 세부적인 평가가 이루어집니다.
- 해당 과제에 대한 해설은 개강 후 진행될 예정입니다.
- `README.md`를 꼭 작성해 주세요. 본인에 대한 소개나 프로젝트 소개 등 자유롭게 작성해주시면 됩니다.
- 반드시 함수 컴포넌트로 개발해주세요. (React Hooks)

\* 문의 사항은 사전 과제 Repository의 Issue로 등록해 주세요.

# 1-2) 클라이언트 구현 과제 안내

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [ ] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [ ] 이메일 조건 : 최소 `@`, `.` 포함
  - [ ] 비밀번호 조건 : 8자 이상 입력
  - [ ] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [ ] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [ ] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [ ] 목록 / 상세 영역으로 나누어 구현해주세요
  - [ ] Todo 목록을 볼 수 있습니다.
  - [ ] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [ ] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [ ] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [ ] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

# 2-1) API 실행

```bash
> yarn

> yarn start # http://localhost:8080
```

# 2-2) API 스펙

## [Todos](#todos)

- [getTodos](#getTodos)
- [getTodoById](#getTodoById)
- [createTodo](#createTodo)
- [updateTodo](#updateTodo)
- [deleteTodo](#deleteTodo)

## [Auth](#auth)

- [login](#login)
- [signUp](#signUp)

# <span id="todos">1-3) Todos</span>

## getTodos

### URL

- GET `/todos`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": [
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z"
    },
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z"
    }
  ]
}
```

## getTodoById

### URL

- GET `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z"
  }
}
```

## createTodo

### URL

- POST `/todos`
- Parameter
  - title: string
  - content: string
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z"
  }
}
```

## updateTodo

### URL

- PUT `/todos/:id`
- Parameter
  - title: string
  - content: string
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "제목 변경",
    "content": "내용 변경",
    "id": "RMfi3XyOKoI5zd0A_bsPL",
    "createdAt": "2022-07-24T14:25:48.627Z",
    "updatedAt": "2022-07-24T14:25:48.627Z"
  }
}
```

## deleteTodo

### URL

- DELETE `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": null
}
```

# <span id="auth">1-4) Auth</span>

## login

### URL

- POST `/users/login`
- Parameter
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "성공적으로 로그인 했습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

## signUp

### URL

- POST `/users/create`
- Parameter
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "계정이 성공적으로 생성되었습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```
