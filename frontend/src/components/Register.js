import React from "react";

function Register() {
  return (
    <div className='flex border rounded-sm w-screen items-center justify-center py-5'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col w-full p-4 lg:text-xl lg:w-1/2'
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
          className='rounded-md bg-blue-700 text-white mt-5 p-1'
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

export default Register;
