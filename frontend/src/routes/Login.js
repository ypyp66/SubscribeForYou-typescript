import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Validation from '../utils/Validation.js';
import * as api from '../utils/Api';
import LOGO from '../img/LOGO2.png';
import LOGIN_STATE from '../constants/Login.js';

import SESSION from '../constants/StorageKeys.js';
import { setPk, setToken, setUser } from '../modules/auth.js';

function Login() {
  const user = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState(LOGIN_STATE.initialState);
  const [error, setError] = useState(LOGIN_STATE.errorState);

  const history = useHistory();
  const dispatch = useDispatch();

  const idBox = useRef();
  const pwBox = useRef();

  const onBlur = (e) => {
    const { name, value } = e.target;
    const { message } = Validation[name](value);

    setError((prev) => ({
      ...prev,
      [name]: message,
    }));

    return;
  };

  const onLogin = () => {
    const check = Object.values(error).filter((item) => item !== '').length > 0;
    if (check) alert('값을 정확히 입력해주세요');

    api
      .logIn(currentUser)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem(SESSION.TOKEN, res.data.token);
          sessionStorage.setItem(SESSION.USER, res.data.user_id);
          sessionStorage.setItem(SESSION.PK, res.data.user_pk);

          dispatch(setToken(res.data.token));
          dispatch(setPk(res.data.user_pk));
          dispatch(setUser(res.data.user_id));

          if (user) {
            history.push('/');
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin();
    return;
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    return;
  };
  return (
    <div className="flex h-screen items-center justify-center text-xs md:text-base ">
      <div className="flex flex-col rounded-sm w-full items-center justify-center ">
        <img src={LOGO} alt="로고" width="300px" height="200px" />
        <form
          onSubmit={onSubmit}
          className="flex flex-col rounded-lg shadow-md bg-gray-100 h-1/2 justify-center px-11 py-14 w-full sm:w-9/12"
        >
          <label className="w-full">
            <div className="mb-1 text-sm font-medium">아이디</div>
            <input
              ref={idBox}
              type="text"
              name="userid"
              className="text-sm font-bold text-gray-600 border w-full p-1 mb-3"
              onChange={onChange}
              onBlur={onBlur}
              value={currentUser.userid}
              required
            />
            {error.userid && <div className="text-xs">{error.userid}</div>}
          </label>
          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center">
              <span className="text-sm font-medium">비밀번호</span>
            </div>
            <input
              ref={pwBox}
              type="password"
              name="password"
              className="text-sm font-bold text-gray-600 border w-full p-1 mb-3"
              onChange={onChange}
              onBlur={onBlur}
              value={currentUser.password}
              required
            />
            {error.password && <div className="text-xs">{error.password}</div>}
          </label>
          <button
            type="submit"
            className="rounded-md bg-blue-600 p-2.5 text-white mt-5 font-medium"
          >
            로그인
          </button>
          <div
            className="w-full text-xs sm:text-sm text-center text-gray-400 cursor-pointer mt-5 font-normal"
            onClick={() => {
              history.push('/register');
            }}
          >
            회원가입
          </div>
          <div
            className="w-full text-xs sm:text-sm text-center text-gray-400 cursor-pointer mt-3 font-normal"
            onClick={() => {
              history.push('/resetpwd');
            }}
          >
            비밀번호 재설정
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
