import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import errorImage from '../assets/Images/error.png'
import Footer from '../components/Footer'

function NotFound() {

    useEffect(() => {
        document.title = '404 - Not Found | Learning Management System'
    }, [])

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300">
            <div className="flex flex-col items-center justify-center space-y-4">
                <img src={errorImage} alt="Error" className='opacity-75 h-[40vh] transition-opacity duration-300 hover:opacity-100' />
                <h1 className="text-4xl font-bold">Oops! Page not found.</h1>
                <p className="text-xl">We can't seem to find the page you're looking for.</p>
                <Link to={'/'} className='mt-5'>
                    <button className='rounded-md bg-indigo-500 px-6 py-3 text-lg font-medium hover:bg-indigo-600 transition duration-300 ease-out shadow-md'>Return Home</button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound
