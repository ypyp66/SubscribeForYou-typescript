import { useRef, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUser } from '../modules/auth';
import { connect } from 'react-redux';

function Dropout({ setUser, user }) {
  const history = useHistory();
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');

  const pwdBox = useRef();

  function Dropout() {
    axios({
      url: `/auth/api/user/${sessionStorage.getItem('pk')}`,
      method: 'delete',
      data: {
        pwd: pwd,
      },
      headers: {
        Authorization: `Token ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode === 200) {
          setMessage('탈퇴가 완료되었습니다.');
          sessionStorage.removeItem('userid');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('pk');

          setUser(null);

          if (!user) {
            history.push('/');
          }
        }
      })
      .catch((e) => {
        setMessage('비밀번호가 일치하지 않습니다.');
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    Dropout();
  }

  function onChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'pwd':
        setPwd(value);
        break;
      default:
        break;
    }
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <form onSubmit={onSubmit}>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    회원 탈퇴
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두
                      삭제됩니다. 정말 회원 탈퇴를 하시겠습니까?
                    </p>
                  </div>
                  <br />
                  <label>
                    <div className="font-medium text-gray-700 mb-1">
                      비밀번호를 다시 입력하세요
                    </div>
                    <input
                      ref={pwdBox}
                      name="pwd"
                      className="border w-full p-1 text-center"
                      type="password"
                      onChange={onChange}
                      value={pwd}
                      required
                    />
                  </label>
                  {message && (
                    <div className="text-red-500 mt-3">{message}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse -mt-3">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                탈퇴하기
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  history.push('/detail');
                }}
              >
                취소하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  {
    setUser,
  },
)(Dropout);
