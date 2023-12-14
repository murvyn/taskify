'use client'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

interface Props{
    toggleCard: () => void
}

const NewTaskCard = ({ toggleCard }: Props) => {
    return (
        <>
            <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50"></div>
            <div className="fixed z-50 h-full w-full justify-center items-center top-0 left-0 ">
                <div className="h-full w-full flex justify-center items-center">
                    <div className='card w-[30rem] h-[30rem] flex justify-center items-center '>
                        <div className='card-body rounded-xl shadow-2xl w-full bg-base-300  '>
                            <h1 className='card-title'>Create a Task</h1>
                            <form className=''>
                                <div className="w-full form-control">
                                    <label htmlFor='title' className='label-text flex flex-col mt-4'>Title
                                        <input name='title' placeholder='Task title...' type='text' className='mt-3 input input-bordered w-full' />
                                    </label>
                                </div>
                                <div className="w-full form-control">
                                    <label htmlFor='description' className=' label-text flex flex-col mt-4'>Description
                                    </label>
                                    <textarea name='description' placeholder='eg. Watch new movie' rows={4} className='mt-3 textarea textarea-bordered w-full' />
                                </div>
                                <div className="w-full form-control">
                                    <label htmlFor='date' className='label-text flex flex-col mt-4'>Date
                                        <input name='date' type='date' className='mt-3 input input-bordered w-full' />
                                    </label>
                                </div>
                                <div className=" mt-5 form-control flex flex-row items-center space-x-2 ">
                                    <input title='important' type="checkbox" className="checkbox checkbox-secondary" />
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Important</span>
                                    </label>
                                </div>
                                <div className="justify-end mt-7 flex">
                                    <button type='submit' className='btn btn-primary'>
                                        <FaPlus />
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewTaskCard