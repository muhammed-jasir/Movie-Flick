import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../store/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialValues = {
    email: '',
};

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const { resetPassword } = useAuthContext();

    const onSubmit = async (values) => {
        try {
            await resetPassword(values.email);
            toast.success("Password reset email sent successfully!");
            toast.success("Please check your email");
            navigate('/login');
        } catch (error) {
            toast.error(`Reset failed: ${error.message}`);
        }
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isSubmitting, isValid } = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit,
    });

    return (
        <div className='min-h-screeen pt-20 flex justify-center'>
            <form
                className='flex flex-col items-center w-full gap-5 max-w-lg bg-slate-900 px-3 md:px-5 py-10 my-10 rounded-md'
                onSubmit={handleSubmit}
            >
                <h1 className='text-3xl font-bold'>
                    Reset Password
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

                <div className='w-full flex flex-col gap-2'>
                    <button
                        type='submit'
                        className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded cursor-pointer'
                        disabled={isSubmitting || !isValid}
                    >
                        <span className='text-lg'>
                            Reset Password
                        </span>
                    </button>
                </div>

                <div className='w-full flex items-center gap-1.5 text-[#b3b3b3] font-medium justify-center'>
                    <Link to='/login'>
                        <span className='text-[#fff] font-semibold hover:underline hover:underline-offset-2 cursor-pointer text-xl'>
                            Login
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword