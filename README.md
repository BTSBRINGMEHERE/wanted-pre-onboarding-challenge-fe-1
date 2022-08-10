# 사전 과제 수행

- [사전 과제 수행](#사전-과제-수행)
  - [Refactoring](#refactoring)
    - ["적절히 추상화 되지 않은 함수와 컴포넌트" 적용해보기](#적절히-추상화-되지-않은-함수와-컴포넌트-적용해보기)
      - [useFetch를 만들어서 비동기 통신 코드 중복 줄이기](#usefetch를-만들어서-비동기-통신-코드-중복-줄이기)
      - [useCotrolTodoForm에서 form 검증 코드 제거하기](#usecotroltodoform에서-form-검증-코드-제거하기)
      - [FormContainer에 Headless UI 개념 적용해보기](#formcontainer에-headless-ui-개념-적용해보기)
  - [어플리케이션 동작 예시](#어플리케이션-동작-예시)
  - [어떻게 설계했나요?](#어떻게-설계했나요)
  - [어플리케이션을 만들면서 궁금했고 앞으로 개선하고 싶은 부분](#어플리케이션을-만들면서-궁금했고-앞으로-개선하고-싶은-부분)
  - [자기 소개](#자기-소개)
  - [부록](#부록)

## Refactoring

### "적절히 추상화 되지 않은 함수와 컴포넌트" 적용해보기

#### useFetch를 만들어서 비동기 통신 코드 중복 줄이기

서버와 통신을 위해 ReactQuery를 사용하였습니다. 뷰와 비동기 로직의 결합을 분리하기 위해서 get, post, put, delete, login, signup 등의 훅을 개별적으로 작성하였습니다. 하지만 훅에서 아래와 같은 코드가 계속 반복되었습니다. 만약 headers나 url의 변경이 있을 경우에 관련된 로직 전부를 수정해주어야합니다.

```ts
(body) => {
  const response = await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return response.json();
};
```

그래서 useFetch를 만들어서 위의 예시를 추상화 하였습니다. 그리고 관련된 useFetch에 의존하도록 로직을 전부 변경하였습니다. url이나 headers의 변경이 있으면 쉽게 수정할 수 있습니다.

**useFetch**

```ts
const useFetch = <T extends unknown>(baseUrl: string) => {
  const { token } = useRecoilValue(userState);

  const getData = async (subUrl: string) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const { data } = await response.json();
    return data;
  };

  const putData = async (subUrl: string, body: T) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body)
    });

    const { data } = await response.json();

    return data;
  };

  const postData = async (subUrl: string, body: T) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body)
    });

    const { data } = await response.json();

    return data;
  };

  const deleteData = async (subUrl: string) => {
    const url = `${baseUrl}${subUrl}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const { data } = await response.json();
    return data;
  };

  return { getData, putData, postData, deleteData };
};
```

**수정 예시**

```typescript
const useLogin = () => {
  const { postData } = useFetch(api.baseUrl);

  return useMutation<LoginData, Error, LoginVariable, unknown>(
    // 이 부분이 변경되었습니다.ㄴ
    (body) => postData(`/users/login`, body)
  );
};
```

> 참고한 글
> [리액트 컴포넌트를 타입스크립트 제네릭 함수처럼 쓰기](https://ui.toast.com/weekly-pick/ko_20210505)

#### useCotrolTodoForm에서 form 검증 코드 제거하기

useControlTodoForm은 contorled form을 제어하기 위한 커스텀 훅입니다. 하지만 isTitle, setIsTitle은 맥락상 무엇을 위한 상태인지를 알기 어렵습니다. 또한 contorled form을 제어하기 위한 목적에서 벗어난 듯 보입니다. 따라서 단일 책임 원칙을 적용하여 해당 부분을 삭제하였습니다.

```typescript
// 삭제

const useControlTodoForm = () => {
  /* 삭제
  const [isTitle, setIsTitle] = useState<null | boolean>(null); 
  */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return {
    /*삭제
    isTitle,
    setIsTitle,
    */
    title,
    setTitle,
    content,
    setContent,
    handleTitleChange,
    handleContentChange
  };
};

export default useControlTodoForm;
```

#### FormContainer에 Headless UI 개념 적용해보기

[FormContainer](./client/src/Components/FormContainer.tsx)는 Form 요소를 담고 있는 컴포넌트입니다. form, label, input등의 컴포넌트는 HTMLAttribute를 상속받고 있습니다. 하지만 styled-componets를 적용하면서 기본 스타일이 적용되게 되었습니다.

사실 stlyed-componets는 기존 컴포넌트를 상속 받아 새로운 스타일을 덮어쓸 수 있기 때문에 굳이 스타일을 제거할 필요는 없습니다. 하지만 Headless UI의 개념을 적용해보기 위해서 기능만 남겨 놓았습니다. 스타일은 [mixin](./client/src/lib/styled/style.ts)으로 기본적인 사항을 적용합니다. 나머지 세부 스타일은 styled-components로 제어합니다.

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
- 새로고침을 할 경우 '페이지를 찾을 수 없음' 페이지로 이동합니다. 원인은 isLogin이 잠깐동안 false가 되어 /auth/login으로 이동했다가 true로 변경되면서 /auth/login 페이지로 접근을 막기 때문입니다. 어떻게 해결해야할까요?
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

## 부록

[과제 설명](./documents/assginment.md)
