import React from "react";

type HomeMessageProps = {
  totalPrice: number;
};

function HomeMessage({ totalPrice }: HomeMessageProps) {
  const month: number = new Date().getMonth() + 1;

  return (
    <div className="text-base font-semibold my-8 lg:text-xl lg:flex lg:items-center">
      <div className="lg:flex lg:items-center">
        <span className="text-3xl">{month}</span>월 결제금액은
      </div>
      <div className="lg:ml-3">
        <span className="text-xl text-blue-600">{totalPrice}</span>원입니다
      </div>
    </div>
  );
}

export default React.memo(HomeMessage);
