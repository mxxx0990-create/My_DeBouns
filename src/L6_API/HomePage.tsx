import axios from "axios"
import { useEffect, useState } from "react"
// import { IMovie } from "./types"




interface IMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}




function Home() {

    const [movi, setMovi] = useState<IMovie[]>([])
    const [search, setSearch] = useState<string>("")


    useEffect(() => {
        axios.get("https://www.omdbapi.com/?apikey=09ff897&s=Avengers")
            .then(res => {

                if (res.data.Response === "True") {

                    setMovi(res.data.Search);
                } else {
                    console.log("Фильмы не найдены:", res.data.Error);
                }
            })
            .catch(err => {
                console.log("Ошибка сети или сервера:", err);
            });
    }, []);

    //Search
    const sercher = () => {
        if(!search) return
        if (!search || search.length < 3) return;
        axios.get(`https://www.omdbapi.com/?apikey=e09ff897&s=${search}`)
        .then(res => {
            if(res.data.Response === "True"){
                setMovi(res.data.Search)
                
            }
        })
        .catch(err => console.log(err))
    } 

    return (
        <>

        {/* Search */}
        <div>
            <input 
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={sercher}>Search</button>
        </div>
            {
                movi.map(item => (
                    <div key={item.imdbID}>
                        <img src={item.Poster} alt="..." />
                        <h2>Title: {item.Title}</h2>
                        <p>Type: {item.Type}</p>
                        <p>Year: {item.Year}</p>

                    </div>
                ))
            }



        </>
    )
}

export default Home