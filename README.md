# just do it! 할 일 어

- [just do it!](#just-do-it)
  - [just do it 소개 영상](#just-do-it-소개-영상)
  - [설치, 실행 방법](#설치-실행-방법)
    - [설치](#설치)
    - [실행](#실행)
  - [구현 요구사항](#구현-요구사항)
    - [Assignment 1 - Login / SignUp](#assignment-1---login--signup)
    - [Assignment 2 - Todo List](#assignment-2---todo-list)
  - [사용한 프레임워크 및 라이브러리 설명](#사용한-프레임워크-및-라이브러리-설명)
  - [폴더 구조 설명](#폴더-구조-설명)
  - [과제 진행 시 고민한 부분](#과제-진행-시-고민한-부분)
    - [에러 처리](#에러-처리)
    - [React Query 사용하여 API 호출하기](#react-query-사용하여-api-호출하기)
      - [React Query로 API 호출하는 커스텀 훅 만들기](#react-query로-api-호출하는-커스텀-훅-만들기)
    - ["사용자 액션에 따른 적절한 피드백 (UI / UX)" 적용해보기](#사용자-액션에-따른-적절한-피드백-ui--ux-적용해보기)
    - [명령형 프로그래밍 -> 선언적 프로그래밍 적용해보기](#명령형-프로그래밍---선언적-프로그래밍-적용해보기)
      - [ProtectRouter를 선언적으로 만들어보기](#protectrouter를-선언적으로-만들어보기)
    - ["적절히 추상화 되지 않은 함수와 컴포넌트" 부분 적용해보기](#적절히-추상화-되지-않은-함수와-컴포넌트-부분-적용해보기)
      - [useFetch를 만들어서 비동기 통신 코드 중복 줄이기](#usefetch를-만들어서-비동기-통신-코드-중복-줄이기)
      - [useCotrolTodoForm에서 form 검증 코드 제거하기](#usecotroltodoform에서-form-검증-코드-제거하기)
      - [FormContainer에 Headless UI 개념 적용해보기](#formcontainer에-headless-ui-개념-적용해보기)
    - [기타](#기타)
      - [왜 response.json()은 왜 any일까요?](#왜-responsejson은-왜-any일까요)
      - [\<T extends unknown\>은 왜 사용할까?](#t-extends-unknown은-왜-사용할까)
  - [한계점 및 개선 사항](#한계점-및-개선-사항)
  - [자기 소개](#자기-소개)
  - [부록](#부록)

## just do it 소개 영상

[소개영상](https://youtu.be/SJkU0z8lTgE)

## 설치, 실행 방법

### 설치

루트 폴더에서 다음과 같이 명령어를 입력하세요. 서버와 클라이언트 패키지가 모두 설치됩니다.

```shell
$ npm run install
```

### 실행

동시 실행이 되지 않습니다. 터미널을 열고 각각 명령어를 입력하세요. 실행 순서는 관계 없습니다.

- 클라이언트 실행
  - 도메인 : http://localhost:3000

```shell
$ npm run client

Compiled successfully!
```

- 서버 실행
  - 도메인 : http://localhost:8080

```shell
$ npm run server

Now listening on port 8080
```

## 구현 요구사항

### Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 사용한 프레임워크 및 라이브러리 설명

1. CRA(Create React App)
   - 바닥부터 셋팅하기보다 빠른 프로토타입을 만들어 내기 위해서 CRA를 사용하였습니다.
2. axios
   - 에러 처리를 조금 더 원활하게 하기 위해서 axios를 사용하였습니다.
3. styled-components
   - JS로 css 스타일을 작성하기 위해서 사용하였습니다.
4. React Router Dom
   - 리액트에서 도메인을 상태로 관리하기 위해서 사용하였습니다.
5. React Query
   - 서버 상태 관리를 편하게 하기 위해서 사용했습니다.
   - 데이터 정합성 관리를 매우 쉽게 할 수 있게 도와줍니다.
6. Recoil
   - 클라이언트 전역 상태 관리를 하기 위해서 사용했습니다.
   - 사용 방법이 useState와 비슷하여 쉽게 상태를 관리할 수 있습니다.
7. craco
   - 경로 뎁스가 깊어지는 것을 해결하기 위해서 설치 사용하였습니다.
   - tsconfig.json에서 경로 설정을 하여 사용했지만 갑자기 에러가 발생했고 CRA에서는 해결하기 어렵다고 판단되여 설치했습니다.

## 폴더 구조 설명

폴더 구조를 만들기 어려웠습니다. 가장 고민했던 부분을 설명합니다.

1. hooks는 lib/hooks와 Page/\*/hooks로 나누었습니다.
   - 특강 때 글로벌로 사용되는 hook과 뷰에서 분리한 기능으로써의 hook을 가까운 곳에 위치하면 좋겠다고 생각했습니다.

```
├── Pages
│   ├── Auth
│   │   ├── Login.tsx
│   │   ├── Logout.tsx
│   │   ├── PageNotFound.tsx
│   │   ├── SignUp.tsx
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useLogin.tsx
│   │   │   ├── useRemoveUserState.tsx
│   │   │   ├── useSetUserState.tsx
│   │   │   ├── useSignup.tsx
│   │   │   └── useValidation.tsx
```

2. 컴포넌트와 페이지, 라우터 폴더를 역할별로 나누었습니다.

   - 컴포넌트 폴더는 전역으로 재사용되는 리액트 컴포넌트가 들어있습니다.
   - 페이지는 뷰의 역할을 하는 컴포넌트가 들어있습니다.
   - 라우터는 Router 역할을 하는 컴포넌트가 들어있습니다.

3. lib(라이브러리)에 스타일, atoms, hooks 등 헬퍼 함수가 있습니다.
   - 글로벌로 사용되는 헬퍼 함수는 라이브러리 폴더에 넣었습니다.
   - 별다른 이유는 없습니다. 이전 프로젝트에서 lib가 없이 src 바로 아래 위치했는데 폴더가 너무 지저분해져서 이렇게 했습니다.

- 전체 폴더

```
.
├── craco.config.js
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── Components
│   │   ├── FormContainer.tsx
│   │   ├── Header.tsx
│   │   ├── Modals
│   │   │   ├── DeleteModal.tsx
│   │   │   └── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Snackbar
│   │   │   └── Snackbar.tsx
│   │   └── index.ts
│   ├── Layouts
│   │   ├── MainLayout.tsx
│   │   └── index.ts
│   ├── Pages
│   │   ├── Auth
│   │   │   ├── Login.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── PageNotFound.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── useLogin.tsx
│   │   │   │   ├── useRemoveUserState.tsx
│   │   │   │   ├── useSetUserState.tsx
│   │   │   │   ├── useSignup.tsx
│   │   │   │   └── useValidation.tsx
│   │   │   ├── index.ts
│   │   │   └── styles
│   │   │       ├── FormButtonStyled.tsx
│   │   │       ├── FormDefaultStyle.tsx
│   │   │       ├── FormErrorStyle.tsx
│   │   │       └── index.ts
│   │   ├── Main
│   │   │   ├── Main.tsx
│   │   │   └── index.ts
│   │   ├── TODO
│   │   │   ├── Detail
│   │   │   │   ├── ToDoDetail.tsx
│   │   │   │   ├── ToDoDetailContainer.tsx
│   │   │   │   └── ToDoUpdateForm.tsx
│   │   │   ├── Skeleton
│   │   │   │   ├── SkeletonForTodoList.tsx
│   │   │   │   └── SkeletonForTodoListItem.tsx
│   │   │   ├── ToDoCreateForm.tsx
│   │   │   ├── ToDoItem.tsx
│   │   │   ├── ToDoList.tsx
│   │   │   ├── ToDoListContainer.tsx
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── useControlTodoForm.tsx
│   │   │   │   ├── useCreateTodo.tsx
│   │   │   │   ├── useDeleteTodo.tsx
│   │   │   │   ├── useGetTodoDetail.tsx
│   │   │   │   ├── useGetTodos.tsx
│   │   │   │   └── useUpdateTodo.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── Routes
│   │   ├── ProtectRouter.tsx
│   │   ├── Routers.tsx
│   │   └── index.ts
│   ├── index.tsx
│   ├── lib
│   │   ├── atoms
│   │   │   ├── index.ts
│   │   │   ├── snackbar.ts
│   │   │   └── user.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useChangeUTCToLocalDate.tsx
│   │   │   ├── useFetch.tsx
│   │   │   └── useModalContorl.tsx
│   │   ├── http
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   └── styled
│   │       ├── GlobalStyle.tsx
│   │       ├── index.ts
│   │       └── style.ts
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   └── styled.d.ts
├── tsconfig.json
└── tsconfig.paths.json
```

## 과제 진행 시 고민한 부분

### 에러 처리

에러 처리가 프론트앤드에서 매우 중요함에도 불구하고 매번 어플리케이션을 만들 때마다 등한시 하게 되는 것 같았습니다. 에러 처리를 할 때 Error 생성자를 사용해서 Error를 처리했었는데
리액트 쿼리를 사용하면서 에러 처리 방법을 찾아보다가 [개발자의 블로그](https://tkdodo.eu/blog/react-query-error-handling)를 보게 되었습니다. 그러던 중 Axios를 사용하면 AxiosError를 사용해서 더 쉽게 에러 처리가 가능하다고 하여 [그 부분을 적용](https://github.com/movie42/wanted-pre-onboarding-challenge-fe-1/commit/809a41a1728db9ee4cf3f4ffccd3cf04ac360b33#diff-5829b620b67eac9db92379f246e480141950629aa4f52d2a0c7f62cad3fabdbc) 하였습니다.

```typescript
import { AxiosError } from "axios";

const useLogin = () => {
  return useMutation<LoginData, AxiosError, LoginVariable>(
    async (body) => await postData(`/users/login`, body),
    {
      useErrorBoundary: (error) => {
        return error.response ? error.response.status >= 500 : false;
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 아이디 또는 비밀번호를 다시 입력해주세요."
            }
          ]);
        }
      },
      onSuccess: ({ token }) => {
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 다시 돌아오신것을 환영합니다."
          }
        ]);
        setLocalStorage(token);
        setUserState((pre) => ({ ...pre, isLogin: false, token }));
      }
    }
  );
};
```

### React Query 사용하여 API 호출하기

#### React Query로 API 호출하는 커스텀 훅 만들기

리액트 쿼리를 사용해서 서버 상태를 관리하는 것은 매우 편리합니다. 하지만 이전의 경험으로 보았을 때, API를 호출하는 코드와 뷰가 한 컴포넌트 안에서 있어서 코드가 매우 복잡하고 특정 로직을 수정하려면 복잡한 과정을 거쳐야했습니다.

```typescript
function Notice() {
  const { id } = useParams();

  const { isLogin } = useRecoilValue(loginState);
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  // API 호출
  const {
    isSuccess,
    isRefetching,
    isLoading,
    data: notices
  } = useGet<INoticeInterface[]>({
    url: `/api/notice?offset=0&limit=9`,
    queryKey: "notice"
  });

  const onClick = (id: string) => {
    if (notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (id && isSuccess && !isRefetching) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isSuccess, isRefetching]);

  return (
    <>
      <NoticeListContainer>
        <Wrapper>
          <NoticeComponentInfoContainer>
            <h1>공지사항</h1>
            {isLogin && (
              <Link to={"/notice/create"}>
                <AiFillPlusCircle />
              </Link>
            )}
          </NoticeComponentInfoContainer>
          <>
            {notices && (
              <ListContainer
                isLoading={isLoading && isRefetching}
                data={notices}
                renderFunc={(item) => (
                  <ListItem
                    key={item._id}
                    data={item}
                    onClick={() => onClick(item._id)}
                  />
                )}
                skeletonRenderFunc={(item: number[], index: number) => (
                  <SkeletonForListItem key={index} />
                )}
              />
            )}
          </>
        </Wrapper>
        <AnimatePresence>{noticeModalState && <Outlet />}</AnimatePresence>
      </NoticeListContainer>
    </>
  );
}
```

이번에 투두 리스트를 만들때는 이 문제를 해결하고 싶었습니다. 그래서 API를 호출하는 코드를 분리해서 훅으로 만들고 불어와서 바로 사용하도록 변경하였습니다.

```typescript
// API 호출

const useCreateTodo = () => {
  const setSnackbarQueue = useSetRecoilState(snackbarState);
  const { postData } = useFetch<CreateTodoVariable>(api.baseUrl);
  const queryClient = useQueryClient();

  return useMutation<CreateTodoData, Error, CreateTodoVariable, unknown>(
    (body) => postData("/todos", body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoList"]);
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "✅ 할 일 등록했습니다.",
            type: "notice"
          }
        ]);
      }
    }
  );
};

// 투두를 생성하는 영역
const ToDoListContainer = () => {
  // 훅 한줄로 API 호출을 관리할 수 있다.
  const { mutate } = useCreateTodo();

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      setIsTitle(false);
      return;
    }
    setIsTitle(null);

    mutate(
      {
        title,
        content
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        }
      }
    );
  };

  return; // 생략
};
```

이렇게 관리하는 것의 장점은 호출 API를 변경해야할 때 여러곳을 돌면서 코드를 수정하지 않아도 된다는 점이 좋은 것 같습니다.

### "사용자 액션에 따른 적절한 피드백 (UI / UX)" 적용해보기

1. 스켈레톤 컴포넌트 적용하기

로딩 화면을 보여주기 위해 스켈레톤 컴포넌트를 만들어 적용하였습니다. React-Query를 사용할 때, 서버 상태를 isLoading, isRefetching, isSuccess에 의존해서 판단합니다. 보통 isLoading, isRefetching이 true이면 로딩 화면이나 스켈레톤을 보여줍니다. 스켈레톤 컴포넌트는 아래의 아티클을 보고 만들었습니다.

> 참고 한 글  
> [더 나은 UX를 위한 React에서 스켈레톤 컴포넌트 만들기](https://ui.toast.com/weekly-pick/ko_20201110)

하지만 문제가 있습니다. 서버 응답이 빠르면 스켈레톤 UI가 그냥 깜박입니다. 이런 깜박임은 사용자에게 좋지 않은 경험을 주는 것 같습니다.

차라리 서버의 응답이 빠르면 스켈레톤을 동작시키지 않거나 최소 1회는 보이도록 변경하는게 좋다고 생각했습니다. 이 문제를 해결하기 위해서 저는 isSkeleton이라는 상태를 만들고 isLoading, isRefetching이 빠르게 false로 변경되더라도 최소 1회는 동작하도록 코드를 작성하였습니다.

```typescript
const ToDoList = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const { data: todos, isLoading, isSuccess, isRefetching } = useGetTodos();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && !isRefetching) {
      timer = setTimeout(() => setIsSkeleton(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isRefetching]);

  return !isSkeleton ? (
    <Wrapper>
      <ul>
        {todos?.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </Wrapper>
  ) : (
    <Wrapper>
      <ul>
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
      </ul>
    </Wrapper>
  );
};
```

2. 삭제 버튼을 눌렀을 때, 사용자에게 경고 모달 보여주기

https://user-images.githubusercontent.com/44064122/184055711-e172343f-a89d-46dc-8ae4-9fb653a30325.mov

삭제 버튼을 눌렀을 때, 할 일이 바로 삭제되지 않고 사용자에게 한 번 더 확인을 받는 모달 기능을 구현하였습니다. 모달은 [useModalControl](./client/src/lib/hooks/useModalContorl.tsx) 훅을 통해서 제어됩니다.

[Modal](./client/src/Components/Modals/Modal.tsx) 컴포넌트는 JSX를 children으로 받습니다. 제어 항목을 props로 넘기는 것보다 children으로 받아 Modal의 세부 내용을 구현하는 것이 더 자유도가 높습니다. 모달창 안에 들어가는 내용을 예측할 수 있고 모달을 쉽게 변경할 수 있습니다.

- Modal.tsx

```typescript
interface IModalProps extends React.HTMLAttributes<HTMLElement> {}

const Modal = ({ ...props }: IModalProps) => {
  return (
    <ModalWrapper>
      <ContentContainer>{props.children}</ContentContainer>
      <ContentBackground />
    </ModalWrapper>
  );
};

export default Modal;
```

<details>
<summary>구현하면서 시도했지만 실패한 부분</summary>

<div markdown="1">
  <h4>제너레이터를 사용해서 아이템 삭제를 제어할 수는 없을까?</h4>

handleDeleteTodo 함수를 제너레이터로 만들어서 할 일 삭제 로직을 제어하고 싶었다. useEffect를 사용해서 모달을 제어했지만 모달이 포함된 컴포넌트가 너무 복잡해진다.

```typescript
function* handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  const id = e.currentTarget.closest("li")?.dataset.id;

  yield setIsModal(true);

  if (id) {
    mutate(
      { id },
      {
        onSuccess: () => {
          navigate("/");
        }
      }
    );

    return true;
  }

  return false;
}
```

끝까지 구현하지 않은 이유

- 제너레이터를 사용하기 위해서 함수를 값으로 사용할 수 있어야하는데 이 부분이 애매하다.
- 어차피 제너레이터의 next를 실행하기 위해서는 isConfirm이 true가 되었을 경우에 실행해야하는데 그러기 위해서 useEffect를 사용해야한다.
- 이벤트 인자를 넘기는 방법이 애매해진다. 그러려면 또 함수를 만들어야한다.

결론적으로 제너레이터를 사용해서 아이템 삭제 로직을 제어하는 것은 불필요해보였다. 어쩌면 제너레이터 사용 방법을 잘 모르는듯?

</div>
</details>

3. 스낵바로 상태 메시지 보여주기

사용자가 UI의 변경을 일으키는 동작을 했을 경우에 알림을 위해 [스낵바를 구현](./client/src/Components/Snackbar/Snackbar.tsx)하였습니다. 스낵바를 구현하면서 애니메이션에 대해서 몇 가지 배운 것을 정리하려고 합니다.

- CSS 키프레임

  - CSS 키프레임은 애니메이션 동작을 제어할 수 있습니다. 'from to'로 처음과 나중을 지정하거나 '0%'로 제어를 할 수 있습니다. 키프레임 안에는 원하는 동작을 작성하면 됩니다. 아래 코드는 styled-components를 사용하여 keyframe을 만들었습니다.

  ```typescript
  const snackbarTimerKeyframe = keyframes`
    0%{
      visibility: visible;
      transform-origin: top left;
      transform: scaleX(0%);
    }
    100%{
      visibility: visible;
      transform-origin: top left;
      transform: scaleX(100%);
    }
    `;
  ```

  - 키프레임의 작성이 끝나면 움직임을 주고 싶은 컴포넌트에 animation 속성을 등록하면 됩니다.
  - 애니메이션을 등록할 초기값 설정을 기본 css 속성으로 등록해주는 것이 좋습니다. 그렇지 않으면 애니메이션이 다 끝난 다음에 예상치 못한 동작을 볼 수 있습니다. 아래 코드는 snackbar를 3.5초동안 1번 움직이는 동작을 구현한 코드입니다. 만약에 MessageContainer 스타일 컴포넌트에 "transform: translateX(120%);"으로 초기값이 등록되어있지 않으면 애니메이션이 다 끝난 다음에 스낵바가 화면으로 튀어나오게 됩니다. **애니메이션 동작 후에 예상치 못한 동작이 발생한다면 초기값을 확인해보세요.**

  ```typescript
  const snackbarTranslaterKeyframe = keyframes`
  0%{
    transform : translateX(100%);
  }
  5%{
    transform: translateX(0);
  }
  95%{
    transform: translateX(0);
  }
  100%{
    transform : translateX(100%);
  }
  `;

  const MessageContainer = styled.div`
    ...
    transform: translateX(120%);
    animation: ${snackbarTranslaterKeyframe} 3.5s 1 linear;
    `;
  ```

  - keyframe의 타이밍을 조절하려면 각 keyframe의 간격을 조절하면됩니다. 처음에는 animation-delay로 설정할 수 있을 줄 알았는데 그 방법은 동작하지 않습니다. 애니메이션의 총 동작 시간을 정한 다음에 키프레임 간격으로 동작을 제어하면 됩니다.

- 고민했던 문제

  - 문제

    어떤 동작을 성공했을 경우에 snackbar 큐에 메시지를 등록하게 됩니다. 그리고 등록된 메시지는 전역상태 값에 따라 스낵바가 화면에 그려집니다.

    ```typescript
    // 어떤 동작의 성공
    {
      onSuccess: () => {
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "✅ 할 일 등록했습니다.",
            type: "notice"
          }
        ]);
      };
    }

    // 스낵바 출력
    const Main = () => {
      const snackbarQueue = useRecoilValue(snackbarState);

      return (
        <Snackbar>
          {snackbarQueue.map(({ id, message, type }) => (
            <Snackbar.Item
              key={id}
              data-set={id}
              message={message}
              type={type}
            />
          ))}
        </Snackbar>
      );
    };
    ```

    그런데 문제는 DOM에 스넥바가 등록 되었지만 동작이 끝난 다음에 사라지지 않고 그대로 DOM에 남아있습니다.

     <img width="852" alt="스크린샷 2022-08-11 오후 7 20 17" src="https://user-images.githubusercontent.com/44064122/184115239-e8e0458a-edd3-494f-b833-daf0adfc23cd.png">

  - 해결책

    - 처음에 제가 생각한 해결책은 queue를 구현해서 메시지를 한개씩 제거하는 것이었습니다. 하지만 shift로 큐를 구현할 경우 성능 문제가 있습니다. 그리고 queue의 변경을 react가 감지하면 DOM이 새로 그려질 것이라고 생각하여 queue로 구현하지 않았습니다.
    - 아주 간단하게 useEffect를 사용해서 snackbar queue가 변경될 때마다 timer를 등록하게 하고 일정 시간이 지나면 queue를 전부 지우는 방법으로 이 문제를 해결했습니다.

    ```typescript
    useEffect(() => {
      let timer: NodeJS.Timeout;
      timer = setTimeout(() => setSnackbarQueue([]), 6000);
      return () => clearTimeout(timer);
    }, [snackbarQueue]);
    ```

    시간이 지나면 DOM에 있던 HTML 태그가 전부 삭제됩니다.

### 명령형 프로그래밍 -> 선언적 프로그래밍 적용해보기

#### ProtectRouter를 선언적으로 만들어보기

새로고침을 하면 isLogin이 잠깐동안 undefined가 되기 때문에 화면 깜박임 뿐 아니라 PageNotFound가 잠깐동안 동작하게 됩니다. 갑자기 로그인이 풀렸다가 재로그인이 되는 과정을 사용자에게 적나라게 모두 보여주기 때문에 느낌상 신뢰가 가지 않습니다. !isLogin이 true이면 "/login"과 "/signup"에 접근을 막고 싶었습니다. 그래서 인증과 인가를 위한 코드를 아래와 같이 라우터에 직접 입력했습니다.

```typescript
const Routers = () => {
  const { isLogin } = useRecoilValue(userState);

  return (
    <Routes>
      {isLogin && <Route path="/logout" element={<Logout />} />}
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />}>
          <Route path=":todoId" element={<ToDoDetail />} />
        </Route>
        <Route path="auth">
          {!isLogin && (
            <>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </>
          )}
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
```

덕분에(?) '/login', '/signup', '/logout' 페이지에 접근은 막았지만 사용성은 좋지 않습니다. 그래서 나름 해결한다고 PageNotFound 컴포넌트를 수정했습니다.

```tsx
const PageNotFound = () => {
  const params = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);

  const authUrlList = ["auth/login", "auth/signup"];

  const checkAuthUrl = () => {
    for (let url of authUrlList) {
      if (url === params["*"]) {
        setIsAuth(true);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    checkAuthUrl();

    if (isLogin && isAuth) {
      navigate("/");
    }

    timer = setTimeout(() => navigate("/"), 2500);

    return () => {
      setIsAuth(false);
      clearTimeout(timer);
    };
  }, [isLogin, isAuth]);

  return (
    <Wrapper>
      <h1>🥲 페이지를 찾을 수가 없네요</h1>
    </Wrapper>
  );
};

export default PageNotFound;
```

checkAuthUrl()이 실행되면서 authUrlList를 확인하고 해당되면 홈으로 곧바로 리다이렉트 해주고 그렇지 않으면 2.5초간 페이지를 찾을 수 없다는 문구를 보여주고 메인 페이지로 리다이렉트 해주게 됩니다. 나름 좋은 해결책이었다고는 생각했지만 잠깐 동안 '페이지를 찾을 수 없습니다.'라는 문구를 보여주지 않는 문제는 여전히 해결할 수 없었습니다.

제가 생각했을 때, 위 코드가 가지고 있는 문제점을 꼽아보았습니다.

- 사용성이 좋지 않다.
- authUrlList를 계속 관리해주어야 한다. 수가 늘어나거나 줄어들 경우 프로그래머를 귀찮게한다.
- 인증, 인가 로직이 일차원적이라 한단계 더 인증해야한다면 일일이 인증 인가를 라우터에 붙여야한다. 그러면 if else 또는 삼항 연산자가 지저분하게 붙는다.

저는 먼저 인증, 인가 로직을 해결하기로 했습니다. 이 부분을 해결하기 위해 봤던 아티클 중 도움이 가장 많이 된 [아티클을 공유(React Router 6: Private Routes (alias Protected Routes))](https://www.robinwieruch.de/react-router-private-routes/)합니다.

위 아티클을 보면서 ProtectRouter를 만들게 되었고 인증과 인가 문제를 해결할 수 있었습니다.

```tsx
// ProtectRouter.tsx
import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectRouterProps {
  isAllow: boolean;
  redirectPath: string;
  children?: ReactElement;
}

const ProtectRouter = ({
  isAllow,
  redirectPath,
  children
}: IProtectRouterProps) => {
  if (!isAllow) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectRouter;

// Router.tsx
const Routers = () => {
  const { isLogin } = useRecoilValue(userState);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          element={
            <ProtectRouter isAllow={isLogin} redirectPath={"/auth/login"} />
          }
        >
          <Route path="/" element={<Main />}>
            <Route path=":todoId" element={<ToDoDetail />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route
          element={<ProtectRouter isAllow={!isLogin} redirectPath={"/"} />}
        >
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
```

What과 How를 분리하였다고 생각합니다. **Router는 무엇을 보여줄지에만 집중하고 ProtectRouter에게 어떻게 보여줄지**만 집중합니다. 그리고 예상치 못하게도 ProtectRouter를 적용하니까 제가 문제라고 생각했던 부분이 전부 해결되었습니다. 정말 잠깐의 화면 깜박임은 있지만 isLogin이 false에서 true가 되면서 발생하는 문제들이 모두 사라졌습니다. 덕분에 PageNotFound 컴포넌트도 페이지가 없다는 **메시지를 보여주는 역할에만 집중** 할 수 있게 되었습니다. 생각보다 선언적 프로그래밍이 주는 효과가 좋네요.

https://user-images.githubusercontent.com/44064122/184263974-a831a3c9-f8a9-44b9-afff-6f2f8a3090be.mov

### "적절히 추상화 되지 않은 함수와 컴포넌트" 부분 적용해보기

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

- useFetch

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

- 수정 예시

```typescript
const useLogin = () => {
  const { postData } = useFetch(api.baseUrl);

  return useMutation<LoginData, Error, LoginVariable, unknown>(
    // 이 부분이 변경되었습니다.
    (body) => postData(`/users/login`, body)
  );
};
```

그런데 만들면서 사용하다보니까 생각보다 What과 How의 분리가 그렇게 잘 된 것 같지 않다는 생각이 들었습니다.

- 일단 http option 변경이 유연하지 않습니다.
- 이상하게 제네릭 타입에 대한 타입 추론이 자동으로 되지 않습니다.

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

### 기타

#### 왜 response.json()은 왜 any일까요?

response.json()를 return 하는 함수에 return type을 Promise\<TData\>로 지정했는데 타입이 지정되지가 않았다.

[재현 코드](https://stackblitz.com/edit/react-ts-1mwpyv?embed=1&file=useFetch.tsx)

그런데 [답변](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1/issues/16#issuecomment-1219297743)이 너무 간단했다.

결론 부터 말씀드리자면 response.json의 리턴타입이 Promise\<any\> 라서 그렇습니다

```typescript
// lib.dom.d.ts
interface Body {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<any>;
  text(): Promise<string>;
}
```

그래서 타입 단언으로 문제를 해결했다.

#### \<T extends unknown\>은 왜 사용할까?

원티드 프리온보딩 수업 도중 올렸던 질문에 내가 올린 코드를 보고 다른 수강생 분이 질문을 주셨다.

> 혹시 재현 코드에서 jsx를 리턴하지 않는데 ts가 아닌 tsx확장자로 하신 이유가 있을까요??
> 그리고 제네릭 타입 지정해주실 때 TData extends unknown를 하신 이유도 궁금합니다!

[타입스크립트 : response.json()은 왜 any일까요? · Issue #16 · starkoora/wanted-pre-onboarding-challenge-fe-1](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1/issues/16#issuecomment-1219366250)

살이 떨렸다. 사실 extends가 상속을 받기 위한 문법이라고 대강 알고만 있을 뿐… unknown 타입이 그냥 있다고 만 알고있고 .d.ts 파일 보면 TData = unknown이라고 많이 썼길래 그냥 따라 쓴것일 뿐 사실 정확한 이유를 모르고 그냥 썼다. 그래서 과제를 해야하는데… 그냥 unknown이 뭔지부터 죽치고 앉아서 찾아보기 시작했다.

나름 찾은 결과다.

1. Typescript에서 unknown은 타입 이론에 따라 최상위 타입이라고 합니다. (반면에 never는 최하위 타입) 그래서 모든 타입은 unknown이라고 합니다.(unknown이 모든 타입이 될 수 있는건지 모든 타입이 unknown인건지... 햇갈리네요)
   - 아티클 : [When to use `never` and `unknown` in TypeScript](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/)
   - 공식문서 [New unknown top type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
2. JSX에서 확장된 TSX를 사용할 경우 \<T\>가 컴파일러가 읽을 때 불분명한 부분이 있어서 컴파일러에게 Generic 타입이라는 것을 알려주기 위해서 \<T extends unknown\>이라고 알려주기 위해서라고 합니다.
   - [타입스크립트에서 함수 문법](https://ui.toast.com/weekly-pick/ko_20210521#%EC%A0%9C%EB%84%A4%EB%A6%AD)
3. TSX에서 사용할 때 \<T\>와 \<T extends unknown\>의 차이는 없다고 합니다. (1번에 따르면 수긍이 됩니다.)
   - [TypeScript Generic Types and How to Properly Implement Them](https://medium.com/swlh/typescript-generic-types-and-how-to-properly-implement-them-498519a8ab65)
4. unknown은 Type safe를 위해서 사용한다고 합니다. (이건 질문 내용과는 관련이 없지만 그냥 unknown이 뭔지 찾다고 꼬리를 물다가 발견해서...)
   - [Type-Safe TypeScript](https://dev.to/mistval/type-safe-typescript-4a6f)
   - [Using the unknown type](https://learntypescript.dev/03/l7-unknown)

## 한계점 및 개선 사항

- 에러 바운더리 처리가 되지 않았습니다. 리엑트 16.0부터 제공하는 에러 바운더리를 적용해보려고 했지만 적용하지 못했습니다.

## 자기 소개

프론트 앤드 개발자 고현수입니다.

- 저는 좋은 코드를 작성하기 위해 이미 완성된 코드를 돌아보고 개선하려고 노력합니다. 바닐라 자바스크립트 [프로젝트를 3번 리펙토링](https://github.com/movie42/ychung) 해보고 그 프로젝트를 [리액트와 타입스크립트를 사용해서 마이그레이션 한 경험](https://github.com/movie42/ychung-frontend)이 있습니다.
- 함께 일하고 대화를 통해 문제를 해결하는 것을 좋아합니다. UX/UI 디자이너로 7개월간 재직하면서 특수교육청 담당자와 많은 대화를 통해 사용자의 불편함을 개선한 경험이 있습니다. 과거 영화를 하면서 한 영화를 만들기 위해 많은 사람들과 대화를 통해 문제를 해결한 경험이 있습니다.
- 배운 것을 생각해보고 다른 사람들과 [공유하고 있습니다](https://movie42.github.io/blog). 공유를 통해 지식은 개선되고 발전된다고 믿고 있습니다.
- 혹시 저의 코드를 보시고 채용에 관심이 있으시면 언제든지 연락주세요.

> [이력서](https://movie42.github.io/resume)  
> email : movie3342@gmail.com  
> github : https://github.com/movie42  
> blog : https://movie42.github.io

## 부록

[배운거 다른 프로젝트에도 적용해보기](https://github.com/movie42/ychung-frontend/wiki/API-%ED%98%B8%EC%B6%9C-%ED%95%A8%EC%88%98-%EB%8C%80%EC%88%98%EC%88%A0)  
[과제 설명](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)
