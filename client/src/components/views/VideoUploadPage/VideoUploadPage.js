import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Privacy = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const Category = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
  { value: 4, label: 'Sports' },
];

function VideoUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrivacy = (e) => {
    setPrivacy(e.target.value);
    console.log(privacy);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = { 'content-type': 'multipart/form-data' };
    console.log(files);
    formData.append('file', files[0]);
    axios
      .post('/api/video/upload', formData, config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          const variable = {
            url: res.data.url,
            filename: res.data.filename,
          };
          setFilePath(res.data.url);

          axios
            .post('/api/video/thumbnail', variable)
            .then((res) => {
              if (res.data.success) {
                console.log(res.data);
                setThumbnailPath(res.data.url);
                setDuration(res.data.duration);
              } else {
                alert('썸네일 생성에 실패했습니다');
              }
            })
            .catch((err) => console.log(err));
        } else {
          alert('비디오 업로드를 실패했습니다');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}> Upload Video</Title>
      </div>
      <Form
        style={{
          width: '650px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <input {...getInputProps()} accept='video/*' />
                <PlusOutlined style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {thumbnailPath && (
            <div>
              <img
                src={`http://localhost:8080/${thumbnailPath}`}
                alt='thumbnail'
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input value={title} onChange={handleChangeTitle} />
        <br />
        <label>Description</label>
        <TextArea
          value={description}
          onChange={handleChangeDescription}
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
        <br />
        <br />

        <select onChange={handleChangePrivacy}>
          {Privacy.map((item, idx) => {
            return (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <br />

        <select onChange={handleChangeCategory}>
          {Category.map((item, idx) => {
            return (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <Button
          type='primary'
          size='large'
          style={{ alignSelf: 'flex-start', width: '85px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(VideoUploadPage);
