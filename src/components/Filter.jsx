import { BiMoviePlay } from "react-icons/bi";
import {
  GiTreasureMap,
  GiHandcuffs,
  GiMusicalNotes,
  GiBattleTank,
  GiGhost,
  GiMushroomCloud,
  GiAllSeeingEye,
  GiBookmarklet,
  GiBloodyStash,
  GiDramaMasks,
  GiPlagueDoctorProfile,
  GiCharm,
  GiBackup,
  GiBalloons,
  GiFallingBlob,
  GiWesternHat,
} from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Filter = ({ setActiveGenre, setPageEx }) => {
  const genres = [
    {
      name: "All",
      icon: <BiMoviePlay className="text-6xl text-white" />,
      code: null,
    },
    {
      name: "Action",
      icon: <GiMushroomCloud className="text-6xl text-yellow-800" />,
      code: "28",
    },
    {
      name: "Adventure",
      icon: <GiTreasureMap className="text-6xl text-amber-700" />,
      code: "12",
    },
    {
      name: "Animation",
      icon: <GiBalloons className="text-6xl text-yellow-500" />,
      code: "35",
    },
    {
      name: "Crime",
      icon: <GiHandcuffs className="text-6xl text-gray-700" />,
      code: "80",
    },
    {
      name: "Documentary",
      icon: <GiPlagueDoctorProfile className="text-6xl text-lime-800" />,
      code: "99",
    },
    {
      name: "Drama",
      icon: <GiDramaMasks className="text-6xl text-zinc-700" />,
      code: "18",
    },
    {
      name: "Family",
      icon: <GiBackup className="text-6xl text-rose-800" />,
      code: "10751",
    },
    {
      name: "History",
      icon: <GiBookmarklet className="text-6xl text-cyan-700" />,
      code: "36",
    },
    {
      name: "Horror",
      icon: <GiBloodyStash className="text-6xl text-red-800" />,
      code: "27",
    },
    {
      name: "Music",
      icon: <GiMusicalNotes className="text-6xl text-gray-600" />,
      code: "10402",
    },
    {
      name: "Mystery",
      icon: <GiAllSeeingEye className="text-6xl text-emerald-700" />,
      code: "9648",
    },
    {
      name: "Romance",
      icon: <GiCharm className="text-6xl text-pink-700" />,
      code: "10749",
    },
    {
      name: "Science Fiction",
      icon: <GiFallingBlob className="text-6xl text-orange-700" />,
      code: "878",
    },
    {
      name: "Thriller",
      icon: <GiGhost className="text-6xl text-slate-600" />,
      code: "53",
    },
    {
      name: "War",
      icon: <GiBattleTank className="text-6xl text-green-700" />,
      code: "10752",
    },
    {
      name: "Western",
      icon: <GiWesternHat className="text-6xl text-yellow-700" />,
      code: "37",
    },
  ];

  const handleGeter = (value) => {
    setActiveGenre(value);
    setPageEx(1);
  };
  // console.log(genres.action);

  return (
    <div className=" text-sm m-auto w-full max-w-5xl">
      <Swiper slidesPerView={7.5}>
        {genres.map((item, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => handleGeter(item.code)}
              className=" w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-900 rounded-lg"
            >
              {item.icon}
              {item.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Filter;
