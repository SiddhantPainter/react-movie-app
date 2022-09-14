import { useState, useEffect } from "react";
import styled from "styled-components";
import MovieListComponent from "./components/MovieListComponent";
import Axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";
import OnLoadMovieList from "./components/OnLoadMovieList";
import { genreList } from "./genreList";

export const OMDB_API_KEY = "f92d07a3";
export const IMDB_API_KEY = "k_exhswevp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: blue;
  color: white;
  padding: 15px;
  align-items: center;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AppIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 5px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 25px;
  font-weight: bold;
  border: none;
  oultine: black;
  margin-left: 15px;
`;

const GenreList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  gap: 2px;
  justify-content: space-evenly;
`;

const GenreButton = styled.button`
  display: flex;
  padding: 5px;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
  margin-left: 20px;
  flex-wrap: wrap;
  padding: 10px;
  gap: 2px;
  justify-content: space-evenly;
`;

const FilterInput = styled.input`
  color: black;
  font-size: 10px;
  font-weight: bold;
  border: solid;
  oultine: black;
  margin-left: 15px;
`;

const FilterButton = styled.button`
  display: flex;
  padding: 5px;
  background-color: blue;
  color: white;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Select = styled.select`
  width: 10%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 2px;
  font-size: 15px;
  border: solid;
  margin-left: 5px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

function App() {
  const [searchString, setSearchString] = useState();
  //  const [timeoutState, setTimeoutState] = useState();
  const [movieList, setMovieList] = useState([]);
  const [onLoadList, setOnLoadList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [filterYearMin, setFilterYearMin] = useState();
  const [filterYearMax, setFilterYearMax] = useState();
  const [filterLengthMin, setFilterLengthMin] = useState();
  const [filterLengthMax, setFilterLengthMax] = useState();
  const [filterGenre, setFilterGenre] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      Axios.get(
        `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`
      ).then((response) => {
        setOnLoadList(response.data.items);
        setLoading(false);
      });
    }, 2000);
  }, []);

  const fetchData = async (searchQuery) => {
    setMovieList([]);
    setLoading(true);
    Axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}`
    ).then((response) => {
      setMovieList(response.data.Search);
      setLoading(false);
    });
  };

  // const onTextChange = (event) => {
  //   clearTimeout(timeoutState);
  //   setSearchString(event.target.value);
  //   const timeout = setTimeout(() => fetchData(event.target.value), 500);
  //   setTimeoutState(timeout);
  // };

  const onTextChange = (event) => {
    setSearchString(event.target.value);
  };

  const onFilterYearMinChange = (event) => {
    setFilterYearMin(event.target.value);
  };

  const onFilterYearMaxChange = (event) => {
    setFilterYearMax(event.target.value);
  };

  const onFilterLengthMinChange = (event) => {
    setFilterLengthMin(event.target.value);
  };

  const onFilterLengthMaxChange = (event) => {
    setFilterLengthMax(event.target.value);
  };

  const onFilterGenreChange = (event) => {
    setFilterGenre(event.target.value);
  };

  const onGenreSelect = async (value) => {
    setOnLoadList([]);
    setLoading(true);
    Axios.get(
      `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?genres=${value}&sort=user_rating,desc&groups=top_250`
    ).then((response) => {
      setOnLoadList(response.data.results);
      setLoading(false);
    });
  };

  const onFilterData = async () => {
    setOnLoadList([]);
    setLoading(true);
    Axios.get(
      `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?release_date=${filterYearMin}-01-01,${filterYearMax}-01-01&genres=${filterGenre}&moviemeter=${filterLengthMin},${filterLengthMax}`
    ).then((response) => {
      setOnLoadList(response.data.results);
      setLoading(false);
    });
  };

  return (
    <Container>
      <Header>
        <AppName>
          <AppIcon src="/icon.png"></AppIcon>Movie Info App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.png"></SearchIcon>
          <SearchInput
            placeholder="Search Movie Name"
            value={searchString}
            onChange={onTextChange}
          ></SearchInput>
          <FilterButton onClick={() => fetchData(searchString)}>
            Search
          </FilterButton>
        </SearchBox>
      </Header>
      <GenreList>
        Genre List:
        {genreList.map((genre) => (
          <GenreButton onClick={() => onGenreSelect(genre.value)}>
            {genre.value}
          </GenreButton>
        ))}
      </GenreList>
      <FilterBox>
        Apply Filters: Release Year:
        <FilterInput
          placeholder="From"
          value={filterYearMin}
          type="number"
          onChange={onFilterYearMinChange}
        ></FilterInput>
        <FilterInput
          placeholder="To"
          value={filterYearMax}
          type="number"
          onChange={onFilterYearMaxChange}
        ></FilterInput>
        Runtime(in Minutes):
        <FilterInput
          placeholder="From"
          value={filterLengthMin}
          type="number"
          onChange={onFilterLengthMinChange}
        ></FilterInput>
        <FilterInput
          placeholder="To"
          value={filterLengthMax}
          type="number"
          onChange={onFilterLengthMaxChange}
        ></FilterInput>
        Genre:
        <Select
          placeholder="Select Genre"
          value={filterGenre}
          onChange={onFilterGenreChange}
        >
          {genreList.map((genre) => (
            <option>{genre.value}</option>
          ))}
        </Select>
        <FilterButton onClick={() => onFilterData()}>Apply</FilterButton>
      </FilterBox>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      {!isLoading ? (
        <MovieContainer>
          {movieList?.length
            ? movieList.map((movie, index) => (
                <MovieListComponent
                  key={index}
                  movie={movie}
                  setSelectedMovie={setSelectedMovie}
                />
              ))
            : onLoadList.map((movie, index) => (
                <OnLoadMovieList
                  key={index}
                  movie={movie}
                  setSelectedMovie={setSelectedMovie}
                />
              ))}
        </MovieContainer>
      ) : (
        "Loading..."
      )}
    </Container>
  );
}

export default App;
