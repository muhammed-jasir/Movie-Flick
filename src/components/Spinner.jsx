import React from 'react';

const Spinner = ({borderColor}) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full h-10 w-10 border-t-4 border-r-4 border-b-0 border-l-0 border-solid ${borderColor}`}></div>
        </div>
    );
};

export default Spinner;