import { useState } from 'react';
import SubscribeDetail from './SubscribeDetail';

function SubscribeItem({ name, price, purchaseDay, id }) {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="cursor:pointer shadow-md rounded-xl bg-white py-5 px-6 mb-3 hover:shadow-lg w-full"
        onClick={() => {
          openModal();
        }}
      >
        <div className="w-3/6 m-0">
          <div>{name}</div>
          <div className="text-xs mt-1">
            매달 {purchaseDay}일, {price}원
          </div>
        </div>
      </div>
      <SubscribeDetail
        isOpen={isOpen}
        closeModal={closeModal}
        name={name}
        price={price}
        purchaseDay={purchaseDay}
        id={id}
      />
    </>
  );
}

export default SubscribeItem;
