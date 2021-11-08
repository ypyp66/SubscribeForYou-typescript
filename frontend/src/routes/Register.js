import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import REGISTER_STATE from "../constants/Register";
import Validation from "../utils/Validation";
import * as api from "../utils/Api";

function Register() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(REGISTER_STATE.initialState);
  const [errors, setErrors] = useState(REGISTER_STATE.errorState);

  const idBox = useRef();
  const pwBox = useRef();
  const nameBox = useRef();
  const emailBox = useRef();
  const yearBox = useRef();

  const onBlur = (e) => {
    const { name, value } = e.target;
    const { message } = Validation[name](value);

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
    return;
  };

  const onRegister = () => {
    const check =
      Object.values(errors).filter((item) => item !== "").length > 0;
    console.log(Object.values(errors));
    if (check) {
      alert("값을 정확히 입력해주세요");
      return;
    }

    api
      .register(currentUser)
      .then((res) => {
        if (res.status === 201) {
          history.push("/login");
        }
      })
      .catch((e) => {
        console.log("에러");
        console.log(e);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen items-center justify-center text-xs md:text-base">
      <div className="flex rounded-sm w-full items-center justify-center ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col rounded-lg shadow-md bg-gray-100 h-auto justify-center px-10 py-10 w-full"
        >
          <label className="w-full">
            <div>
              <span className="font-medium">아이디</span>{" "}
              <span className="ml-5 text-xs lg:text-sm text-gray-400">
                * 영어로 시작해야합니다
              </span>
            </div>
            <input
              ref={idBox}
              name="userid"
              className="border w-full p-1"
              onChange={onChange}
              onBlur={onBlur}
              value={currentUser.userid}
              required
            />
            {errors.userid && (
              <div className="text-xs text-red-500">{errors.userid}</div>
            )}
          </label>
          <label className="w-full mt-4">
            <div className="flex flex-col mb-1 md:flex-row md:items-center">
              <span className="font-medium">비밀번호</span>{" "}
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
              onBlur={onBlur}
              value={currentUser.password}
              required
            />
            {errors.password && (
              <div className="text-xs text-red-500">{errors.password}</div>
            )}
          </label>
          <label className="w-full mt-4">
            <div className="font-medium">이름</div>
            <input
              ref={nameBox}
              name="name"
              className="border w-full p-1"
              onChange={onChange}
              onBlur={onBlur}
              value={currentUser.name}
              required
            />
            {errors.name && (
              <div className="text-xs text-red-500">{errors.name}</div>
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
              onBlur={onBlur}
              value={currentUser.email}
              required
            />
            {errors.email && (
              <div className="text-xs text-red-500">{errors.email}</div>
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
              onBlur={onBlur}
              value={currentUser.birthYear}
              required
            />
            {errors.birthYear && (
              <div className="text-xs text-red-500">{errors.birthYear}</div>
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
              history.push("/login");
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
