import LandingPage from "../components/LandingPage/LandingPage";
import MusicPage from "../components/MusicPage/MusicPage";
import NewsPage from "../components/NewsPage/NewsPage";
// import MoviesPage from "../components/MoviesPage/MoviesPage";
// import VideosPage from "../components/VideosPage/VideosPage";

const APPROUTESCOMPONENTS = [
  { r: "/", p: <LandingPage /> },
  { r: "/music", p: <MusicPage /> },
  {
    r: "/music/bookmarked",
    p: <MusicPage bookmarkedPage={true} />,
  },
  { r: "/news", p: <NewsPage /> },
  {
    r: "/news/bookmarked",
    p: <NewsPage bookmarkedPage={true} />,
  },
  // { r: "/movies", p: <MoviesPage /> },
  // {
  //   r: "/movies/bookmarked",
  //   p: <MoviesPage bookmarkedPage={true} />,
  // },
  // { r: "/videos", p: <VideosPage /> },
  // {
  //   r: "/videos/bookmarked",
  //   p: <VideosPage bookmarkedPage={true} />,
  // },
];

const SECTIONS = [
  "Arts",
  "Automobiles",
  "Books",
  "Business",
  "Fashion",
  "Food",
  "Health",
  "Home",
  "Insider",
  "Magazine",
  "NY Region",
  "Obituaries",
  "Opinion",
  "Politics",
  "Real Estate",
  "Science",
  "Sports",
  "Sunday Review",
  "Technology",
  "Theater",
  "T-Magazine",
  "Travel",
  "Upshot",
  "US",
  "World",
];

const APPROUTES = [
  "/",
  "/music",
  "/news",
  "/movies",
  "/videos",
  "/music/bookmarked",
  "/news/bookmarked",
  "/movies/bookmarked",
  "/videos/bookmarked",
];
const LANDING_LINKS = [
  { label: "Music", link: "/music", delay: "500ms" },
  { label: "News", link: "/news", delay: "1000ms" },
  { label: "Movies", link: "/movies", delay: "1500ms" },
  { label: "Videos", link: "/videos", delay: "2000ms" },
];
export { APPROUTESCOMPONENTS, SECTIONS, APPROUTES, LANDING_LINKS };
