import React, { useCallback, useState } from 'react';
import Home from '../components/Home';
import HomeMessage from '../components/HomeMessage';
import Navbar from '../components/Navbar';
import SubscribeCreate from '../components/SubscribeCreate';
import SubscribeService from '../utils/SubscribeService';

function HomeRoute() {
  const [isOpen, setIsOpen] = useState(false);
  const { subscribeState, totalPrice, deleteSubscribe } = SubscribeService();

  return (
    <>
      <Navbar />
      <HomeMessage totalPrice={totalPrice} />
      <Home subscribeState={subscribeState} deleteSubscribe={deleteSubscribe} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-blue-500 hover:text-blue-300 cursor-pointer fixed bottom-7 right-7 md:h-20 md:w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setIsOpen(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <SubscribeCreate isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
}

export default HomeRoute;
