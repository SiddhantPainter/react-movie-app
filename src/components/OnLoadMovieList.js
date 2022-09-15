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

const OnLoadMovieList = (props) => {
  const { id, rank, title, year, image, imDbRating } = props.movie;
  return (
    <MovieContainer onClick={() => props.setSelectedMovie(id)}>
      <MovieImage src={image}></MovieImage>
      <MovieName>{title}</MovieName>
      <MovieInfo>
        {year && <span>Year: {year}</span>}
        {rank && <span>Rank: {rank}</span>}
        {imDbRating && <span>IMDB Rating: {imDbRating}</span>}
      </MovieInfo>
    </MovieContainer>
  );
};

export default OnLoadMovieList;
