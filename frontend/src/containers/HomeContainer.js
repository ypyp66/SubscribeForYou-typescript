import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Home from '../components/Home';
import MainMessage from '../components/MainMessage';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { getPost } from '../modules/subscribes';

function HomeContainer({ post, loadingPost, getPost }) {
  useEffect(() => {
    getUsersSubscribeData();
  }, []);

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

  return (
    <div>
      <Navbar />
      <MainMessage />
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
