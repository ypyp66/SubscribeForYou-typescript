import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as valid from '../lib/validation.js';
import { useHistory } from 'react-router-dom';

function Login() {
  const initialUser = {
    userid: "",
    password: "",
  }
  const history = useHistory();
  const [user, setUser] = useState(initialUser);
  const [errorMsg, setErrorMsg] = useState("");
  const [idErrorMsg, setIdErrorMsg] = useState("");
  const [pwErrorMsg, setPwErrorMsg] = useState("");

  const idBox = useRef();
  const pwBox = useRef();

  function msgInit() {
    setIdErrorMsg("");
    setPwErrorMsg("");
    setErrorMsg("");
  }

  async function Login() {
    if (!valid.idValidation(user.userid)) {
      setIdErrorMsg("아이디는 영어로 시작해야합니다.");
      setUser({ ...user, userid: "" })
      idBox.current.focus();
      return;
    }

    if (!valid.pwValidation(user.password)) {
      setPwErrorMsg("비밀번호는 특수문자를 포함 해야합니다.");
      setUser({ ...user, password: "" })
      pwBox.current.focus();
      return;
    }

    try {
      const result = await axios
        .post("auth/api/login", {
          userid: user.userid,
          password: user.password,
        });
      console.log(result);

    } catch (e) {
      console.log(e.response)
      const error = e.response.status;
      switch (error) {
        case 401:
          console.log(error)
          setErrorMsg("아이디 또는 비밀번호가 다릅니다.");
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
      case "userid":
        setUser({ ...user, userid: value });
        break;
      case "password":
        setUser({ ...user, password: value });
        break;
      default:
        break;
    }

  }
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='flex border rounded-sm w-screen items-center justify-center py-5'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col w-full p-4 lg:text-md lg:w-1/2'
        >
          <label className='w-full'>
            <div>아이디</div>
            <input
              ref={idBox}
              name='userid'
              className='border w-full p-1'
              onChange={onChange}
              value={user.userid}
              required
            />
            {idErrorMsg && idErrorMsg}
          </label>
          <label className='w-full mt-4'>
            <div>비밀번호 <span className="ml-5 text-xs lg:text-sm text-gray-400">* 8~15자, 영어, 숫자, 특수문자 포함</span></div>
            <input
              ref={pwBox}
              type='password'
              name='password'
              className='border w-full p-1'
              onChange={onChange}
              value={user.password}
              required
            />
            {pwErrorMsg && pwErrorMsg}<br />
            {errorMsg && errorMsg}
          </label>
          <button
            type='submit'
            className='rounded-md bg-blue-700 text-white mt-5 p-1'
          >
            로그인하기
          </button>
          <div
            className='w-full text-center underline text-blue-500 cursor-pointer'
            onClick={() => {
              history.push('/register')
            }}
          >
            계정이 없으신가요?
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
