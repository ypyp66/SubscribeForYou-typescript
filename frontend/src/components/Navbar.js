import { React } from "react";

function Navbar({ setUser }) {
  return (
    <div className='flex justify-end'>
      <button className='border p-2 text-base lg:text-xl rounded-md bg-blue-700 text-white'>
        로그아웃
      </button>
    </div>
  );
}

export default Navbar;
