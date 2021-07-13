import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect } from 'react';
import axios from 'axios';

function SubscribeDetail({ isOpen, closeModal, name, price, purchaseDay, id }) {
  const initialState = {
    name,
    price,
    purchaseDay,
  };
  const [subPrice, setSubPrice] = useState(price);
  const [subName, setSubName] = useState(name);
  const [subPurchaseDay, setSubPurchaseDay] = useState(purchaseDay);
  const [isUpdate, setIsUpdate] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'price':
        setSubPrice(value);
        break;
      case 'purchaseDay':
        setSubPurchaseDay(value);
        break;
      case 'name':
        setSubName(value);
        break;
      default:
        break;
    }
  };

  const setInitialState = () => {
    setSubPrice(initialState.price);
    setSubPurchaseDay(initialState.purchaseDay);
    setSubName(initialState.name);
  };
  useEffect(() => {
    axios
      .get(`subscribe/${id}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);

  function deleteData() {
    axios
      .delete(`subscribe/${id}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          closeModal();
          setInitialState();
          setIsUpdate(false);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {!isUpdate ? (
                  <span>{subName}</span>
                ) : (
                  <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={subName}
                  />
                )}
              </Dialog.Title>
              <div className="mt-2">
                <div>
                  결제일 :{' '}
                  {!isUpdate ? (
                    <span>{subPurchaseDay}</span>
                  ) : (
                    <input
                      type="number"
                      name="purchaseDay"
                      onChange={onChange}
                      value={subPurchaseDay}
                    />
                  )}
                </div>
                <div>금액 : {subPrice}</div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setIsUpdate(true)}
                >
                  저장하기
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={deleteData}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SubscribeDetail;
