import { React } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser, setToken, setPk } from '../modules/auth';
import { useHistory } from 'react-router-dom';

function Navbar({ setToken, setUser }) {
  const history = useHistory();
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
        sessionStorage.removeItem('pk');

        setUser(null);
        setToken(null);
        setPk(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-between">
    <svg className="cursor-pointer h-14 w-14"   xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 36 24" stroke="gray"
        onClick={() => {
          history.push('/detail');
        }}
        >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
      <button
        className="border p-2 text-base lg:text-base rounded-md bg-blue-700 text-white"
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
