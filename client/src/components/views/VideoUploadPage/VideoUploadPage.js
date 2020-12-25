import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
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
          <Dropzone multiple={false} maxSize={800000000}>
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
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input />
        <br />
        <label>Description</label>
        <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
        <br />
        <br />

        <select style={{ width: '2rem' }}></select>
        <br />

        <select style={{ width: '2rem' }}></select>
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
