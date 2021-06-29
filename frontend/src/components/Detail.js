import React from 'react'

function Detail() {
    return (
        
             <div className='flex h-full items-center justify-center text-xs md:text-base'>
                <div className='flex h-full rounded-sm w-full items-center justify-center'>
                    <form
                    className='flex flex-col rounded-lg shadow-md bg-gray-100 h-1/2 justify-center px-10 lg:w-1/2'>
                        <label className='w-full'>
                            <div className="font-medium mb-1">현재 비밀번호</div>
                                <input 
                                    name="password"
                                    className="border w-full p-1"
                                
                                    required
                                />
                        </label>

                        <label className='w-full mt-4'>
                            <div className='flex flex-col mb-1 md:flex-row md:items-center'>
                                <span className="font-medium">새 비밀번호</span>
                                <span className="text-xs lg:text-sm text-gray-400 lg:ml-5">* 8~15자, 영어, 숫자, 특수문자 포함</span>
                            </div>
                                <input 
                                    name="password"
                                    className="border w-full p-1"
                                
                                    required
                                />
                        </label>

                        <label className='w-full mt-4'>
                            <div className='flex flex-col mb-1 md:flex-row md:items-center'>새 비밀번호 확인</div>
                                <input 
                                    name="password"
                                    className="border w-full p-1"
                                    
                                    required
                                />
                        </label>

                        <button
                        type="submit"
                        className="rounded-md bg-blue-700 text-white mt-5 p-1"
                        >
                        비밀번호 변경
                        </button>
                    </form>
                </div>
            </div>
      
    )
}

export default Detail;

