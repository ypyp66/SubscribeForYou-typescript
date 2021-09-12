import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setPk } from '../modules/auth';
import { useHistory } from 'react-router-dom';
import LOGO from '../img/LOGO2.png';
import * as api from '../utils/Api';

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    api.logOut().then((res) => {
      if (res.status === 204) {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('pk');

        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setPk(null));
      }
    });
  };
  return (
    <div className="flex justify-between items-center mt-5">
      <svg
        className="cursor-pointer h-16 w-16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 36 24"
        stroke="gray"
        onClick={() => {
          history.push('/detail');
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <img
        src={LOGO}
        alt="로고"
        width="130px"
        height="100px"
        className="mr-3"
      />
      <button
        className="border p-2 text-xs rounded-md bg-blue-700 text-white"
        onClick={onLogout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default React.memo(Navbar);
