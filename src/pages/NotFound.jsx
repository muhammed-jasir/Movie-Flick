import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="pt-20 h-screen flex flex-col justify-center items-center bg-[#14213d] text-white">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white text-lg rounded-md"
            >
                Go Back to Home
            </Link>
        </section>
    );
};

export default NotFound