import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../store/authContext'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    const { user, userData } = useAuthContext();

    const initialValues = {
        name: user?.displayName,
        email: user?.email,
        phone: user?.phoneNumber || userData.phone,
    };

    const profileSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        phone: Yup.string()
            .required('Required')
            .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    });

    const onSubmit = async (values) => {

    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: profileSchema,
        onSubmit,
    });

    return (
        <section className='pt-24 min-h-[700px] md:min-h-screen flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Profile</h1>
            <form className='flex flex-col gap-5 max-w-md w-full py-7 bg-slate-900 px-4 my-6 rounded-md' onSubmit={handleSubmit}>
                <div className='w-full flex justify-center'>
                    {user.photoURL
                        ? (
                            <img
                                src={user.photoURL}
                                alt='profile pic'
                                className={`rounded-full border-4 border-slate-300 object-cover h-32 w-32`}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <FaUserCircle className='h-32 w-32' />  
                        )
                    }
                </div>
                <div className='w-full'>
                    <label htmlFor='name' className='text-white font-semibold block mb-1'>
                        Name
                    </label>

                    <input
                        type='text'
                        id='name'
                        placeholder='Name'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.name && touched.name && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user.displayName}
                    />

                    {errors.name && touched.name && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.name}</p>
                    )}
                </div>

                <div className='w-full'>
                    <label htmlFor='email' className='text-white font-semibold block mb-1'>
                        Email
                    </label>

                    <input
                        type='text'
                        placeholder='Email'
                        id='email'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.email && touched.email && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user.email}
                    />

                    {errors.email && touched.email && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.email}</p>
                    )}
                </div>


                <div className='w-full'>
                    <label htmlFor='phone' className='text-white font-semibold block mb-1'>
                        Phone
                    </label>

                    <input
                        type='tel'
                        placeholder='Phone'
                        id='phone'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.phone && touched.phone && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user.phoneNumber || userData.phone}
                    />

                    {errors.phone && touched.phone && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.phone}</p>
                    )}
                </div>
            </form>
        </section>
    )
}

export default Profile