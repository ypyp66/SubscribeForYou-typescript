import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as valid from '../lib/validation.js';
import { useForm } from 'react-hook-form';

function Login() {
  const initialUser = {
    userid: "",
    password: "",
    name: "",
    email: "",
    gender: "",
    birthYear: new Date().getFullYear(),
  }

  const [loginPage, setLoginPage] = useState(true);
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

  async function Register() {
    try {
      const result = await axios.post("auth/api/register", user);
      console.log(result.status);

      if (result.status === 201) {
        setLoginPage(true);
      }
    } catch (e) {
      console.log(e.response.data);
    }

  }

  function onSubmit(e) {
    e.preventDefault();
    if (loginPage) {
      Login();
    } else {
      Register();
    }
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
      case "name":
        setUser({ ...user, name: value });
        break;
      case "email":
        setUser({ ...user, email: value });
        break;
      case "gender":
        setUser({ ...user, gender: value });
        break;
      case "birthYear":
        setUser({ ...user, birthYear: value });
        break;
      default:
        break;
    }

  }
  return (
    <div className='flex border rounded-sm w-screen items-center justify-center py-5'>
      {loginPage ? (
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
              setLoginPage(false);
              setUser(initialUser);
              msgInit();
            }}
          >
            계정이 없으신가요?
          </div>
        </form>
      ) : (
        <form
          onSubmit={onSubmit}
          className='flex flex-col w-full p-4 text-base lg:text-sm lg:w-1/2'
        >
          <label className='w-full'>
            <div>아이디 <span className="ml-5 text-xs lg:text-sm text-gray-400">* 영어로 시작해야합니다</span></div>
            <input
              name='userid'
              className='border w-full p-1'
              onChange={onChange}
              value={user.userid}
              required
            />
          </label >
          <label className='w-full mt-4'>
            <div>비밀번호 <span className="ml-3 text-xs lg:text-sm text-gray-400">* 8~15자, 영어, 숫자, 특수문자 포함</span></div>
            <input
              type='password'
              name='password'
              className='border w-full p-1'
              onChange={onChange}
              value={user.password}
              required
            />
          </label>
          <label className='w-full mt-4'>
            <div>이름</div>
            <input
              name='name'
              className='border w-full p-1'
              onChange={onChange}
              value={user.name}
              required
            />
          </label>
          <label className='w-full mt-4'>
            <div>이메일</div>
            <input
              type='email'
              name='email'
              className='border w-full p-1'
              onChange={onChange}
              value={user.email}
              required
            />
          </label>
          <div>성별</div>
          <div className='w-full mt-4 flex justify-around text-md' onChange={onChange}>
            <label>
              <input type="radio" name="gender" value="M"></input>
              남성
            </label>
            <label>
              <input type="radio" name="gender" value="F"></input>
              여성
            </label>
            <label>
              <input type="radio" name="gender" value="N"></input>
              무응답
            </label>
          </div>
          <label className='w-full mt-4'>
            <div>출생년도</div>
            <input
              type='number'
              name='birthYear'
              className='border w-full p-1'
              onChange={onChange}
              value={user.birthYear}
              required
            />
          </label>
          <button
            type='submit'
            className='rounded-md bg-blue-700 text-white mt-5 p-1 lg:text-lg'
          >
            가입하기
          </button>
          <div
            className='w-full text-center underline text-blue-500 cursor-pointer'
            onClick={() => {
              setLoginPage(true);
              setUser(initialUser);
              msgInit();
            }}
          >
            로그인 하기
          </div>
        </form >

      )
      }
    </div >
  );
}

export default Login;
