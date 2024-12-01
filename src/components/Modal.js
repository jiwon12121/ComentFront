import { useRef } from "react";
import "../styles/modal.css";
import { PropTypes } from 'prop-types';
import styled from "styled-components";

const ModalStyle = styled.div`
  p {
    color: black;
  }
  h1 {
    color: black;
    margin-bottom: 10px;
  }
  span {
    color: black;
  }
`

const Modal = (props) => {

  Modal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
  }

  const { open, close } = props;

  const modalRef = useRef(); // 모달 영역지정

  const closeModal = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) { // 모달 외부 클릭 시
    close();
    }
  };

  // oauth 요청 URL
    const handleKakaoLogin = ()=>{
        window.location.href = `${process.env.REACT_APP_Aws_Url}/login/kakao-login-page`;
    }

    const handleNaverLogin = ()=> {
      window.location.href = `${process.env.REACT_APP_Aws_Url}/login/naver-login-page`
    }

    const handleGoogleLogin = ()=> {
      window.location.href = `${process.env.REACT_APP_Aws_Url}/login/google-login-page`
    }


  return ( <ModalStyle>
    <div className={open ? "openModal modal" : "modal"} onClick={closeModal}>
        {open ? (
          <section ref={modalRef}>
            <header>
              <img className="mainLogo" src="/coment.png" alt="main logo" />
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
              <main>
                <h1>로그인</h1>
                <div className="login-info">
                  <p>
                    시작하기 전에, 당신은 우리의 <span className="modalStrong">이용약관</span>에 동의하셔야 하며<br />
                    또한 <span className="modalStrong">개인정보보호정책</span>을 숙지하셔야 합니다.
                  </p>
                </div>
                <div className="socialBox">
                  <div className="social" onClick={handleKakaoLogin}>
                    <img className="socialLogo" src="/kakao.png" alt="Kakao logo" />
                    <span className="kakaoText">카카오톡으로 시작하기</span>
                  </div>
                  <div>
                    <div className="social" onClick={handleNaverLogin}>
                      <img className="socialLogo" src="/naver.png" alt="Naver logo" />
                      <span className="naverText">네이버로 시작하기</span>
                    </div>
                  </div>
                  <div className="social" onClick={handleGoogleLogin}>
                    <img className="socialLogo" src="/google.png" alt="google logo" />
                    <span className="googleText">구글로 시작하기</span>
                  </div>
                </div>
              </main>
            <footer>
              <button className="close" onClick={close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </ModalStyle>
  );
};

export default Modal;