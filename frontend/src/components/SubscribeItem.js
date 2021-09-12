import React, { useCallback, useState } from 'react';
import SubscribePopup from './SubscribePopup';

function SubscribeItem({ data, deleteSubscribe }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div
        className="cursor:pointer shadow-md rounded-xl bg-white py-5 px-6 mb-3 hover:shadow-lg w-full"
        onClick={() => {
          openModal();
        }}
      >
        <div className="w-3/6 m-0">
          <div>{data.i_name}</div>
          <div className="text-xs mt-1">
            매달 {data.purchase_day}일, {data.price}원
          </div>
        </div>
      </div>
      <SubscribePopup
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        deleteSubscribe={deleteSubscribe}
        data={data}
      />
    </>
  );
}

export default React.memo(SubscribeItem);
