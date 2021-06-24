import React, { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import * as valid from '../lib/validation';

function Register() {
  const initialUser = {
    userid: "",
    password: "",
    name: "",
    email: "",
    gender: "",
    birthYear: new Date().getFullYear(),
  }

  const history = useHistory();
  const [user, setUser] = useState(initialUser);
  const [idErrorMsg, setIdErrorMsg] = useState("");
  const [pwErrorMsg, setPwErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [genderErrorMsg, setGenderErrorMsg] = useState("");
  const [yearErrorMsg, setYearErrorMsg] = useState("");

  const idBox = useRef();
  const pwBox = useRef();
  const nameBox = useRef();
  const emailBox = useRef();
  const genderBox = useRef();
  const yearBox = useRef();


  async function Register() {
    if (!valid.idValidation(user.userid).result) {
      setIdErrorMsg(valid.idValidation(user.userid).message);
      setUser({ ...user, userid: "" })
      idBox.current.focus();
      return;
    } else {
      setIdErrorMsg(valid.idValidation(user.userid).message);
    }

    if (!valid.pwValidation(user.password).result) {
      setPwErrorMsg(valid.pwValidation(user.password).message);
      setUser({ ...user, password: "" })
      pwBox.current.focus();
      return;
    } else {
      setPwErrorMsg(valid.pwValidation(user.password).message);
    }

    if (!valid.emailValidation(user.email).result) {
      setEmailErrorMsg(valid.emailValidation(user.email).message);
      setUser({ ...user, email: "" })
      emailBox.current.focus();
      return;
    } else {
      setEmailErrorMsg(valid.emailValidation(user.email).message);
    }
    if (!valid.nameValidation(user.name).result) {
      setNameErrorMsg(valid.nameValidation(user.name).message);
      setUser({ ...user, name: "" })
      nameBox.current.focus();
      return;
    } else {
      setNameErrorMsg(valid.nameValidation(user.name).message);
    }

    try {
      const result = await axios.post("auth/api/register", user);
      console.log(result);

      if (result.status === 201) {
        history.push('/login');
      }
    } catch (e) {
      console.log(e.response.data);
    }

  }

  function onSubmit(e) {
    e.preventDefault();




    Register();
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
    <div className='h-full flex items-center justify-center'>
      <div className='flex border rounded-sm w-screen items-center justify-center py-5'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col w-full p-4 text-base lg:text-sm lg:w-1/2'
        >
          <label className='w-full'>
            <div><span className="font-bold">아이디</span> <span className="ml-5 text-xs lg:text-sm text-gray-400">* 영어로 시작해야합니다</span></div>
            <input
              name='userid'
              className='border w-full p-1'
              onChange={onChange}
              value={user.userid}
              required
            />
            {idErrorMsg && idErrorMsg}
          </label >
          <label className='w-full mt-4'>
            <div><span className="font-bold">비밀번호</span> <span className="ml-3 text-xs lg:text-sm text-gray-400">* 8~15자, 영어, 숫자, 특수문자 포함</span></div>
            <input
              ref={pwBox}
              type='password'
              name='password'
              className='border w-full p-1'
              onChange={onChange}
              value={user.password}
              required
            />
            {pwErrorMsg && pwErrorMsg}
          </label>
          <label className='w-full mt-4'>
            <div className="font-bold">이름</div>
            <input
              ref={nameBox}
              name='name'
              className='border w-full p-1'
              onChange={onChange}
              value={user.name}
              required
            />
            {nameErrorMsg && nameErrorMsg}
          </label>
          <label className='w-full mt-4'>
            <div className="font-bold">이메일</div>
            <input
              ref={emailBox}
              type='email'
              name='email'
              className='border w-full p-1'
              onChange={onChange}
              value={user.email}
              required
            />
            {emailErrorMsg && emailErrorMsg}
          </label>
          <div className="font-bold">성별</div>
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
            <div className="font-bold">출생년도</div>
            <input
              ref={yearBox}
              type='number'
              name='birthYear'
              className='border w-full p-1'
              onChange={onChange}
              value={user.birthYear}
              required
            />
            {yearErrorMsg && yearErrorMsg}
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
              history.push('/login');
            }}
          >
            로그인 하기
          </div>
        </form >
      </div>
    </div>
  );
}

export default Register;
