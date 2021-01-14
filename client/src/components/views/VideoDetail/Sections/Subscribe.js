import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Subscribe(props) {
  const user = useSelector((state) => state.users);
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const data = { userTo: props.userTo };
    axios
      .post('/api/subscriber/subscribeNumber', data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        } else {
          alert('구독자 수 정보를 받아오지 못했습니다');
        }
      })
      .catch((err) => console.log(err));

    axios
      .post('/api/subscriber/subscribed', {
        ...data,
        userFrom: user.userData._id,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setSubscribed(res.data.subscribed);
        } else {
          alert('구독여부 정보를 받아오지 못했습니다');
        }
      })
      .catch((err) => console.log(err));
  }, [user, subscribeNumber]);

  const onSubscribe = () => {
    const data = {
      userTo: props.userTo,
      userFrom: user.userData._id,
    };
    if (subscribed) {
      axios
        .post('/api/subscriber/unsubscribe', data)
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(!subscribed);
          } else {
            alert('구독을 취소하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('/api/subscriber/subscribe', data)
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber + 1);
            setSubscribed(!subscribed);
          } else {
            alert('구독하는데 실패했습니다');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}>
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
