
const Filter = ({ setActiveGenre, setPageEx}) => {

    const handleGeter = (value) => {
        setActiveGenre(value)
        setPageEx(1)
    }

    return (
        <div className="flex gap-2">
            <button onClick={() => handleGeter(null)}>All</button>
            <button onClick={() => handleGeter(28)}>Action</button>
            <button onClick={() => handleGeter(12)}>Adventure</button>
            <button onClick={() => handleGeter(35)}>Animation</button>
            <button onClick={() => handleGeter(80)}>Crime</button>
            <button onClick={() => handleGeter(99)}>Documentary</button>
            <button onClick={() => handleGeter(18)}>Drama</button>
            <button onClick={() => handleGeter(10751)}>Family</button>
            <button onClick={() => handleGeter(36)}>History</button>
            <button onClick={() => handleGeter(27)}>Horror</button>
            <button onClick={() => handleGeter(10402)}>Music</button>
            <button onClick={() => handleGeter(9648)}>Mystery</button>
            <button onClick={() => handleGeter(10749)}>Romance</button>
            <button onClick={() => handleGeter(878)}>Science Fiction</button>
            <button onClick={() => handleGeter(53)}>Thriller</button>
            <button onClick={() => handleGeter(10752)}>War</button>
            <button onClick={() => handleGeter(37)}>Western</button>
        </div>
    )
}

export default Filter