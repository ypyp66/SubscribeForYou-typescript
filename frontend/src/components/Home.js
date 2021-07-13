import { useState } from 'react';
import AddSubscribe from './AddSubscribe';
import SubscribeItem from './SubscribeItem';

function Home({ post }) {
  const data = [
    {
      id: 1,
      i_name: '유튜브 프리미엄',
      price: 1000,
      purchase_day: 5,
    },
    {
      id: 2,
      i_name: '유튜브 프리미엄',
      price: 1000,
      purchase_day: 5,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('pk');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      {data ? (
        data.map((d) => (
          <SubscribeItem
            key={d.id}
            id={d.id}
            name={d.i_name}
            price={d.price}
            purchaseDay={d.purchase_day}
          />
        ))
      ) : (
        <div className="rounded-xl shadow-md bg-white py-5 px-6 mb-3 w-full hover:shadow-lg">
          구독이 없어요😂
        </div>
      )}
      {!post && <div>로딩중</div>}
      <div className="flex justify-end z-30 -mt-11 h-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-blue-500 hover:text-blue-300 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={openModal}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex justify-end -mt-8 ">
        <AddSubscribe isOpen={isOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default Home;
