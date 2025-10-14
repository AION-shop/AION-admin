import React from 'react'
import ChatSidebar from '../components/layouts/ChatSidebar'

const SupportChat = () => {
    return (
        <div className='flex'>
            <div className={`min-w-72 bg-base-300 min-h-screen h-full`}>
                {/* SIDEBAR */}
                <ChatSidebar users={[1 , 2]} />
            </div>
            <div>
                {/* CHAT NAVBAR */}
            </div>
        </div>
    )
}

export default SupportChat