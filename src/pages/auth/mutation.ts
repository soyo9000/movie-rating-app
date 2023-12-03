export const mutationLogin = async () => {
  const res = await fetch(
    //fetch함수의 비동기 작업이 완료될때까지 기다림.
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRmMDVlN2RiZmQ5MTQ1NDYyM2I3ZDBjYzI0MzUyMyIsInN1YiI6IjY1NmFkZTM1MDg1OWI0MDBlMjljNTVhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AZJf7MUM9ReBDUyekXQnP5JKKNVbzCOt9zUWl4hyzlQ",
      },
    }
  );

  const data = await res.json();

  return data; //Promise가 완료될때까지 가다림
};
