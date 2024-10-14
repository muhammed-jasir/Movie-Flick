import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuthContext } from '../store/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const OAuth = () => {
    const [loading, setLoading] = useState(false);

    const { googleSignin } = useAuthContext();
    const navigate = useNavigate();

    const handleGoogleSignin = async () => {
        try {
            setLoading(true);
            await googleSignin();
            toast.success("Signin successful!");
            navigate('/');
        } catch (error) {
            toast.error(`Signin failed: ${error.message}`);
            console.error(`Signin failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center py-4'>
            <button
                type='button'
                onClick={handleGoogleSignin}
                disabled={loading}
                className='w-full max-w-xs bg-[#14213d] hover:bg-[#1d2c46] text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out'
            >
                <div className='flex items-center justify-center gap-3'>
                    {loading ? (
                        <>
                            <Spinner borderColor={'border-white'} />
                            <span className='text-lg'>
                                Signing in...
                            </span>
                        </>
                    ) : (
                        <>
                            <FcGoogle className='w-6 h-6' />
                            <span className='font-semibold'>Continue with Google</span>
                        </>
                    )}
                </div>
            </button>
        </div>
    );
};

export default OAuth;

