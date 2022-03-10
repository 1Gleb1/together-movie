import { BiMoviePlay } from 'react-icons/bi'
import { GiTreasureMap, GiHandcuffs, GiMusicalNotes, GiBattleTank, GiGhost, GiMushroomCloud, GiAllSeeingEye, GiBookmarklet, GiBloodyStash, GiDramaMasks, GiPlagueDoctorProfile, GiCharm, GiBackup, GiBalloons, GiFallingBlob, GiWesternHat } from 'react-icons/gi'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";

const Filter = ({ setActiveGenre, setPageEx}) => {

    const handleGeter = (value) => {
        setActiveGenre(value)
        setPageEx(1)
    }

    return (
        <div className=" text-sm m-auto w-full max-w-5xl">
            <Swiper
                slidesPerView = {7.5}
            >
                <SwiperSlide>
                    <button onClick={() => handleGeter(null)} className=' w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg'>
                        <BiMoviePlay className='text-6xl text-white' />
                        All
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(28)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiMushroomCloud className='text-6xl text-yellow-800' />
                        Action
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(12)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiTreasureMap className='text-6xl text-amber-700' />
                        Adventure
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(35)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiBalloons className='text-6xl text-yellow-500' />
                        Animation
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(80)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiHandcuffs className='text-6xl text-gray-700' />
                        Crime
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(99)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiPlagueDoctorProfile className='text-6xl text-lime-800' />
                        Documentary
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(18)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiDramaMasks className='text-6xl text-zinc-700' />
                        Drama
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(10751)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg'>
                        <GiBackup className='text-6xl text-rose-800' />
                        Family
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(36)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiBookmarklet className='text-6xl text-cyan-700' />
                        History
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(27)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiBloodyStash className='text-6xl text-red-800' />
                        Horror
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(10402)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiMusicalNotes className='text-6xl text-gray-600' />
                        Music
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(9648)} className=' w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiAllSeeingEye className='text-6xl text-emerald-700' />
                        Mystery
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(10749)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiCharm className='text-6xl text-pink-700' />
                        Romance
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(878)} className=' w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiFallingBlob className='text-6xl text-orange-700' />
                        Science Fiction
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(53)} className=' w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiGhost className='text-6xl text-slate-600' />
                        Thriller
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(10752)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiBattleTank className='text-6xl text-green-700' />
                        War
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button onClick={() => handleGeter(37)} className='w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg' >
                        <GiWesternHat className='text-6xl text-yellow-700' />
                        Western
                    </button>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Filter