import aboutMainImage from '../assets/Images/MainImage.png'
import option2 from '../assets/Json/option2.json'
import Carousel from '../components/Carousel'
import Particle from '../components/Particle'
import HomeLayout from '../layouts/HomeLayout'

function About() {
    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className='flex flex-col lg:p-24 p-10'>
                <section className='flex lg:flex-row flex-col items-center justify-between w-full'>
                    <div className='flex flex-col gap-20 lg:w-[65%] w-full'>
                        <h1 className='lg:text-5xl text-4xl font-bold text-indigo-600 text-center lg:text-left'>Accessible and Premium Education</h1>
                        <p className='lg:text-2xl text-xl text-gray-600 font-medium text-center lg:text-left'> We aim to deliver accessible and high-quality education globally.
                            Our platform enables passionate educators and eager learners to exchange
                            their expertise, creativity, and insights, fostering mutual growth and contributing
                            to the advancement of society. </p>
                    </div>
                    <div className='lg:w-[35%] drop-shadow-xl'>
                        <img src={aboutMainImage} alt="educational collaboration" className='bg-transparent rounded-lg' />
                    </div>
                </section>
                <section className='py-8 w-full lg:w-[90%] lg:mx-auto'>
                    <Carousel />
                </section>
            </div>
        </HomeLayout>
    )
}

export default About
