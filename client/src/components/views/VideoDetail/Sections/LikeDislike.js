import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from '@ant-design/icons';

function LikeDislike(props) {
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [dislikeAction, setDislikeAction] = useState(false);

  let data = {};
  if (props.video) {
    const { videoId, userId } = props;
    data = { videoId, userId };
  } else {
    const { commentId, userId } = props;
    data = { commentId, userId };
  }

  useEffect(() => {
    axios
      .post('/api/like/getLikes', data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setLikes(res.data.likes.length);
          res.data.likes.map((like) => {
            if (like.userId === props.userId) {
              setLikeAction(true);
            }
          });
        } else {
          alert('Like 정보를 가져오는데 실패했습니다');
        }
      })
      .catch((err) => console.log(err));

    axios
      .post('/api/like/getDislikes', data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setDislikes(res.data.dislikes.length);
          res.data.dislikes.map((dislike) => {
            if (dislike.userId === props.userId) {
              setDislikeAction(true);
            }
          });
        } else {
          alert('Dislike 정보를 가져오는데 실패했습니다');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onLike = () => {
    if (!likeAction) {
      axios
        .post('/api/like/upLike', data)
        .then((res) => {
          if (res.data.success) {
            setLikes(likes + 1);
            setLikeAction(!likeAction);
            if (dislikeAction) {
              setDislikes(dislikes - 1);
              setDislikeAction(!dislikeAction);
            }
          } else {
            alert('Like 하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('/api/like/unLike', data)
        .then((res) => {
          if (res.data.success) {
            setLikes(likes - 1);
            setLikeAction(!likeAction);
          } else {
            alert('Like를 취소하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onDislike = () => {
    if (!dislikeAction) {
      axios
        .post('/api/like/upDislike', data)
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes + 1);
            setDislikeAction(!dislikeAction);
            if (likeAction) {
              setLikes(likes - 1);
              setLikeAction(!likeAction);
            }
          } else {
            alert('disLike 하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('/api/like/unDislike', data)
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes - 1);
            setDislikeAction(!dislikeAction);
          } else {
            alert('Dislike를 취소하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <span>
        <Tooltip>
          {likeAction ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ marginRight: '1rem', cursor: 'auto' }}>{likes}</span>
      </span>
      <span>
        <Tooltip>
          {dislikeAction ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ marginRight: '1rem', cursor: 'auto' }}>{dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
