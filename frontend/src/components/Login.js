import React, { useState } from "react";
import axios from "axios";
import * as api from '../lib/api'

function Login() {
  const [loginPage, setLoginPage] = useState(true);
  const [user, setUser] = useState({
    userid: "",
    password: "",
    name: "",
    email: "",
    gender: "",
    birthYear: new Date().getFullYear(),
  });
  const [errorMsg, setErrorMsg] = useState("");

  async function Login() {
    try {
      const result = await axios
        .post("auth/api/login", {
          userid: user.userid,
          password: user.password,
        });
    } catch (e) {
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
    const result = await axios
      .post("auth/api/login", {
        userid: user.userid,
        password: user.password,
      });
    console.log(result.data)
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!loginPage) {
      Login();
    } else {
      Register();
    }
  }

  function onChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "userid":
        e.target.value = setUser({ ...user, userid: value });
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
          className='flex flex-col w-full p-4 text-base lg:text-sm lg:w-1/2'
        >
          <label className='w-full'>
            <div>아이디</div>
            <input
              name='userid'
              value=''
              className='border w-full p-1'
              onChange={onChange}
              value={user.userid}
              required
            />
          </label>
          <label className='w-full mt-4'>
            <div>비밀번호</div>
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
          <label className='w-full mt-4'>
            <div>성별</div>
            <input
              name='gender'
              className='border w-full p-1'
              onChange={onChange}
              value={user.gender}
              required
            />
            <input type="radio" name="gender" value="M" />
            <label for="M">남성</label>
            <input type="radio" name="gender" value="F" />
            <label for="F">여성</label>
          </label>
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
            onClick={() => setLoginPage(false)}
          >
            로그인 하기
          </div>
        </form>

      ) : (
        <form
          onSubmit={onSubmit}
          className='flex flex-col w-full p-4 lg:text-sm lg:w-1/2'
        >
          <label className='w-full'>
            <div>아이디</div>
            <input
              name='userid'
              value=''
              className='border w-full p-1'
              onChange={onChange}
              value={user.userid}
              required
            />
          </label>
          <label className='w-full mt-4'>
            <div>비밀번호</div>
            <input
              type='password'
              name='password'
              className='border w-full p-1'
              onChange={onChange}
              value={user.password}
              required
            />
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
            onClick={() => setLoginPage(true)}
          >
            계정이 없으신가요?
          </div>

        </form>
      )}
    </div>
  );
}

export default Login;
