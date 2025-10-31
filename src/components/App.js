import React,{useState} from 'react'

const App = () => {
  const [query,setQuery]=useState('');
  const [movies,setMovies]=useState([]);
  const [error,setError]=useState("");
  const API_KEY="99eb9fd1"
  const url=`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  
  const handleSearch=async()=>{
     try {
      const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setError("Invalid movie name. Please try again.");
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Something went wrong. Please try again later.");
      setMovies([]);
    }
  };


  return (
    <div>
    <h1>Search Movie</h1>
    <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/>
    <button onClick={handleSearch}>Search</button>
     {error && <p className="error">{error}</p>}
    {movies.length>0 && movies.map((movie)=>(
      <div key={movie.imdbID}>
        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100"} alt={movie.Title} width="100"/>
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
        </div>
    ))}
    </div>
  )
}

export default App