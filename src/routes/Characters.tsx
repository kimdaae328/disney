import { fetchCharacters } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  position: relative;
  text-align: center;
  padding: 50px 0 60px;
  font-size: 40px;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li<{ children: React.ReactNode }>`
  display: flex;
  justify-content: center;
  width: 200px;
  margin-bottom: 50px;
  
  a {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 0;
    text-align: center;

    &:hover {
      border-radius: 10px;
      background-color: #fff;

      span {
        color: #000;
      }
    }

    span {
      margin-top: 20px;
    }
  }
`;

const Img = styled.img<{ src: string; alt: string }>`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 80px;
  object-fit: cover;
`;

const Loading = styled.p`
  font-size: 30px;
  text-align: center;
`


interface ICharacter {
  id: number;
  name: string;
  imageUrl: string;
}

export function Characters() {
  const { isLoading, data } = useQuery<ICharacter[]>(
    ["characters"],
    fetchCharacters
  );
  return (
    <div>
      <Title>Characters</Title>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <List>
          {data?.slice(0, 100).map((character) => (
            <ListItem key={character?.id}>
              <Link to={`/characters/${character?.id}`}>
                <Img src={character?.imageUrl} alt={character?.name} />
                <span>{character?.name}</span>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Characters;
