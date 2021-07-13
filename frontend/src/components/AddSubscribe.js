import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import * as valid from '../lib/validation';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPost } from '../modules/subscribes';
import { useEffect } from 'react';

function AddSubscribe({ isOpen, closeModal, getPost }) {
  const initialState = {
    title: '',
    price: '',
    day: '',
  };

  const [currentData, setCurrentData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    console.log(searchList);
  }, [searchList]);

  const init = () => {
    setCurrentData(initialState);
    setMessage('');
  };

  const onSearchListClick = (e) => {
    //setCurrentData({...currentData, title})
    const { value } = e.target;
    console.log(e.target.value);
    setCurrentData({ ...currentData, title: value });
    setSearchList([]);
  };

  const searchAPI = (value) => {
    axios
      .get(`subscribe/search?keyword=${value}`)
      .then((res) => setSearchList(res.data.results))
      .catch((e) => console.log(e));
  };

  const sendSubscribeData = () => {
    axios({
      url: 'subscribe/',
      method: 'post',
      data: {
        i_name: currentData.title,
        price: currentData.price,
        purchase_day: currentData.day,
        user_pk: sessionStorage.getItem('pk'),
      },
      headers: { Authorization: `Token ${sessionStorage.getItem('token')}` },
    })
      .then((res) => {
        console.log(res);
        const statusCode = res.status;

        if (statusCode === 201) {
          console.log(res.data);
          setMessage('');
          getPost();
          init();
          closeModal();
        }
      })
      .catch((e) => console.log(e));
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

    sendSubscribeData();
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
        className="fixed inset-0 z-10 overflow-y-auto "
        static
        open={isOpen}
        onClose={() => {
          closeModal();
          init();
          setSearchList([]);
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
            <div className="bg-gray-50 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
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
                      className="border"
                      onChange={onChange}
                      value={currentData.title}
                      required
                    />
                    <div className="bg-white w-full absolute top-7 max-h-20 overflow-y-scroll">
                      {searchList.map((list) => (
                        <option
                          className="rounded-md w-full bg-purple-50 mb-px hover:bg-purple-200 "
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
                      className="border w-full"
                      onChange={onChange}
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
                      className="border w-full"
                      onChange={onChange}
                      value={currentData.day}
                      required
                    />
                  </div>
                  {message && message}
                  <button
                    type="submit"
                    className="bg-indigo-700 text-white p-1 justify-center w-full rounded mt-4"
                  >
                    추가하기
                  </button>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default connect(null, {
  getPost,
})(AddSubscribe);
