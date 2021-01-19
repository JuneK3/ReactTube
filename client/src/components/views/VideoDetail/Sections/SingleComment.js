import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.users);
  const [commentValue, setCommentValue] = useState('');
  const [openReply, setOpenReply] = useState(false);

  const handleComment = (e) => {
    setCommentValue(e.target.value);
  };

  const openReplyForm = () => {
    setOpenReply(!openReply);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      content: commentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };
    axios
      .post('/api/comment/saveComment', data)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.content);
          setCommentValue('');
          setOpenReply(!openReply);
          props.updateComment(res.data.content);
        } else {
          alert('Failed to save Comment');
        }
      })
      .catch((err) => console.log(err));
  };

  const actions = [
    <span onClick={openReplyForm} key='comment-basic-reply-to'>
      Reply to
    </span>,
  ];

  return (
    <div style={{ width: '100%' }}>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt='image' />}
        content={<p>{props.comment.content}</p>}
      />
      {openReply && (
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
      )}
    </div>
  );
}

export default SingleComment;
