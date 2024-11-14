import Header from '../components/Header';
import FeedList from '../components/FeedList';
import { useParams } from 'react-router-dom';
import UploadFeedPage from 'components/UploadFeedPage';
import { Cookies } from "react-cookie";
import style from '../styles/MainPage.module.css';
import { useEffect, useState } from 'react';

function MainPage(setDarkMode) {
    // 주소에 있는 keyword 값을 가져오기
    const { category } = useParams();
    const { keyword } = useParams();
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt');

    const [modeHeader, setModeHeader] = useState();

    // function setDarkModeHeader(mode) {
    //     setModeHeader(mode);
    //     console.log(modeHeader);
    //     setDarkMode(modeHeader);
    // }




    return <div className={style.mainContainer}>
            <Header />
            {jwtToken && <UploadFeedPage edit={false} feed={undefined} />}
            <div className={jwtToken? '' : style.feedListContainer}>
            <FeedList category={category} keyword={keyword} />
            </div>
        </div>;
}

export default MainPage;