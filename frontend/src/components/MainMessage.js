import React from 'react';

function MainMessage({ totalPrice }) {
  return (
    <div className="text-base font-semibold my-8 lg:text-2xl lg:flex">
      <div>
        <span className="text-3xl">{new Date().getMonth() + 1}</span>월
        결제금액은
      </div>
      <div className="lg:ml-3">
        <span className="text-xl">{totalPrice}</span>원입니다
      </div>
    </div>
  );
}

export default MainMessage;
