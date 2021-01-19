import React, { useState, Fragment } from 'react';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import axios from 'axios';

const { TextArea } = Input;

function Comment(props) {
  const user = useSelector((state) => state.users);
  const [commentValue, setCommentValue] = useState('');

  const handleComment = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      content: commentValue,
      writer: user.userData._id,
      videoId: props.videoId,
    };
    axios
      .post('/api/comment/saveComment', data)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.content);
          setCommentValue('');
          props.updateComment(res.data.content);
        } else {
          alert('Failed to save Comment');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <p style={{ fontSize: '1rem', fontWeight: '500', margin: '0' }}>
        Comments
      </p>
      <hr />

      {/* Comment Lists  */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, idx) =>
            !comment.responseTo && (
              <Fragment key={idx}>
                <SingleComment
                  comment={comment}
                  videoId={props.videoId}
                  updateComment={props.updateComment}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  videoId={props.videoId}
                  updateComment={props.updateComment}
                />
              </Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }}>
        <TextArea
          style={{
            width: '100%',
            height: '4rem',
          }}
          value={commentValue}
          onChange={handleComment}
          placeholder='댓글을 입력해주세요'
        />
        <Button
          onClick={handleSubmit}
          type='submit'
          style={{ width: '20%', height: 'auto' }}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
