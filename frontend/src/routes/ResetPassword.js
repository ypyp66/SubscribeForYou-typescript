import React, { useState } from 'react';

function ResetPassword() {
  const [isSend, setIsSend] = useState(false);

  const sendRestEmail = () => {
    setIsSend(true);
  };
  return (
    <div className="flex h-full items-center justify-center text-xs md:text-base border-box">
      <div className="flex h-full min-w-full rounded-sm items-center justify-center ">
        {!isSend && (
          <form
            className="flex flex-col rounded-lg shadow-md bg-gray-100 justify-center px-10 py-10"
            style={{ minWidth: '15rem' }}
          >
            <label className="min-w-full mt-4">
              <div className="font-medium">이메일 입력</div>
              <input
                name="newPwd"
                className="border w-full p-1"
                type="password"
                required
              />
            </label>

            <button
              type="submit"
              className="rounded-md bg-indigo-700 text-white mt-5 p-1"
              onClick={sendRestEmail}
            >
              전송
            </button>
          </form>
        )}
        {isSend && (
          <form
            className="flex flex-col rounded-lg shadow-md bg-gray-100 justify-center px-10 py-10"
            style={{ minWidth: '15rem' }}
          >
            <label className="w-full mt-4">
              <div className="flex flex-col mb-1 md:flex-row md:items-center">
                <span className="font-medium">새 비밀번호</span>
                <span className="text-xs lg:text-sm text-gray-400 lg:ml-5">
                  * 8~15자, 영어, 숫자, 특수문자 포함
                </span>
              </div>
              <input
                name="newPwd"
                className="border w-full p-1"
                type="password"
                required
              />
            </label>

            <label className="w-full mt-4">
              <div className="flex flex-col mb-1 md:flex-row md:items-center">
                새 비밀번호 확인
              </div>
              <input
                name="reNewPwd"
                className="border w-full p-1"
                type="password"
                required
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
