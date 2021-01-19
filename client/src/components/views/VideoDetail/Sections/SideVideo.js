import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios
      .get('/api/video/getVideos')
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setSideVideos(res.data.videos);
        } else {
          alert('Failed to get Videos');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const renderSideVideos = sideVideos.map((video, idx) => {
    const min = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - min * 60);

    return (
      <div
        key={idx}
        style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width: '40%', marginRight: '1rem' }}>
          <a href={`/video/${video._id}`}>
            <img
              src={`http://localhost:8080/${video.thumbnailPath}`}
              alt='thumbnail'
              style={{ width: '100%' }}
            />
          </a>
        </div>
        <div style={{ width: '50%' }}>
          <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
            <span style={{ fontSize: '1rem', color: 'black' }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {min} : {sec}
            </span>
          </a>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginTop: '3rem' }}></div>
      {renderSideVideos}
    </>
  );
}

export default SideVideo;
