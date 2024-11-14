import React, { useState,useEffect, useContext } from "react"
import { CiSearch } from "react-icons/ci";
import styles from "../styles/header.module.css";
import Modal from "../components/Modal"
import "../styles/modal.css";
import { CiMenuBurger } from "react-icons/ci";
import SideBar from "./SideBar";
import Dropdown from "./Dropdown";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import { DataContext } from "../DataContext";

//로그인정보 관련
import useAuth from "../Auth";

function Header() {

  //좌측 햄버거 코드 
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  const [showNavigation, setShowNavigation] = useState(true);

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  //로그인 정보 
  const isLoggedIn = useAuth();
  const cookies = new Cookies();
  const jwtToken = cookies.get('jwt');
  //회원 정보는 info. 으로 가져올것임
  let [info,setInfo] = useState(JSON.parse(sessionStorage.getItem('userinfo') || '{}'));
  useEffect(() => {
    if(isLoggedIn){
      fetchUserInfo();
    }
  },[isLoggedIn]);

  async function fetchUserInfo() {
    const response = await axios.post('http://localhost:8000/login/userInfo',{
      token: jwtToken
    });
    setInfo(response.data);
  }
  
  const [view, setView] = useState(false);

  // 검색
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  function search() {
    if(keyword === ''){
      return;
    }
    navigate(`/search/${keyword}`);
  }

  

  // 다크모드 버튼
  const [animatedBtn, setAnimatedBtn] = useState(false);
  const [modeStore, setModeStore] = useState(() => {
    if(localStorage.getItem("darkmode") === "true") {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    //페이지 로드 시 darkmode 상태를 localStorage에서 불러오기
    const currentMode = localStorage.getItem("darkmode");
    console.log(currentMode);
    
  }, []);

  const sendMode = useContext(DataContext);

  const toggleDarkMode = () => {
    setModeStore((prev) => {
      const newMode = !prev;

      // icon 클래스에 애니메이션 추가
      setAnimatedBtn(true);

      // localStorage에 darkmode 상태 저장
      localStorage.setItem("darkmode", JSON.stringify(newMode));

      //app.js로 darkmode 상태 보내기
      sendMode(newMode);

      return newMode;
    })

    //애니메이션 클래스 제거 (0.5초 후)
    setTimeout(() => {
      setAnimatedBtn(false);
    }, 500);

  };




  return (
    <React.Fragment>
    <>
    <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </head>
      {showNavigation && <SideBar />}
      <div className={styles.container}>
        <div className={styles.menuShow}>
            <CiMenuBurger size="30" color="black" onClick={toggleNavigation} />
        </div>
        <div className={styles.between}>
          <div className="logoBox">
            <a
              href='/'
            ><img className={styles.logoImg} src='/logoImg.png' /></a>
          </div> 
          <div className="searchBar">
            <div className={styles.searchBox}>
              <input className={styles.searchTxt} type="text" placeholder="ComenT에서 검색하기" onChange={(e) => setKeyword(e.target.value)} />
              <button className={styles.searchBtn} onClick={search} >
              <CiSearch size="22" color="#c0c0c0" />
              </button>
            </div>
          </div>

          <div className={modeStore ? styles.darkmode : ''}>
            <div className={styles.btn} onClick={toggleDarkMode}>
              <div className={styles.btn__indicator}>
                <div className={styles.btn__iconContainer}>
                  <i
                    className={classNames(styles.btn__icon, ["fa-solid"], {
                      ['fa-sun']: !modeStore,
                      ['fa-moon']: modeStore,
                      [styles['animated']]: animatedBtn,
                    })}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          
          {isLoggedIn?(<div className={styles.profileBox}>
            <div className={styles.nickDiv}>
              <a className={styles.nick}>{info.nickname}님 안녕하세요!</a>
            </div>
            <div className={styles.profDiv}>
              <ul className={styles.dropdown} onClick={() => {setView(!view)}}>
              <img className={styles.profImg} src="/profile.png"  width="50px" height="50px"></img>
              {view && <Dropdown />}
              </ul>
            </div>
          </div>):(
          <div className={styles.logBox}>
            <div className={styles.logIn}>
              <a className={styles.logTxt} onClick={openModal}>Log In</a>
              <Modal open={modalOpen} close={closeModal}>
              </Modal>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
    </React.Fragment>
  );
}

export default Header;
