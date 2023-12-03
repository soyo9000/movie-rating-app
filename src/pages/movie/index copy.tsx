import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";
import styled from "styled-components";

const StyledListHeader = styled(List.Header)`
  text-align: left;
`;

const StyledListContent = styled(List.Content)`
  text-align: left;
`;

interface Genre {
  id: number;
  name: string;
}
interface Company {
  name: string;
}

// const CustomListItem = ({ children }) => (
//   <List.Item style={{ textAlign: "left" }}>{children}</List.Item>
// );

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  //하나만있으니까 이름써서 구별 안해줘도 됨
  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.title}</Header>
        <Grid
          columns={2}
          divided
          testAlign="left"
          style={{
            marginTop: 20,
          }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <StyledListHeader>Is the Movie For Adults: </StyledListHeader>
                  <StyledListContent>
                    {data.adult ? "Yes" : "No"}
                  </StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Budget: </StyledListHeader>
                  <StyledListContent>{data.budget} </StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Genre: </StyledListHeader>
                  {data.genres.map((genre: Genre) => (
                    <List.Item key={genre.id}>
                      <StyledListContent>{genre.name}</StyledListContent>
                    </List.Item>
                  ))}
                </List.Item>
                <List.Item>
                  <StyledListHeader>IMDB: ID </StyledListHeader>
                  <List.Content style={{ textAlign: "left" }}>
                    <StyledListContent> {data.imdb_id} </StyledListContent>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Popularity </StyledListHeader>
                  <StyledListContent> {data.popularity}</StyledListContent>
                </List.Item>

                <List.Item>
                  <StyledListHeader>Production Companies: </StyledListHeader>
                  <StyledListContent>
                    {" "}
                    {data.production_companies
                      .map((company: Company) => company.name)
                      .join(", ")}{" "}
                  </StyledListContent>
                  {/* ((company: { name: string })  */}
                </List.Item>
                <List.Item style={{ textAlign: "center" }}>
                  <StyledListHeader>Release Date: </StyledListHeader>
                  <StyledListContent>{data.release_date}</StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Revenue: </StyledListHeader>
                  <StyledListContent>{data.revenue}</StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Runtime: </StyledListHeader>
                  <StyledListContent>{data.runtime}</StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Vote Average: </StyledListHeader>
                  <StyledListContent> {data.vote_average}</StyledListContent>
                </List.Item>
                <List.Item>
                  <StyledListHeader>Language: </StyledListHeader>

                  <StyledListContent>
                    {data.original_language}
                  </StyledListContent>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
