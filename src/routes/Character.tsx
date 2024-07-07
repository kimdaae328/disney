import { useParams, Link, useNavigate  } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../api";
import styled from "styled-components";

const Loading = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
  text-align: center;
  transform: translate(-50%, -50%);
`

const Title = styled.h2`
  margin-top: 20px;
  font-size: 30px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;

  button {
    margin-bottom: 30px;
    font-size: 30px;
    color: #fff;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

const Img = styled.img<{ src: string; alt: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  list-style: none;
`

const ListItem = styled.li<{ children: React.ReactNode }>`
  margin: 5px;
  padding: 10px;
  color: #000;
  border-radius: 10px;
  background-color: #fff;
`

interface Character {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

export function Character() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<Character>(["character", characterId], () =>
    fetchCharacter(String(characterId))
  );
  
  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (!data) {
    return <Loading>Character not found</Loading>;
  }

  return isLoading ? (
    <Loading>Loading...</Loading>
  ) : (
    <Content>
      <button onClick={() => navigate(-1)}>&larr;</button>
      <Img src={data?.imageUrl} alt={data?.name} />
      <Title>{data?.name}'s Films</Title>
      {
        <List>
          {data?.films.map((film: string) => (
            <ListItem key={film}>{film}</ListItem>
          ))}
        </List>
      }
    </Content>
  );
}

export default Character;
