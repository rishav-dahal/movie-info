import React from "react";
import { useEffect,useState } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./Modules.jsx";

const API_URL=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const App =()=>{
    const [searchTerm , setSearchTerm]= useState("");
    const [movies,setMovies]= useState([]);

    const searchMovies= async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    // const searchMovies = async (title) => {
    //     const response = await fetch(`${API_URL}&s=${title}`);
    //     const data = response.json();
    //     console.log(data)
    //     data.then((res) => {
    //     setMovies(res.Search);
    //     });
    //     }

    //search using enter
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
        searchMovies(searchTerm);
        }
      };

    useEffect(()=>{
        searchMovies("Avenger");
    },[]);

    return(
        <div className="app">
            <h1>MovieInfo</h1>
            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {movies?.length>0? (
                <div className="container">
                    {movies.map((movie)=>(
                        <MovieCard movie={movie}/>
                    ))}
               </div>
            ):(
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )}
        </div>
    );
}

export default App;