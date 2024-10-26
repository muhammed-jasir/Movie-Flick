import React, { useEffect, useRef, useState } from 'react'
import { FaUser, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../store/authContext';
import { toast } from 'react-toastify';
import { BsBookmarkFill, BsFillBookmarPlusFill } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Dropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    let menuRef = useRef();

    const { signout } = useAuthContext();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signout();
            toast.success('Signout success!');
            navigate('/login');
        } catch (error) {
            toast.error('Signout failed!');
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [menuRef]);

    return (
        <div className='relative' ref={menuRef}>
            <FaUserCircle className='cursor-pointer text-3xl' onClick={() => setOpen(!open)} />

            {open && (
                <div className='absolute top-14 right-5 bg-[#14213d] rounded-md px-2.5 py-5 w-[200px]'>
                    <h4 className='text-base truncate'>
                        {user.displayName}
                    </h4>

                    <p className='text-sm truncate'>
                        {user.email}
                    </p>

                    <hr className='my-2.5' />

                    <ul className='flex flex-col gap-2'>
                        <DropdownItem icon={<FaUser />} label={'Profile'} href={'/profile'} />
                        <DropdownItem icon={<BsBookmarkFill />} label={'Watchlist'} href={'/watchlist'} />
                        <DropdownItem icon={<RiLogoutBoxRLine />} label={'Signout'} onClick={handleSignout} />
                    </ul>
                </div>
            )}
        </div>
    )
}

const DropdownItem = ({ icon, label, href, onClick }) => {
    return (
        <Link to={href} onClick={onClick}>
            <li className='flex items-center gap-3 text-xl hover:bg-slate-900 px-2 py-1 rounded'>
                {icon}

                <span className='text-lg'>
                    {label}
                </span>
            </li>
        </Link>
    )
}

export default Dropdown