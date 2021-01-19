import React, { useState, useEffect, Fragment } from 'react';
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
  };

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, idx) => (
      <Fragment key={idx}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              comment={comment}
              videoId={props.videoId}
              updateComment={props.updateComment}
            />
            <ReplyComment
              commentLists={props.commentLists}
              parentCommentId={comment._id}
              videoId={props.videoId}
              updateComment={props.updateComment}
            />
          </div>
        )}
      </Fragment>
    ));

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
