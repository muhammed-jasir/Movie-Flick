import React, { useState, useRef } from 'react'
import { useAuthContext } from '../store/authContext'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { ImPencil } from 'react-icons/im';
import { toast } from 'react-toastify';
import DeleteModal from '../components/DeleteModal';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Profile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); 

    const imagePickerRef = useRef(null);

    const { user, userData, uploadImage, updateUserProfile } = useAuthContext();

    const initialValues = {
        name: user?.displayName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || userData?.phone || '',
    };

    const profileSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.string()
            .required('Required')
            .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    });

    const onSubmit = async (values) => {
        try {
            if (imageFile) {
                const imageURL = await uploadImage(imageFile);
                await updateUserProfile(values.name, values.phone, imageURL);
            } else {
                await updateUserProfile(values.name, values.phone);
            }

            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error(`Failed to update profile: ${error.message}`);
        }
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isSubmitting, isValid } = useFormik({
        initialValues,
        validationSchema: profileSchema,
        onSubmit,
    });

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size <= 2 * 1024 * 1024) {
                setImageFile(file);
                setImageFileUrl(URL.createObjectURL(file));
            } else {
                toast.error(`Please select an image file smaller than 2MB.`);
            }
        } else {
            toast.error('Please select a valid image file.');
        }
    };

    return (
        <section className='pt-24 min-h-[700px] md:min-h-screen flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Profile</h1>
            <form className='flex flex-col gap-5 max-w-md w-full py-6 bg-slate-900 px-4 mt-6 mb-3 rounded-md' onSubmit={handleSubmit}>
                <div className='w-full flex justify-center relative'>
                    {user.photoURL || imageFileUrl
                        ? (
                            <img
                                src={imageFileUrl || user.photoURL}
                                alt='profile pic'
                                className={`rounded-full border-4 border-slate-300 object-cover h-32 w-32`}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <FaUserCircle className='h-32 w-32' />
                        )
                    }

                    <div className='hidden'>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleChangeImage}
                            ref={imagePickerRef}
                        />
                    </div>

                    <div
                        className='absolute -bottom-1 right-[148px] bg-slate-700 rounded-full p-2.5 cursor-pointer'
                        onClick={() => {
                            imagePickerRef.current.click();
                            setIsEditing(true);
                        }}
                    >
                        <ImPencil />
                    </div>
                </div>

                <div className='w-full relative'>
                    <label htmlFor='name' className='text-white font-semibold block mb-1'>
                        Name
                    </label>

                    <input
                        type='text'
                        id='name'
                        placeholder='Name'
                        className={`read-only:bg-slate-800 w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${isEditing && errors.name && touched.name && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={!isEditing}
                        value={values.name}
                    />

                    {isEditing && errors.name && touched.name && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.name}</p>
                    )}

                    <div
                        className={`${isEditing ? 'hidden' : 'block'} absolute right-2 top-[35px] bg-slate-700 rounded-full p-2 cursor-pointer`}
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        <ImPencil />
                    </div>
                </div>

                <div className='w-full relative'>
                    <label htmlFor='email' className='text-white font-semibold block mb-1'>
                        Email
                    </label>

                    <input
                        type='text'
                        placeholder='Email'
                        id='email'
                        className={`read-only:bg-slate-800 w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={true}
                        value={values.email}
                    />

                    <div
                        className='hidden right-2 top-[35px] bg-slate-700 rounded-full p-2 cursor-pointer'
                        onClick={() => {
                        }}
                    >
                        <ImPencil />
                    </div>
                </div>

                <div className='w-full relative'>
                    <label htmlFor='phone' className='text-white font-semibold block mb-1'>
                        Phone
                    </label>

                    <input
                        type='tel'
                        placeholder='Phone'
                        id='phone'
                        className={`read-only:bg-slate-800 w-full h-12 rounded bg-[#14213d] text-white border-0 outline-none font-semibold text-base px-3 md:px-5 py-4 ${isEditing && errors.phone && touched.phone && 'outline outline-orange-700'}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={!isEditing}
                        value={values.phone}
                    />

                    {isEditing && errors.phone && touched.phone && (
                        <p className='text-orange-700 font-medium mt-1.5 text-sm'>{errors.phone}</p>
                    )}

                    <div
                        className={`${isEditing ? 'hidden' : 'block'} absolute right-2 top-[35px] bg-slate-700 rounded-full p-2 cursor-pointer`}
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        <ImPencil />
                    </div>
                </div>

                {
                    isEditing &&
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
                                            Saving...
                                        </span>
                                    </div>
                                ) : (
                                    <span className='text-lg'>
                                        Save Changes
                                    </span>
                                )
                            }
                        </button>
                    </div>
                }
            </form>

            <div className='flex justify-between items-center w-full max-w-md mb-6'>
                {
                    user.providerData[0].providerId === 'password' && (
                        <button
                            className='bg-red-600 hover:bg-green-700 text-white px-2 py-1 text-base font-semibold rounded cursor-pointer'
                            onClick={() => setShowChangePasswordModal(true)}
                        >
                            Change Password
                        </button>
                    )
                }

                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-base font-semibold rounded cursor-pointer'
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete Account
                </button>
            </div>

            <DeleteModal showModal={showDeleteModal} onClose={() => setShowDeleteModal(false)} user={user} />
            <ChangePasswordModal showModal={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} user={user} />
        </section>
    )
}

export default Profile