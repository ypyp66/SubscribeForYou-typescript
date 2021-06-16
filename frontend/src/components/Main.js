import { useState } from "react";
import AddSubscribe from "./AddSubscribe";
import SubscribeItem from "./SubscribeItem";

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dummyData = [
    {
      id: 1,
      name: "유튜브 프리미엄",
      price: 10000,
      purchaseDay: 5,
    },
    {
      id: 2,
      name: "왓챠",
      price: 5000,
      purchaseDay: 7,
    },
    {
      id: 3,
      name: "카카오톡 이모티콘",
      price: 3900,
      purchaseDay: 12,
    },
    {
      id: 4,
      name: "구독아이템4",
      price: 7000,
      purchaseDay: 10,
    },
    {
      id: 5,
      name: "구독아이템5",
      price: 7000,
      purchaseDay: 10,
    },
  ];
  return (
    <div>
      {dummyData.map((data) => (
        <SubscribeItem
          key={data.id}
          name={data.name}
          price={data.price}
          purchaseDay={data.purchaseDay}
        />
      ))}
      <div className='flex justify-end z-30 -mt-11'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-14 w-14 text-blue-500 hover:text-blue-300 cursor-pointer'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          onClick={openModal}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <AddSubscribe isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Main;
