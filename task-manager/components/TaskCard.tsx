'use client'
import { useState } from "react"
import { FaPlus, FaEdit } from "react-icons/fa"
import { IoTrashBin } from "react-icons/io5"
import NewTaskCard from "./NewTaskCard"

const tasks = [
    { id: 1, title: "Hello World", description: 'hello there now...', date: '03/11/2023', isCompleted: false },
    { id: 2, title: "Hello World", description: 'hello there now...', date: '03/11/2023', isCompleted: false },
    { id: 3, title: "Hello World", description: 'hello there now...', date: '03/11/2023', isCompleted: false },
    { id: 4, title: "Hello World", description: 'hello there now...', date: '03/11/2023', isCompleted: false },
]

const TaskCard = () => {
    const [showCard, setShowCard] = useState(false)

    const toggleCard = () => {
        setShowCard(!showCard)
    }
    return (
        <>
            <div className='card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden hover:overflow-y-scroll'>
                <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                    {
                        tasks.map(task =>
                            <div key={task.id} className='bg-base-100 card border w-full h-[18rem] border-stone-700  '>
                                <div className='card-body justify-between'>
                                    <div className="">
                                        <h2 className='card-title'>{task.title}</h2>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span>{task.date}</span>
                                        <div className='flex justify-between items-center '>
                                            <button onClick={() => task.isCompleted = true} className={`btn btn-sm ${task.isCompleted ? 'btn-success' : 'btn-error'}  rounded-full`}>{task.isCompleted ? 'Complete' : 'Incomplete'}</button>
                                            <div className='justify-between flex items-center text-xl space-x-1'>
                                                <FaEdit />
                                                <IoTrashBin />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div onClick={toggleCard} className='bg-base-100 card border w-full  h-[18rem] border-stone-700 flex justify-center items-center cursor-pointer hover:bg-base-300 '>
                        <FaPlus />
                        <span>Add a new task</span>
                    </div>
                </div>
            </div>
            {showCard && (
                <NewTaskCard toggleCard={toggleCard} />
            )}
        </>

    )
}

export default TaskCard