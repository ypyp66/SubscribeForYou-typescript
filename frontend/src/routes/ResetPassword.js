import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';

function ResetPassword() {
  const history = useHistory();
  const location = useLocation();
  const [isSend, setIsSend] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [newPwd, setNewPwd] = useState('');

  useEffect(() => {
    if (location.search) {
      const tken = location.search.split('=')[1];
      console.log(tken);
      setIsSend(true);
      setToken(tken);
    }
  }, []);

  const sendResetRequest = () => {
    axios.post('auth/api/password_reset', { email });
  };

  const sendResetPassword = () => {
    console.log(token, password, token);
    axios
      .post('auth/api/password_resetconfirm/', {
        password,
        token,
      })
      .then((res) => {
        if (res.status) {
          history.push('/');
          alert('변경에 성공하였습니다😁');
        }
      })
      .catch((e) => console.log(e));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setNewPwd(value);
        break;
      default:
        break;
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();
    sendResetPassword();
  };

  const sendRestEmail = (e) => {
    e.preventDefault();
    sendResetRequest();
    alert('메일을 확인하세요');
  };
  return (
    <div className="flex h-screen w-full items-center justify-center md:text-base border-box">
      <div className="flex h-full rounded-sm items-center justify-center ">
        {!isSend && (
          <form
            className="flex flex-col rounded-lg shadow-md bg-gray-100 justify-center p-10"
            style={{ minWidth: '15rem' }}
            onSubmit={sendRestEmail}
          >
            <label className="min-w-full mt-4">
              <div className="font-medium">이메일 입력</div>
              <input
                name="email"
                className="border w-full p-1"
                type="email"
                onChange={onChange}
                value={email}
                required
              />
            </label>

            <button
              type="submit"
              className="rounded-md bg-indigo-700 text-white mt-5 p-1"
            >
              전송
            </button>
          </form>
        )}
        {isSend && (
          <form
            className="flex flex-col rounded-lg shadow-md bg-gray-100 justify-center px-10 py-10"
            style={{ minWidth: '15rem' }}
            onSubmit={resetPassword}
          >
            <label className="w-full mt-4">
              <div className="flex flex-col mb-1 md:flex-row md:items-center">
                <span className="font-medium">새 비밀번호</span>
                <span className="text-xs lg:text-sm text-gray-400 lg:ml-5">
                  * 8~15자, 영어, 숫자, 특수문자 포함
                </span>
              </div>
              <input
                name="password"
                className="border w-full p-1"
                type="password"
                onChange={onChange}
                value={password}
                required
              />
            </label>

            <label className="w-full mt-4">
              <div className="flex flex-col mb-1 md:flex-row md:items-center">
                새 비밀번호 확인
              </div>
              <input
                name="passwordConfirm"
                className="border w-full p-1"
                type="password"
              />
            </label>

            <button
              type="submit"
              className="rounded-md bg-indigo-700 text-white mt-5 p-1"
            >
              비밀번호 변경
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
