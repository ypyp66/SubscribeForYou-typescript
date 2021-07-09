import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import * as valid from '../lib/validation';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPost } from '../modules/subscribes';

function AddSubscribe({ isOpen, closeModal, post, loadingPost, getPost }) {
  const data = [
    { title: '유튜브 프리미엄' },
    { title: '왓챠' },
    { title: '카카오톡 이모티콘' },
    { title: '구독4' },
    { title: '구독5' },
  ];

  const initialState = {
    title: '',
    price: '',
    day: '',
  };

  const [isCustom, setIsCustom] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [currentData, setCurrentData] = useState(initialState);
  const [message, setMessage] = useState('');
  const cancelButtonRef = useRef();

  const init = () => {
    setCurrentData(initialState);
    setIsCustom(false);
    setMessage('');
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
          closeModal();
        }
      })
      .catch((e) => console.log(e));
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (currentData.title === '') {
      setMessage('유효한 값을 입력해주세요');
      return;
    }

    if (!valid.subscribeTitleValidation(currentData.title).result) {
      setMessage(valid.subscribeTitleValidation(currentData.title).message);
      return;
    }

    sendSubscribeData();
  };

  const onCustomInputChange = (e) => {
    const { value } = e.target;
    setCustomInput(value);
    setCurrentData({ ...currentData, title: value });
  };
  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'subList':
        if (value === 'custom') {
          setCustomInput('');
          setIsCustom(true);
        } else {
          setIsCustom(false);
          setCurrentData({ ...currentData, title: value });
        }
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
        initialFocus={cancelButtonRef}
        static
        open={isOpen}
        onClose={() => {
          closeModal();
          init();
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
              <div className="mt-2 flex flex-col justify-around w-full">
                <form onSubmit={submitData}>
                  <div className="flex flex-col w-full mb-2">
                    <select
                      name="subList"
                      onChange={onChange}
                      className="w-full"
                    >
                      <option value="">구독서비스명</option>
                      {data &&
                        data.map((data, index) => (
                          <option
                            key={index}
                            value={data.title}
                            className="max-w-md"
                          >
                            {data.title}
                          </option>
                        ))}
                      <option value="custom">직접입력</option>
                    </select>
                    {isCustom && (
                      <input
                        type="text"
                        placeholder="이름"
                        name="subList"
                        className="border"
                        onChange={onCustomInputChange}
                        value={customInput}
                        required
                      />
                    )}
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      name="price"
                      placeholder="결제금액"
                      className="border w-full"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="day"
                      min={1}
                      max={31}
                      placeholder="결제일"
                      className="border w-full"
                      onChange={onChange}
                      required
                    />
                  </div>
                  {message && message}
                  <button
                    type="submit"
                    className="bg-blue-700 text-white p-1 justify-center w-full rounded mt-4"
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

export default connect(
  ({ subscribes }) => ({
    post: subscribes.post,
    loadingPost: subscribes.loading,
  }),
  {
    getPost,
  },
)(AddSubscribe);
