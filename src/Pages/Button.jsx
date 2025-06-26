import React from 'react';
import { Link } from 'react-router';

const Button = ({ text, path }) => {
    const validPath = path ?? "#"; // fallback to '#' if path is undefined

    return (
        <div>
            <Link to={validPath}>
                <p className="btn bg-primary md:-pl-5 mt-2 text-white px-6 py-6 text-lg rounded-full shadow hover:scale-105 transition w-fit">
                    {text}
                </p>
            </Link>
        </div>
    );
};

export default Button;
