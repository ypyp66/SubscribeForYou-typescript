import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import * as valid from '../lib/validation';
import axios from 'axios';
import { getPost } from '../modules/subscribeSaga';
import * as api from '../utils/Api';
import { useDispatch } from 'react-redux';

const initialState = {
  title: '',
  price: '',
  day: '',
};

function SubscribeCreate({ isOpen, closeModal }) {
  const [currentData, setCurrentData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [searchList, setSearchList] = useState([]);
  const dispatch = useDispatch();

  const init = () => {
    setCurrentData(initialState);
    setMessage('');
  };

  const onSearchListClick = (e) => {
    const { value } = e.target;

    setCurrentData({ ...currentData, title: value });
    setSearchList([]);
  };

  const searchAPI = (value) => {
    axios
      .get(`subscribe/search?keyword=${value}`)
      .then((res) => setSearchList(res.data.results))
      .catch((e) => console.log(e));
  };

  const handleCreate = () => {
    //addSubscribe(currentData);
    api.addSubscribeData(currentData).then((status) => {
      if (status === 201) {
        dispatch(getPost());
        setCurrentData(initialState);
        closeModal();
      }
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (currentData.title === ' ') {
      setMessage('값을 입력해주세요');
      return;
    }

    if (!valid.subscribeTitleValidation(currentData.title).result) {
      setMessage(valid.subscribeTitleValidation(currentData.title).message);
      return;
    }

    handleCreate();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'subList':
        setCurrentData({ ...currentData, title: value });
        searchAPI(value);
        break;
      case 'price':
        setCurrentData({ ...currentData, price: parseInt(value) });
        break;
      case 'day':
        setCurrentData({ ...currentData, day: value });
        break;
      default:
        break;
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        static
        open={isOpen}
        onClose={() => {
          closeModal();
          init();
          setSearchList([]);
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
              <div className="bg-gray-50 inline-block w-3/4 max-w-sm p-11 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900 text-center mb-7"
                >
                  구독 추가하기
                </Dialog.Title>
                <div className="mt-2 flex flex-col justify-around w-full ">
                  <form onSubmit={submitData}>
                    <div className="flex flex-col w-full mb-2 relative">
                      <input
                        type="text"
                        placeholder="구독 서비스 명"
                        name="subList"
                        className="border p-1 text-center"
                        onChange={onChange}
                        value={currentData.title}
                        required
                      />
                      <div className="bg-white w-full absolute top-7 max-h-20 overflow-y-scroll">
                        {searchList.map((list) => (
                          <option
                            className="rounded-md w-full bg-indigo-50 mb-px p-1 hover:bg-indigo-100 "
                            onClick={onSearchListClick}
                            key={list.id}
                          >
                            {list.s_name}
                          </option>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        name="price"
                        placeholder="결제금액"
                        className="border w-full p-1 text-center"
                        onChange={onChange}
                        min={0}
                        value={currentData.price}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="day"
                        min={1}
                        max={31}
                        placeholder="결제일(1~31)"
                        className="border w-full p-1 text-center"
                        onChange={onChange}
                        value={currentData.day}
                        required
                      />
                    </div>
                    {message && message}
                    <button
                      type="submit"
                      className="bg-indigo-700 text-white p-1.5 justify-center w-full rounded mt-5"
                    >
                      추가하기
                    </button>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </>
      </Dialog>
    </Transition>
  );
}

export default React.memo(SubscribeCreate);
