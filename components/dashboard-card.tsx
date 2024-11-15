import React from 'react'

interface DashBoardCardProps {
    title: string, 
    value: number,
    description: string
}

function DashboardCard({title, value, description}: DashBoardCardProps){

     
    

    return (
        <div className='p-5 border yellow-300 border-solid bg-gray-100 rounded-sm'>
            <h1 className='text-sm font-bold '>{title}</h1>
            <p className='text-4xl font-bold mt-5 text-center'>{value}</p>
            <p className='text-sm  mt-5'>{description}</p>
        </div>
    )
}

export default DashboardCard