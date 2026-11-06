// tmdb API 는 영화 포스터를 함께 제공하기 때문에 순위를 시각화하기 좋은 API

// 영화 목록 보기 버튼을 찾습니다.
const loadMovieBtn = document.querySelector("#loadMovieBtn");

// 영화 카드들이 들어갈 영역을 찾습니다.
const movieList = document.querySelector("#movieList");

// 2교시에서 JSON 데이터를 보여주던 영역입니다.
const movieConsole = document.querySelector("#movieConsole");

// TMDB API 인증 토큰입니다.
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWZlMTA1MzNmZGQ5ZTQ2YmUxZjMxYTM0ZDFlZmM5NCIsIm5iZiI6MTY3NTIyMDMyNC44NjIwMDAyLCJzdWIiOiI2M2Q5ZDU2NGE5MTE3ZjAwNzk3NzI0ODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kt4lBreOxcxl-uQqkHvzhCWeKksW87WNvUUYPKSCMss";

// 인기 영화 목록 API 주소입니다.
const TMDB_URL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

// TMDB 이미지 주소의 앞부분입니다.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 버튼 클릭 시 영화 데이터를 가져와 화면에 출력합니다.
loadMovieBtn.addEventListener("click", async function () {
  // 데이터를 가져오는 동안 보여줄 임시 문구입니다.
  movieList.innerHTML = "<p>영화 정보를 가져오는 중입니다.</p>";

  // 3교시에서는 JSON 출력 영역보다 영화 카드가 중요하므로 숨깁니다.
  if (movieConsole) {
    movieConsole.style.display = "none";
  }

  // TMDB API에 영화 데이터를 요청합니다.
  const response = await fetch(TMDB_URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  // 응답을 JavaScript 객체로 변환합니다.
  const data = await response.json();

  // TMDB 응답에서 실제 영화 목록은 data.results에 있습니다.
  const movies = data.results;

  // 기존 로딩 문구를 지웁니다.
  movieList.innerHTML = "";

  // movies 배열 안의 영화를 하나씩 꺼내 카드로 만듭니다.
  movies.forEach(function (movie) {
    // poster_path가 있으면 실제 이미지 주소를 만들고,
    // 없으면 대체 이미지를 사용합니다.
    const posterUrl = movie.poster_path
      ? IMAGE_BASE_URL + movie.poster_path
      : "https://placehold.co/500x750?text=No+Image";

    // article 태그를 JavaScript로 새로 만듭니다.
    const card = document.createElement("article");

    // CSS 적용을 위해 class 이름을 붙입니다.
    card.className = "movie-card";

    // 카드 안에 이미지, 제목, 개봉일을 넣습니다.
    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title} 포스터">
      <h2>${movie.title}</h2>
      <p>개봉일: ${movie.release_date}</p>
    `;

    // 완성된 카드를 movieList 영역 안에 추가합니다.
    movieList.appendChild(card);
  });
});
