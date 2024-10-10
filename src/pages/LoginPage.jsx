import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../store/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

const initialValues = {
    email: '',
    password: '',
};

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required')
        .min(6, "Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one digit"),
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthContext();

    const onSubmit = async (values) => {
        try {
            await login(values.email, values.password);
            toast.success("Login successful!");
            navigate('/');
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
        }
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isSubmitting, isValid } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit,
    });

    return (
        <div className='min-h-screeen pt-20 flex justify-center'>
            <form
                className='flex flex-col items-center w-full gap-5 max-w-lg bg-slate-900 px-3 md:px-5 py-10 my-10 rounded-md'
                onSubmit={handleSubmit}
            >
                <h1 className='text-3xl font-bold'>
                    Login
                </h1>

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

                <div className='w-full relative'>
                    <label htmlFor='password' className='text-white font-semibold block mb-1'>
                        Password
                    </label>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        id='password'
                        className={`w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${errors.email && touched.email && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <Link to='/reset'>
                        <p className='text-sm text-[#b3b3b3] text-right hover:underline hover:underline-offset-2 mt-1 cursor-pointer'>
                            Forgot your Password?
                        </p>
                    </Link>

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

                <div className='w-full flex flex-col gap-2'>
                    <button
                        type='submit'
                        className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded cursor-pointer'
                        disabled={isSubmitting || !isValid}
                    >
                        <span className='text-lg'>
                            Login
                        </span>
                    </button>
                </div>

                <div className='w-full flex items-center gap-1.5 text-[#b3b3b3] font-medium'>
                    Dont have an Account?
                    <Link to='/signup'>
                        <span className='text-[#fff] font-semibold hover:underline hover:underline-offset-2 cursor-pointer'>
                            Signup
                        </span>
                    </Link>
                </div>


            </form>
        </div>
    )
}

export default LoginPage