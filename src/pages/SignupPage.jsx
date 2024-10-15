import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../store/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import Spinner from '../components/Spinner';

const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
};

const signupSchema = Yup.object().shape({
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
    password: Yup.string()
        .required('Required')
        .min(6, "Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one digit"),
    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), ''], 'Password must match'),
});

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { signup } = useAuthContext();

    const onSubmit = async (values) => {
        try {
            await signup(values.name, values.email, values.password, values.phone);
            toast.success("Signup successful!");
            navigate('/login');
        } catch (error) {
            toast.error(`Signup failed: ${error.message}`);
            console.error(`Signup failed: ${error.message}`);
        }
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isSubmitting, isValid } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit,
    });

    return (
        <section className='min-h-screen pt-20 flex justify-center'>
            <form
                className='flex flex-col items-center w-full gap-5 max-w-lg bg-slate-900 px-3 md:px-5 py-10 my-10 rounded-md'
                onSubmit={handleSubmit}
            >
                <h1 className='text-3xl font-bold'>
                    Sign Up
                </h1>

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
                        value={values.name}
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
                        value={values.email}
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
                        value={values.phone}
                    />

                    {errors.phone && touched.phone && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.phone}</p>
                    )}
                </div>


                <div className='w-full relative'>
                    <label htmlFor='password' className='text-white font-semibold block mb-1'>
                        Password
                    </label>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        id='password'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.password && touched.password && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />

                    <span
                        className='absolute top-11 right-3 text-lg cursor-pointer font-semibold'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    {errors.password && touched.password && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.password}</p>
                    )}
                </div>


                <div className='w-full relative'>
                    <label htmlFor='confirmPassword' className='text-white font-semibold block mb-1'>
                        Confirm Password
                    </label>

                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm your password'
                        id='confirmPassword'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.confirmPassword && touched.confirmPassword && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                    />

                    <span
                        className='absolute top-11 right-3 text-lg cursor-pointer font-semibold'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    {errors.confirmPassword && touched.confirmPassword && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.confirmPassword}</p>
                    )}
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <button
                        type='submit'
                        className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded cursor-pointer'
                        disabled={isSubmitting || !isValid}
                    >
                        {
                            isSubmitting ? (
                                <div className='flex items-center justify-center gap-3'>
                                    <Spinner borderColor={'border-white'} />
                                    <span className='text-lg'>
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                <span className='text-lg'>
                                    Sign Up
                                </span>
                            )
                        }
                    </button>
                </div>

                <div className='w-full flex items-center gap-1.5 text-[#b3b3b3] font-medium'>
                    Already have an Account?
                    <Link to='/login'>
                        <span className='text-[#fff] font-semibold hover:underline hover:underline-offset-2 cursor-pointer'>
                            Login
                        </span>
                    </Link>
                </div>

                <div className='w-full'>
                    <span className='flex justify-center text-lg'>or</span>

                    <OAuth />
                </div>
            </form>
        </section>
    )
}

export default SignupPage