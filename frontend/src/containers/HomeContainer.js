import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Home from '../components/Home';
import MainMessage from '../components/MainMessage';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { getPost } from '../modules/subscribes';

function HomeContainer({ post, loadingPost, getPost }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getUsersSubscribeData();
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [post]);

  const getUsersSubscribeData = async () => {
    const currentToken = sessionStorage.getItem('token');

    try {
      const result = await axios.get('subscribe', {
        headers: { Authorization: `Token ${currentToken}` },
      });

      if (result.status === 200) {
        console.log(result.data);
        getPost(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalPrice = () => {
    if (post) {
      console.log(post);
      return post.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    }
  };

  return (
    <div>
      <Navbar />
      <MainMessage totalPrice={totalPrice} />
      <Home post={post} loadingPost={loadingPost} />
    </div>
  );
}

export default connect(
  ({ subscribes }) => ({
    post: subscribes.post,
    loadingPost: subscribes.loadingPost,
  }),
  {
    getPost,
  },
)(HomeContainer);
