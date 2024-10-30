import React, { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useAuthContext } from '../store/authContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const DeleteModal = ({ showModal, onClose, user }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { deleteUserProfile } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const handleDeleteClick = async () => {
        if (!password.trim() && user.providerData[0].providerId === 'password') {
            return toast.error('Please enter your password');
        }

        setLoading(true);
        try {
            await deleteUserProfile(password);
            toast.success('User deleted successfully!');
            navigate('/login');
            onClose();
        } catch (error) {
            toast.error(`Error deleting: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`fixed z-50 inset-0 flex justify-center items-center transition-colors 
            ${showModal ? 'visible bg-[#0A1128]/70' : 'invisible'} 
        `}>
            <div className={`bg-slate-900 rounded-xl shadow p-6 transition-all max-w-sm w-full  
                ${showModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} 
            `}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 p-1 rounded-lg text-slate-200 bg-slate-900 hover:bg-slate-100 hover:text-gray-950`}
                >
                    <IoClose />
                </button>

                <div className='flex gap-2.5 flex-col text-center'>
                    <FaTrashAlt
                        size={56}
                        className='text-red-500 mx-auto'
                    />

                    <div className='flex flex-col gap-2'>
                        <h3 className='text-lg text-slate-50'>Delete Confirmation</h3>
                        <p className='text-sm text-slate-200'>
                            Are you sure you want to delete this Account?
                        </p>

                        {
                            user.providerData[0].providerId === 'password' && (
                                <div className='relative'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder='Password'
                                        className='rounded bg-[#14213d] text-white w-full px-3 py-1.5 pr-8 outline-none'
                                    />

                                    <span
                                        className='absolute top-2 right-2 text-lg cursor-pointer font-semibold'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            )
                        }
                    </div>

                    <div className='flex justify-between mt-1'>
                        <button
                            className='bg-red-500 px-2 py-1 rounded cursor-pointer'
                            onClick={handleDeleteClick}
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <span className='text-lg'>
                                        Deleting...
                                    </span>
                                ) : (
                                    <span className='text-lg'>
                                        Yes, Delete it
                                    </span>
                                )
                            }
                        </button>

                        <button
                            className='bg-slate-500 px-2 py-1 rounded cursor-pointer'
                            onClick={onClose}
                        >
                            No, Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal