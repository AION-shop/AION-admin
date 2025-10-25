import { LogOut } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router'

const ChatSidebar = ({ users }) => {
    const theme = 'light'
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ABROR

    const logOutHandler = () => {
        navigate('/')
    }
    return (
        <div className='flex flex-col h-full flex-1 min-h-screen'>
            <div>
                <div className="p-5 border-b border-base-300 bg-base-100/90 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md ${"bg-primary"
                                }`}
                        >
                            <img
                                src="/Logo.png"
                                alt="Logo"
                                className="w-10 h-10 object-contain"
                            />
                        </div>

                        {true && (
                            <div>
                                <h2
                                    className={`text-xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-primary"
                                        }`}
                                >
                                    E-shop
                                </h2>
                                <p
                                    className={`text-xs font-medium transition-colors ${theme === "dark" ? "text-gray-400" : "text-base-content/60"
                                        }`}
                                >
                                    Support Chat
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                {
                    users.length > 0 ? (
                        users.map(user => (
                            <div>
                                user
                            </div>
                        ))
                    ) : (
                        <p>Users not found</p>
                    )
                }
            </div>
            <div className=''>
                <button className='btn btn-error w-full' onClick={() => logOutHandler()}>
                    <span>Выйти из чата</span>
                    <LogOut />
                </button>
            </div>
        </div>
    )
}

export default ChatSidebar