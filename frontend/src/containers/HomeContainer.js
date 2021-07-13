import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Home from '../components/Home';
import HomeMessage from '../components/HomeMessage';
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

  const getUsersSubscribeData = useCallback(async () => {
    const currentToken = sessionStorage.getItem('token');

    try {
      const result = await axios.get('subscribe', {
        headers: { Authorization: `Token ${currentToken}` },
      });

      if (result.status === 200) {
        getPost();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getTotalPrice = useCallback(() => {
    if (post) {
      return post.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    }
  }, [post]);

  return (
    <div>
      <Navbar />
      <HomeMessage totalPrice={totalPrice} />
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
