import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentLists, props.parentCommentId]);

  const handleReplyComments = () => {
    setOpenReplyComments(!openReplyComments);
    console.log(openReplyComments);
  };

  const renderReplyComment = (parentCommentId) => {
    props.commentLists.map((comment, idx) => {
      comment.responseTo === parentCommentId && (
        <div style={{ width: '80%', marginLeft: '40px' }}>
          <SingleComment
            key={idx.toString() + 'single'}
            comment={comment}
            videoId={props.videoId}
            updateComment={props.updateComment}
          />
          <ReplyComment
            key={idx.toString() + 'reply'}
            parentCommentId={comment._id}
            commentLists={props.commentLists}
            videoId={props.videoId}
            updateComment={props.updateComment}
          />
        </div>
      );
    });
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: '1rem', margin: 0, color: 'gray' }}
          onClick={handleReplyComments}>
          View {childCommentNumber} more comment(s)
        </p>
      )}
      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
