# 사전 과제 수행

- [사전 과제 수행](#사전-과제-수행)
  - [React Query 사용하여 API 호출하기](#react-query-사용하여-api-호출하기)
    - [React Query로 API 호출하는 커스텀 훅 만들기](#react-query로-api-호출하는-커스텀-훅-만들기)
  - [Refactoring](#refactoring)
    - ["사용자 액션에 따른 적절한 피드백 (UI / UX)" 적용해보기](#사용자-액션에-따른-적절한-피드백-ui--ux-적용해보기)
      - [스켈레톤 컴포넌트 적용하기](#스켈레톤-컴포넌트-적용하기)
      - [삭제 버튼을 눌렀을 때, 사용자에게 경고 모달 보여주기](#삭제-버튼을-눌렀을-때-사용자에게-경고-모달-보여주기)
      - [스낵바로 상태 메시지 보여주기](#스낵바로-상태-메시지-보여주기)
    - [명령형 프로그래밍 -> 선언적 프로그래밍 적용해보기](#명령형-프로그래밍---선언적-프로그래밍-적용해보기)
      - [ProtectRouter를 선언적으로 만들어보기](#protectrouter를-선언적으로-만들어보기)
    - ["적절히 추상화 되지 않은 함수와 컴포넌트" 부분 적용해보기](#적절히-추상화-되지-않은-함수와-컴포넌트-부분-적용해보기)
      - [useFetch를 만들어서 비동기 통신 코드 중복 줄이기](#usefetch를-만들어서-비동기-통신-코드-중복-줄이기)
      - [useCotrolTodoForm에서 form 검증 코드 제거하기](#usecotroltodoform에서-form-검증-코드-제거하기)
      - [FormContainer에 Headless UI 개념 적용해보기](#formcontainer에-headless-ui-개념-적용해보기)
  - [어플리케이션 동작 예시](#어플리케이션-동작-예시)
  - [어떻게 설계했나요?](#어떻게-설계했나요)
  - [어플리케이션을 만들면서 궁금했고 앞으로 개선하고 싶은 부분](#어플리케이션을-만들면서-궁금했고-앞으로-개선하고-싶은-부분)
  - [자기 소개](#자기-소개)
  - [부록](#부록)

## React Query 사용하여 API 호출하기

### React Query로 API 호출하는 커스텀 훅 만들기

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

## Refactoring

### "사용자 액션에 따른 적절한 피드백 (UI / UX)" 적용해보기

#### 스켈레톤 컴포넌트 적용하기

https://user-images.githubusercontent.com/44064122/183937833-0f55f0e0-c274-47ff-ba67-64c0bbdd0f3b.mov

로딩 화면을 보여주기 위해 스켈레톤 컴포넌트를 만들어 적용하였습니다. React-Query를 사용할 때, 서버 상태를 isLoading, isRefetching, isSuccess에 의존해서 판단합니다. 보통 isLoading, isRefetching이 true이면 로딩 화면이나 스켈레톤을 보여줍니다. 스켈레톤 컴포넌트는 아래의 아티클을 보고 만들었습니다.

> 참고 한 글  
> [더 나은 UX를 위한 React에서 스켈레톤 컴포넌트 만들기](https://ui.toast.com/weekly-pick/ko_20201110)

하지만 문제가 있습니다. 서버 응답이 빠르면 스켈레톤 UI가 그냥 깜박입니다. 이런 깜박임은 사용자에게 좋지 않은 경험을 주는 것 같습니다.

https://user-images.githubusercontent.com/44064122/183937885-72d16362-086b-477c-b508-9e2cfb350456.mov

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

#### 삭제 버튼을 눌렀을 때, 사용자에게 경고 모달 보여주기

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

결론적으로 제너레이터를 사용해서 아이템 삭제 로직을 제어하는 것은 불필요해보였다.

</div>
</details>

#### 스낵바로 상태 메시지 보여주기

https://user-images.githubusercontent.com/44064122/184115407-595fc092-7754-4ecd-bd1e-a3f9e98d9f02.mov

사용자가 UI의 변경을 일으키는 동작을 했을 경우에 알림을 위해 [스낵바를 구현](./client/src/Components/Snackbar/Snackbar.tsx)하였습니다. 스낵바를 구현하면서 애니메이션에 대해서 몇 가지 배운 것을 정리하려고 합니다.

1. CSS 키프레임

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

2. 고민했던 문제

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
