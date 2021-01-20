import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Col, Row, List } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';
import { auth } from '../../../_actions/user_action';

function VideoDetail(props) {
  const [video, setVideo] = useState([]);
  const [commentLists, setCommentLists] = useState([]);
  const videoId = props.match.params.videoId;
  const dispatch = useDispatch();
  let userId = useRef(null);

  useEffect(() => {
    dispatch(auth()).then((res) => {
      userId.current = res.payload._id;
      axios
        .post('/api/video/getVideo', { videoId })
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.video);
            setVideo(res.data.video);
          } else {
            alert('Failed to get video Info');
          }
        })
        .catch((err) => console.log(err));
    });

    axios.post('/api/comment/getComments', { videoId }).then((res) => {
      if (res.data.success) {
        // console.log(res.data.comments);
        setCommentLists(res.data.comments);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, [videoId]);

  const updateComment = (newComment) => {
    setCommentLists(commentLists.concat(newComment));
  };

  if (video.writer) {
    const subscribeButton = video.writer._id !== userId.current && (
      <Subscribe userTo={video.writer._id} />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div
            className='postPage'
            style={{ width: '100%', padding: '3rem 4rem' }}>
            <video
              style={{ width: '100%' }}
              src={`http://localhost:8080/${video.filePath}`}
              controls></video>
            <List.Item
              actions={[
                <LikeDislike video videoId={videoId} userId={userId.current} />,
                subscribeButton,
              ]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                  />
                }
                title={video.writer.name}
                description={video.description}
              />
            </List.Item>
          </div>
          <Comment
            commentLists={commentLists}
            videoId={videoId}
            updateComment={updateComment}
          />
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          fontSize: '3rem',
          fontWeight: '500',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        Loading Video...
      </div>
    );
  }
}

export default VideoDetail;
