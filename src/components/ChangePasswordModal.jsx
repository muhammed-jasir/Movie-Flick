import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../store/authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ showModal, onClose, user }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const { updateUserPassword } = useAuthContext();

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

    const initialValues = {
        currentPassword: '',
        newPassword: ''
    };

    const updatePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('Required')
            .min(6, "Password must be at least 6 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one digit"),
        newPassword: Yup.string()
            .required('Required')
            .min(6, "Password must be at least 6 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one digit"),
    });

    const onSubmit = async (values) => {
        try {
            await updateUserPassword(values.currentPassword, values.newPassword);
            toast.success("Password updated successfully!");
            onClose();
        } catch (error) {
            toast.error(`Password update failed: ${error.message}`);
        }
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isSubmitting, isValid } = useFormik({
        initialValues,
        validationSchema: updatePasswordSchema,
        onSubmit,
    });

    return (
        <div className={`fixed z-50 inset-0 flex justify-center items-center transition-colors 
            ${showModal ? 'visible bg-[#0A1128]/70' : 'invisible'} 
        `}>
            <div className={`bg-slate-900 rounded-xl shadow p-6 transition-all max-w-sm w-full  
                ${showModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} 
            `}>
                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 p-1 rounded-lg text-slate-200 bg-slate-900 hover:bg-slate-100 hover:text-gray-950`}
                >
                    <IoClose />
                </button>

                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <h3 className='text-lg text-slate-50 text-center'>Change Password</h3>

                    <div className='flex flex-col gap-2'>
                        <div className='w-full relative'>
                            <label htmlFor='currentPassword' className='text-base text-white font-semibold block mb-1'>
                                Current Password
                            </label>

                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder='Current Password'
                                id='currentPassword'
                                className={`w-full rounded bg-[#14213d] pr-8 text-white border-0 outline-none font-semibold text-base px-3 py-1.5 ${errors.currentPassword && touched.currentPassword && 'outline outline-orange-700'}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.currentPassword}
                            />

                            <span
                                className='absolute top-9 right-2 text-lg cursor-pointer font-semibold'
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                            {errors.currentPassword && touched.currentPassword && (
                                <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.currentPassword}</p>
                            )}
                        </div>

                        <div className='w-full relative'>
                            <label htmlFor='newPassword' className='text-white font-semibold block mb-1'>
                                New Password
                            </label>

                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder='New Password'
                                id='newPassword'
                                className={`w-full rounded bg-[#14213d] pr-8 text-white border-0 outline-none font-semibold text-base px-3 py-1.5 ${errors.newPassword && touched.newPassword && 'outline outline-orange-700'}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                            />

                            <span
                                className='absolute top-9 right-2 text-lg cursor-pointer font-semibold'
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                            {errors.newPassword && touched.newPassword && (
                                <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.newPassword}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between mt-1'>
                        <button
                            type='submit'
                            className='bg-green-500 px-2 py-1 rounded cursor-pointer'
                            disabled={isSubmitting || !isValid}
                        >
                            {
                                isSubmitting ? (
                                    <span className='text-lg'>
                                        Loading...
                                    </span>
                                ) : (
                                    <span className='text-lg'>
                                        Update Password
                                    </span>
                                )
                            }
                        </button>

                        <button
                            type='button'
                            className='bg-slate-500 px-2 py-1 rounded cursor-pointer'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ChangePasswordModal