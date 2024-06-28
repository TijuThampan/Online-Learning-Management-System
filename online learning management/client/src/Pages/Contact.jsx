import { useState } from 'react'
import { toast } from 'react-toastify'

import option2 from '../assets/Json/option2.json'
import Particle from '../components/Particle'
import axiosInstance from '../helpers/AxiosInstance';
import HomeLayout from '../layouts/HomeLayout'

function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target
        setUserInput({ ...userInput, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let hasError = false;

        if (!userInput.name || !userInput.email || !userInput.message) {
            toast.error("Please fill out all fields");
            hasError = true;
        } else if (!userInput.email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            toast.error('Invalid email format');
            hasError = true;
        }

        if (!hasError) {
            toast.loading("Sending message, please wait...", {
                position: 'top-center'
            })
            try {
                const response = await axiosInstance.post('/contactus', userInput);
                toast.dismiss();
                if (response.data?.success) {
                    toast.success("Message sent successfully!")
                    setUserInput({
                        name: "",
                        email: "",
                        message: ""
                    })
                }
            } catch (error) {
                toast.dismiss();
                toast.error("Failed to send message")
                setUserInput({ name: "", email: "", message: "" })
            }
        }
    }

    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className='flex flex-col gap-6 justify-center items-center h-screen'>
                <form onSubmit={handleSubmit} className='rounded-lg border shadow-lg p-8 bg-gray-100 text-gray-900 lg:w-[450px] w-[90%] md:w-1/2'>
                    <h1 className='text-4xl font-bold text-center text-blue-600 mb-4'>Get in Touch</h1>
                    <p className='text-gray-500'>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
                    <hr className='my-4 border-gray-300' />
                    <div className='space-y-4'>
                        <div className='space-y-1'>
                            <label htmlFor="name" className='block text-lg font-medium text-gray-700'>Your Name</label>
                            <input type="text" placeholder="Enter your name" name='name' id='name' className="input input-bordered w-full" value={userInput.name} onChange={handleUserInput} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="email" className='block text-lg font-medium text-gray-700'>Email Address</label>
                            <input type="email" placeholder="Enter your email" name='email' id='email' className="input input-bordered w-full" value={userInput.email} onChange={handleUserInput} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="message" className='block text-lg font-medium text-gray-700'>Message</label>
                            <textarea name='message' id='message' className="textarea textarea-bordered w-full" placeholder="Type your message here" value={userInput.message} onChange={handleUserInput}></textarea>
                        </div>
                    </div>
                    <button className='btn btn-primary mt-6 w-full py-3 text-lg font-semibold'>Send Message</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact
