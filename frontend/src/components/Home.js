import { useState } from 'react';
import AddSubscribe from './AddSubscribe';
import SubscribeItem from './SubscribeItem';

function Home({ post }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      {post && post.length > 0 ? (
        post.map((data) => (
          <SubscribeItem
            key={data.id}
            id={data.id}
            name={data.i_name}
            price={data.price}
            purchaseDay={data.purchase_day}
          />
        ))
      ) : (
        <div className="border rounded-xl bg-gray-100 p-3 mb-3 hover:border-blue-300 w-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          구독이 없어요😂
        </div>
      )}
      {!post && <div>로딩중</div>}
      <div className="flex justify-end z-30 -mt-11">
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
      <div className="flex justify-end -mt-8">
        <AddSubscribe isOpen={isOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default Home;
