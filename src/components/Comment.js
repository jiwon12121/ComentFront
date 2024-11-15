import styled from 'styled-components';
import style from '../styles/comment.module.css';
import { PropTypes } from 'prop-types';

const CommentStyle = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: ${({ theme }) => theme.borderColor};
`

function Comment(props) {

  Comment.propTypes = {
    comment: PropTypes.string,
    nickname: PropTypes.string,
    user_id: PropTypes.string,
  }

  return (
    <>
      <CommentStyle className={style.feed_comment_box}>
        <div className={style.feed_comment_info}>
          <div className={style.feed_comment_profile}></div>
          <p className={style.feed_comment_author}>{props.nickname}</p>
          <p className={style.feed_comment_created_at}>2 days ago</p>
        </div>
        <div className={style.feed_comment_content_box}>
          <p className={style.feed_comment_content}>{props.comment}</p>
        </div>
      </CommentStyle>
    </>
  )
}

export default Comment;
