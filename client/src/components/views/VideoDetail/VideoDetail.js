import React, { useState, useEffect } from 'react';
import { Avatar, Col, Row, List } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';

function VideoDetail(props) {
  const [video, setVideo] = useState([]);
  const videoId = props.match.params.videoId;

  useEffect(() => {
    axios
      .post('/api/video/getVideo', { videoId })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.video);
          setVideo(res.data.video);
        } else {
          alert('Failed to get video Info');
        }
      })
      .catch((err) => console.log(err));
  }, [videoId]);

  if (video.writer) {
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
            <List.Item>
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
