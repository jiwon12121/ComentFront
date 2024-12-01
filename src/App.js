import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage/MyPage';
import LoginMiddleware from './pages/loginMiddleware';
import { Cookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import FeedPage from "./pages/FeedPage";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme} from "./styles/theme";
import reset from "styled-reset";
import { DataContext } from './DataContext';


const GlobalStyle = createGlobalStyle`
  ${reset}
    body {
      background: ${({ theme }) => theme.bgColor};
      color: ${({ theme }) => theme.textColor};
      transition: background-color 0.3s ease;
    }
    textarea {
      background: transparent;
    }
    input {
      background: transparent;
      color: ${({ theme }) => theme.textColor};
    }
    p {
      color: ${({ theme }) => theme.textColor};
    }
    span {
      color: ${({ theme }) => theme.textColor};
    }
    a {
      color: ${({ theme }) => theme.textColor};
    }
  `;

function App() {
  // 쿠키에 저장된 토큰이 있는지 확인
  const cookies = new Cookies();
  const jwtToken = cookies.get('jwt');
  let userInfo = null;


  useEffect(() => {
    if(jwtToken) {
      axios.post(`${process.env.REACT_APP_Aws_Url}/login/userInfo`,{
        token: jwtToken
      }).then((res) => {
        userInfo = {
          _id: res.data._id,
          email: res.data.email,
          nickname: res.data.nickname,
          socialType: res.data.socialType,
        };
        sessionStorage.setItem('userinfo', JSON.stringify(userInfo));
      }).catch((error) => {
        sessionStorage.removeItem('userInfo')
        cookies.remove('jwt'); //토큰 변조시 토큰삭제해서 강제 로그아웃
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);
     });
    } else {
      sessionStorage.removeItem('userInfo')
      console.log('토큰이 없습니다.');
    }

    const currentMode = localStorage.getItem("darkmode");
    setModeStore(JSON.parse(currentMode));

  }, []);
  
  const [modeStore, setModeStore] = useState();

  const receiveMode = (data) => {
    setModeStore(data);
  };

  return <>
      <ThemeProvider theme={ modeStore ? darkTheme : lightTheme }>
        <GlobalStyle/>
        <DataContext.Provider value={receiveMode}>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/feed/:feed_id" element={<FeedPage />} />
              <Route 
                path="/category/:category"
                element={<MainPage />}
              />
              <Route path="/search/:keyword" element={<MainPage />} />
              <Route path="/myPage/:user_no" element={<MyPage />} />
              <Route path="/login" element={<LoginMiddleware />} />
            </Routes>
          </Router>
        </DataContext.Provider>
      </ThemeProvider>
    </>
}

export default App;
