import React from 'react'

const Footer = () => {
    return (
        <footer className='text-white bg-slate-800 flex flex-col items-center justify-center fixed bottom-0 z-10 w-full py-1'>
            <div className='logo font-bold text-xl'>
                <span className='text-green-700'>&lt; </span>
                <span>Pass</span>
                <span className='text-green-700'>OP /&gt;</span>
            </div>
            <div className='text-center'>Created by Zulqarnain Sikander | CodeWithHarry Project</div>
        </footer>
    )
}

export default Footer
