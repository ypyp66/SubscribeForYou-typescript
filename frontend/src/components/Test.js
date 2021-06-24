import React from "react";
import axios from "axios";

function Test() {
  function onClick() {
    axios.get("auth/api/test").then((res) => console.log(res.data));
  }
  return (
    <div>
      <button className='border p-5' onClick={onClick}>
        버튼
      </button>
    </div>
  );
}

export default Test;
