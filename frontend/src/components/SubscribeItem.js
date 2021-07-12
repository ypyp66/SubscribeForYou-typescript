import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
        className="cursor:pointer border rounded-xl bg-gray-100 p-3 mb-3 hover:border-blue-300 w-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => {
          console.log('click');
          openModal();
        }}
      >
        <div className="w-3/6 m-0">
          <div>{name}</div>
          <div className="text-xs">
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
