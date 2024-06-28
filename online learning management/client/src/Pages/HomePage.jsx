import { Link } from "react-router-dom"

import HomeImage from "../assets/Images/homeImage.png"
import option1 from '../assets/Json/option1.json'
import Particle from "../components/Particle"
import HomeLayout from "../layouts/HomeLayout"

const HomePage = () => {
    return (
        <HomeLayout>
            <Particle option={option1} />
            <div className="h-screen flex lg:px-12 px-6 pb-10 lg:pb-0 flex-col lg:flex-row justify-around items-center bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300">
                <div className="lg:px-6 md:px-6 space-y-10 lg:w-1/2">
                    <h1 className="lg:text-6xl text-3xl font-bold leading-tight">Discover the best <span className="text-indigo-300">Online Learning</span> experience</h1>
                    <p className="text-gray-400 lg:text-xl">Access a diverse collection of courses featuring expert instructors at an accessible price point.</p>
                    <div className="flex gap-6 lg:flex-row md:flex-row items-center">
                        <Link to={'/courses'} className="w-fit">
                            <button className="rounded-lg lg:w-52 md:w-52 w-40 py-3 lg:text-lg md:text-lg font-semibold text-gray-900 bg-indigo-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300 ease-in-out">Explore Courses</button>
                        </Link>
                        <Link to={'/contact'} className="w-fit">
                            <button className="rounded-lg lg:w-52 md:w-52 w-40 py-3 lg:text-lg md:text-lg font-semibold bg-gray-700 hover:bg-indigo-500 border border-indigo-300 text-gray-300 hover:text-white transition-colors duration-300 ease-in-out">Get in Touch</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={HomeImage} alt="Educational Image" className="w-full h-full object-cover rounded-lg shadow-lg" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage
