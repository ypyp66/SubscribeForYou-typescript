import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as valid from '../lib/validation';

function Detail() {
  const history = useHistory();
  const [originPwd, setOriginPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [reNewPwd, setReNewPwd] = useState('');
  const [message, setMessage] = useState('');

  const originPwdBox = useRef();
  const newPwdBox = useRef();
  const reNewPwdBox = useRef();

  useEffect(() => {
    console.log(originPwd, newPwd, reNewPwd);
  }, [originPwd, newPwd, reNewPwd]);

  function Detail() {
    if (!valid.pwValidation(newPwd).result) {
      setNewPwd(valid.pwValidation(newPwd).message);
      setNewPwd('');
      setMessage(
        '비밀번호를 8~15자, 영어, 숫자, 특수문자 포함해서 입력해주세요.',
      );
      newPwdBox.current.focus();
      return;
    }

    if (newPwd !== reNewPwd) {
      setNewPwd('');
      setReNewPwd('');
      setMessage('새로 입력한 비밀번호가 일치하지가 않습니다.');
      newPwdBox.current.focus();
      return;
    }

    if (originPwd === newPwd) {
      setNewPwd('');
      setReNewPwd('');
      setMessage('현재 비밀번호와 다른 비밀번호를 입력해주세요.');
      newPwdBox.current.focus();
      return;
    }

    axios({
      url: `/auth/api/user/${sessionStorage.getItem('pk')}`,
      method: 'patch',
      data: {
        old_pwd: originPwd,
        new_pwd: newPwd,
        re_pwd: reNewPwd,
      },
      headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
    })
      .then((res) => {
        console.log(res);
        const statusCode = res.status;

        if (statusCode === 200) {
          history.push('/');
          alert('비밀번호가 변경되었습니다.');
        }
      })
      .catch((e) => {
        console.log(e);
        setOriginPwd('');
        originPwdBox.current.focus();
        setMessage('현재 비밀번호를 잘못 입력하셨습니다.');
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    Detail();
  }

  function onChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'originPwd':
        setOriginPwd(value);
        break;
      case 'newPwd':
        setNewPwd(value);
        break;
      case 'reNewPwd':
        setReNewPwd(value);
        break;
      default:
        break;
    }
  }

  //새로운 비밀번호 유효성 검사

  return (
    <div className="flex h-screen items-center justify-center text-xs md:text-base border-box">
      <div className="flex h-full w-full rounded-sm items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col rounded-lg shadow-lg bg-gray-100 justify-center px-10 py-10 w-full"
        >
          <label className="w-full">
            <div className="mb-1 text-sm font-medium">현재 비밀번호</div>
            <input
              ref={originPwdBox}
              name="originPwd"
              className="border w-full p-1.5"
              type="password"
              onChange={onChange}
              value={originPwd}
              required
            />
          </label>

          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center">
              <span className="mb-1 text-base font-medium">새 비밀번호</span>
            </div>
            <input
              ref={newPwdBox}
              name="newPwd"
              className="border w-full p-1.5"
              type="password"
              onChange={onChange}
              value={newPwd}
              placeholder="8~15자, 영어, 숫자, 특수문자 포함"
              required
            />
          </label>

          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center text-base font-thin">
              새 비밀번호 확인
            </div>
            <input
              ref={reNewPwdBox}
              name="reNewPwd"
              className="border w-full p-1.5"
              type="password"
              onChange={onChange}
              value={reNewPwd}
              required
            />
          </label>

          {message && (
            <div className="text-sm text-red-600 text-center mt-4">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="rounded-md bg-blue-700 text-white mt-4 p-1.5 font-medium hover:bg-blue-800"
          >
            비밀번호 변경
          </button>

          <button
            type="button"
            className="rounded-md bg-red-600 text-white mt-3 p-1.5 font-medium hover:bg-red-700"
            onClick={() => {
              history.push('/dropout');
            }}
          >
            탈퇴하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Detail;
