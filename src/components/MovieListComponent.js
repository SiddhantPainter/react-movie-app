import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const MovieImage = styled.img`
  object-fir: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieListComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={() => props.setSelectedMovie(imdbID)}>
      <MovieImage src={Poster}></MovieImage>
      <MovieName>{Title}</MovieName>
      <MovieInfo>
        {Year ? <span>Year: {Year}</span> : <></>}
        {Type ? <span>Type: {Type}</span> : <></>}
      </MovieInfo>
    </MovieContainer>
  );
};

export default MovieListComponent;
