import { React, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser, setToken, setPk } from '../modules/auth';

function Navbar({ setToken, setUser }) {
  const onLogout = async () => {
    const currentToken = sessionStorage.getItem('token');

    if (!currentToken) {
      return;
    }

    try {
      const result = await axios({
        url: 'auth/api/logout',
        method: 'post',
        headers: { Authorization: `Token ${currentToken}` },
      });

      if (result.status === 204) {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('token');

        setUser(null);
        setToken(null);
        setPk(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-end">
      <button
        className="border p-2 text-base lg:text-xl rounded-md bg-blue-700 text-white"
        onClick={onLogout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default connect(null, {
  setUser,
  setToken,
  setPk,
})(Navbar);
