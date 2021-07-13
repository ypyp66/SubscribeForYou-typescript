import { useRef, useState } from 'react';
import axios from 'axios';
import * as valid from '../lib/validation.js';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setToken, setPk } from '../modules/auth';
import LOGO from '../img/LOGO2.png';
function Login({ user, token, pk, setUser, setToken, setPk }) {
  const initialUser = {
    userid: '',
    password: '',
  };

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [errorMsg, setErrorMsg] = useState('');
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');

  const idBox = useRef();
  const pwBox = useRef();

  async function Login() {
    if (!valid.idValidation(currentUser.userid).result) {
      setIdErrorMsg(valid.idValidation(currentUser.userid).message);
      setCurrentUser({ ...currentUser, userid: '' });
      idBox.current.focus();
    } else {
      setIdErrorMsg(valid.idValidation(currentUser.userid).message);
    }

    if (!valid.pwValidation(currentUser.password).result) {
      setPwErrorMsg(valid.pwValidation(currentUser.password).message);
      setCurrentUser({ ...currentUser, password: '' });
      pwBox.current.focus();
      return;
    } else {
      setPwErrorMsg(valid.pwValidation(currentUser.password).message);
    }

    try {
      const result = await axios.post('auth/api/login', {
        user_id: currentUser.userid,
        password: currentUser.password,
      });
      if (result.status === 200) {
        //로그인 성공 시
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('userid', result.data.user_id);
        sessionStorage.setItem('pk', result.data.user_pk);

        setUser(result.data.user_id);
        setToken(result.data.token);
        setPk(result.data.user_pk);

        if (user) {
          history.push('/');
        }
      }
    } catch (e) {
      const status = e.response.status;
      switch (status) {
        case 401:
          setErrorMsg('아이디 또는 비밀번호가 다릅니다.');
          break;
        default:
          break;
      }
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    Login();
  }

  function onChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'userid':
        setCurrentUser({ ...currentUser, userid: value });
        break;
      case 'password':
        setCurrentUser({ ...currentUser, password: value });
        break;
      default:
        break;
    }
  }
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
              name="userid"
              className="text-sm font-bold text-gray-600 border w-full p-1 mb-3"
              onChange={onChange}
              value={currentUser.userid}
              required
            />
            {idErrorMsg && <div className="text-xs">{idErrorMsg}</div>}
          </label>
          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center">
              <span className="text-sm font-medium">비밀번호</span>
              {/* <span className="text-xs lg:text-sm text-gray-400 lg:ml-5 ml-3">
                * 8~15자, 영어, 숫자, 특수문자 포함
              </span> */}
            </div>
            <input
              ref={pwBox}
              type="password"
              name="password"
              className="text-sm font-bold text-gray-600 border w-full p-1 mb-3"
              onChange={onChange}
              value={currentUser.password}
              required
            />
            {pwErrorMsg && <div className="text-xs">{pwErrorMsg}</div>}
            {errorMsg && <div className="text-xs">{errorMsg}</div>}
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

export default connect(
  (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    pk: state.auth.pk,
  }),
  {
    setUser,
    setToken,
    setPk,
  },
)(Login);
