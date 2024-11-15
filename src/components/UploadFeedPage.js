import { useEffect, useState } from 'react';
import style from '../styles/uploadFeedPage.module.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UploadStyle = styled.div`
    textarea {
        color: ${({ theme }) => theme.textColor};
    }

    &:hover {
        background-color: ${({ theme }) => theme.hoverBackground};
        box-shadow: ${({ theme }) => theme.hoverBoxShadow};
        cursor: pointer;
        transition: 0.4s;
    }
`

function UploadFeedPage() {
    const navigate = useNavigate();
    function submitFeed(e) {
        if(document.querySelector('input[name="title"]').value === ''){
            alert('제목을 입력해주세요.');
            e.preventDefault();
            return;
        }
        if(document.querySelector('textarea[name="content"]').value === ''){
            alert('내용을 입력해주세요.');
            e.preventDefault();
            return;
        }
    }
    const [userInfo, setUserInfo] = useState({_id: ''});
    useEffect(() => {
        if(sessionStorage.getItem('userinfo')){
            setUserInfo(JSON.parse(sessionStorage.getItem('userinfo')));
        } else {
            navigate('/login');
        }
    },[]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div className={style.container}>
            <UploadStyle className={style.uploadContainer}>
                <div className={style.profile} >
                    <img className={style.profImg} src="/profile.png" width='40px' height='40px'></img>
                </div>
                <form method='post' action='http://localhost:8000/feed' onSubmit={submitFeed} >
                    <input type="hidden" name="user_id" value={userInfo._id} />
                    <div className={style.select}>
                        <select className={style.category} name="category" >
                            <option value="Gaming">Gaming</option>
                            <option value="Sports">Sports</option>
                            <option value="Business">Business</option>
                            <option value="Crypto">Crypto</option>
                            <option value="Television">Television</option>
                            <option value="Celebrity">Celebrity</option>
                        </select>
                    </div>
                    <div className={style.titleBox}>
                        <input className={style.title} type="text" name="title" placeholder="제목을 입력해주세요." value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className={style.contentBox}>
                        <textarea className={style.content} name="content" placeholder="내용을 입력해주세요." value={content} onChange={e => setContent(e.target.value)} />
                    </div>
                    <div className={style.uploadBox}>
                        <input className={style.upload} type="submit" value="Upload" />
                    </div>
                </form>
            </UploadStyle>
        </div>
    )
}

export default UploadFeedPage;
