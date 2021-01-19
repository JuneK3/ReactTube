import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage(props) {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  let userId = useRef(null);

  useEffect(() => {
    dispatch(auth()).then((res) => {
      userId.current = res.payload._id;
      const data = { userFrom: userId.current };
      axios
        .post('/api/video/subscriptionVideos', data)
        .then((res) => {
          // console.log(res.data.videos);
          if (res.data.success) {
            setVideos(res.data.videos);
          } else {
            alert('Failed to get Videos');
          }
        })
        .catch((err) => console.log(err));
    });
  }, [userId, dispatch]);

  const renderCards = videos.map((video, idx) => {
    const min = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - min * 60);
    return (
      <Col lg={6} md={8} xs={24} key={'Col' + idx.toString()}>
        <div style={{ position: 'relative' }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: '100%' }}
              alt='thumbnail'
              src={`http://localhost:8080/${video.thumbnailPath}`}
            />
            <div
              className=' duration'
              style={{
                bottom: 0,
                right: 0,
                position: 'absolute',
                margin: '4px',
                color: '#fff',
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                opacity: 0.8,
                padding: '2px 4px',
                borderRadius: '2px',
                letterSpacing: '0.5px',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '12px',
              }}>
              <span>
                {min} : {sec}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: '3rem' }}> {video.views} views</span> •
        <span> {new Date(video.createdAt).toLocaleDateString()} </span>
      </Col>
    );
  });

  return (
    <div
      style={{
        width: '85%',
        margin: '3rem auto',
        height: '100vh',
      }}>
      <Title level={2}> Subscribed </Title>
      <hr />
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
