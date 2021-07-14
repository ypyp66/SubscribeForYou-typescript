import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as valid from '../lib/validation';

function Register() {
  const initialUser = {
    userid: '',
    password: '',
    name: '',
    email: '',
    gender: '',
    birthYear: new Date().getFullYear(),
  };

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [yearErrorMsg, setYearErrorMsg] = useState('');

  const idBox = useRef();
  const pwBox = useRef();
  const nameBox = useRef();
  const emailBox = useRef();
  const yearBox = useRef();

  async function Register() {
    //유효성 검사
    if (!valid.idValidation(currentUser.userid).result) {
      setIdErrorMsg(valid.idValidation(currentUser.userid).message);
      setCurrentUser({ ...currentUser, userid: '' });
      idBox.current.focus();
      return;
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

    if (!valid.emailValidation(currentUser.email).result) {
      setEmailErrorMsg(valid.emailValidation(currentUser.email).message);
      setCurrentUser({ ...currentUser, email: '' });
      emailBox.current.focus();
      return;
    } else {
      setEmailErrorMsg(valid.emailValidation(currentUser.email).message);
    }

    if (!valid.nameValidation(currentUser.name).result) {
      setNameErrorMsg(valid.nameValidation(currentUser.name).message);
      setCurrentUser({ ...currentUser, name: '' });
      nameBox.current.focus();
      return;
    } else {
      setNameErrorMsg(valid.nameValidation(currentUser.name).message);
    }

    if (!valid.yearValidation(currentUser.birthYear).result) {
      setYearErrorMsg(valid.yearValidation(currentUser.birthYear).message);
      setCurrentUser({ ...currentUser, birthYear: '' });
      yearBox.current.focus();
      return;
    } else {
      setYearErrorMsg(valid.yearValidation(currentUser.birthYear).message);
    }

    try {
      const result = await axios.post('auth/api/user', {
        user_id: currentUser.userid,
        password: currentUser.password,
        u_name: currentUser.name,
        email: currentUser.email,
        gender: currentUser.gender,
        birth_year: currentUser.birthYear,
      });

      if (result.status === 201) {
        history.push('/login');
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 400) {
        const { data } = e.response;

        if (data.email) {
          setEmailErrorMsg(data.email);
        }

        if (data.user_id) {
          setIdErrorMsg(data.user_id);
        }
      }
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    Register();
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
      case 'name':
        setCurrentUser({ ...currentUser, name: value });
        break;
      case 'email':
        setCurrentUser({ ...currentUser, email: value });
        break;
      case 'gender':
        setCurrentUser({ ...currentUser, gender: value });
        break;
      case 'birthYear':
        setCurrentUser({ ...currentUser, birthYear: value });
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex h-screen items-center justify-center text-xs md:text-base">
      <div className="flex rounded-sm w-full items-center justify-center ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col rounded-lg shadow-md bg-gray-100 h-auto justify-center px-10 py-10 w-full"
        >
          <label className="w-full">
            <div>
              <span className="font-medium">아이디</span>{' '}
              <span className="ml-5 text-xs lg:text-sm text-gray-400">
                * 영어로 시작해야합니다
              </span>
            </div>
            <input
              ref={idBox}
              name="userid"
              className="border w-full p-1"
              onChange={onChange}
              value={currentUser.userid}
              required
            />
            {idErrorMsg && (
              <div className="text-xs text-red-500">{idErrorMsg}</div>
            )}
          </label>
          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center">
              <span className="font-medium">비밀번호</span>{' '}
              <span className="text-xs lg:text-sm text-gray-400 lg:ml-5">
                * 8~15자, 영어, 숫자, 특수문자 포함
              </span>
            </div>
            <input
              ref={pwBox}
              type="password"
              name="password"
              className="border w-full p-1"
              onChange={onChange}
              value={currentUser.password}
              required
            />
            {pwErrorMsg && (
              <div className="text-xs text-red-500">{pwErrorMsg}</div>
            )}
          </label>
          <label className="w-full mt-4">
            <div className="font-medium">이름</div>
            <input
              ref={nameBox}
              name="name"
              className="border w-full p-1"
              onChange={onChange}
              value={currentUser.name}
              required
            />
            {nameErrorMsg && (
              <div className="text-xs text-red-500">{nameErrorMsg}</div>
            )}
          </label>
          <label className="w-full mt-4">
            <div className="font-medium">이메일</div>
            <input
              ref={emailBox}
              type="email"
              name="email"
              className="border w-full p-1"
              onChange={onChange}
              value={currentUser.email}
              required
            />
            {emailErrorMsg && (
              <div className="text-xs text-red-500">{emailErrorMsg}</div>
            )}
          </label>
          <div className="font-medium">성별</div>
          <div
            className="w-full mt-4 flex justify-around text-md"
            onChange={onChange}
          >
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
          <label className="w-full mt-4">
            <div className="font-medium">출생년도</div>
            <input
              ref={yearBox}
              type="number"
              name="birthYear"
              className="border w-full p-1"
              onChange={onChange}
              value={currentUser.birthYear}
              required
            />
            {yearErrorMsg && (
              <div className="text-xs text-red-500">{yearErrorMsg}</div>
            )}
          </label>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 text-white mt-5 p-1 lg:text-lg"
          >
            가입하기
          </button>
          <div
            className="w-full text-xs sm:text-sm text-center text-gray-400 cursor-pointer mt-5 font-normal"
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인 하기
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
