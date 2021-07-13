import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getPost } from '../modules/subscribes';
import axios from 'axios';
import { connect } from 'react-redux';

function SubscribeDetail({
  isOpen,
  closeModal,
  name,
  price,
  purchaseDay,
  id,
  getPost,
}) {
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

  const reset = () => {
    closeModal();
    setInitialState();
    setIsUpdate(false);
  };

  const setInitialState = () => {
    setSubPrice(initialState.price);
    setSubPurchaseDay(initialState.purchaseDay);
    setSubName(initialState.name);
  };

  function deleteData() {
    axios
      .delete(`subscribe/${id}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
      })
      .then(() => {
        getPost();
        reset();
      })
      .catch((e) => console.log(e));
  }

  function updateData() {
    axios({
      url: `subscribe/${id}`,
      method: 'patch',
      data: {
        i_name: subName,
        purchase_day: subPurchaseDay,
        price: subPrice,
      },
      headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
    })
      .then(() => {
        getPost();
        reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    updateData();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        onClose={() => {
          closeModal();
          setInitialState();
          setIsUpdate(false);
        }}
      >
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
              <div className="inline-block w-full max-w-md py-5 px-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form onSubmit={onSubmit}>
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {!isUpdate ? (
                        <span>{subName}</span>
                      ) : (
                        <input
                          type="text"
                          className="border-b-2"
                          name="name"
                          onChange={onChange}
                          value={subName}
                        />
                      )}
                    </Dialog.Title>
                    <svg
                      className="cursor-pointer h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => {
                        setIsUpdate(true);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <div>
                      결제일 :{' '}
                      {!isUpdate ? (
                        <span>{subPurchaseDay}</span>
                      ) : (
                        <input
                          type="number"
                          name="purchaseDay"
                          className="border-b-2"
                          onChange={onChange}
                          value={subPurchaseDay}
                        />
                      )}
                    </div>
                    <div>
                      금액 :{' '}
                      {!isUpdate ? (
                        <span>{subPrice}</span>
                      ) : (
                        <input
                          type="number"
                          name="price"
                          className="border-b-2"
                          onChange={onChange}
                          value={subPrice}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={updateData}
                    >
                      저장하기
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={deleteData}
                    >
                      삭제하기
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </>
      </Dialog>
    </Transition>
  );
}

export default connect(null, {
  getPost,
})(SubscribeDetail);
