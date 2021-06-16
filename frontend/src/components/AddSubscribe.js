import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function AddSubscribe({ isOpen, closeModal }) {
  const data = [
    { name: "구독1" },
    { name: "구독2" },
    { name: "구독3" },
    { name: "구독4" },
    { name: "구독5" },
    { name: "직접 입력" },
  ];
  const [selected, setSelected] = useState(data[0]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-3/4 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title className='text-lg font-medium leading-6 text-gray-900 text-center'>
                  구독 추가
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div>
                    <div className='text-left'>구독 서비스 명</div>
                    <Listbox value={selected} onChange={setSelected}>
                      <Listbox.Button className='border w-full'>
                        {selected.name}
                      </Listbox.Button>
                      <Transition
                        enter='transition duration-100 ease-out'
                        enterFrom='transform scale-95 opacity-0'
                        enterTo='transform scale-100 opacity-100'
                        leave='transition duration-75 ease-out'
                        leaveFrom='transform scale-100 opacity-100'
                        leaveTo='transform scale-95 opacity-0'
                      >
                        <Listbox.Options className='border'>
                          {data.map((person, index) => (
                            <Listbox.Option
                              key={index}
                              value={person}
                              as={Fragment}
                            >
                              {({ active, selected }) => (
                                <li
                                  className={`${
                                    active
                                      ? "bg-blue-500 text-white"
                                      : "bg-white text-black"
                                  } 
                              `}
                                >
                                  {selected && <CheckIcon />}
                                  {person.name}
                                </li>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                    {selected === data[5] && (
                      <input className='border'>1000</input>
                    )}
                  </div>
                  <div>
                    <div>가격</div>
                    <input
                      type='number'
                      min={0}
                      className='border w-full text-center'
                    />
                  </div>
                  <div>
                    <div>결제일</div>
                    <input
                      type='number'
                      min={0}
                      className='border w-full text-center'
                    />
                  </div>
                  <button
                    type='button'
                    className='w-full p-1 mt-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    추가하기
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddSubscribe;
