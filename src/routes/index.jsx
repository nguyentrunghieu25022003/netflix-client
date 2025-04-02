import Home from "../containers/home/home";
import Login from "../containers/sign-in/sign-in";
import Register from "../containers/sign-up/sign-up";
import AccountLayout from "../layouts/user";
import MoviesLayout from "../layouts/movies-layout";
import AllMovies from "../containers/all-movies/all-movies";
import Series from "../containers/series/series";
import Detail from "../containers/detail/detail";
import FeatureFilms from "../containers/feature-films/feature-films";
import TVShows from "../containers/tv-shows/tv-shows";
import Animated from "../containers/animated/animated";
import SearchResult from "../containers/search/search";
import MyList from "../containers/my-list/my-list";
import Profile from "../containers/profile/profile";
import NotFound from "../containers/not-found/not-found";
import Contact from "../containers/contact/contact";
import ForgotPassword from "../containers/forgot-password/forgot-password";
import ConfirmPassword from "../containers/confirm/confirm";
import ForgotPasswordLayout from "../layouts/password-layout";
import LoginSuccess from "../containers/login-success/login-success";
import UserHistory from "../containers/history/history";
import AdminLayout from "../layouts/admin-layout";
import Dashboard from "../containers/dashboard/dashboard";
import Movies from "../containers/movies/movies";
import CreateMoviePage from "../containers/create-movie/create-movie";
import Authorization from "../containers/authorization/authorization";
import EditMoviePage from "../containers/edit-movie/edit-movie";
import Reports from "../containers/reports/report";

const publicRoutes = [
  { path: "/vn-en", component: Home },
  { path: "/auth/login", component: Login, layout: AccountLayout },
  { path: "/auth/register", component: Register, layout: AccountLayout },
  { path: "/login-success/:token/:email/:avatar", component: LoginSuccess },
  { path: "/forgot-password", component: ForgotPassword, layout: ForgotPasswordLayout },
  { path: "/forgot-password/confirm", component: ConfirmPassword, layout: ForgotPasswordLayout }
];

const privateRoutes = [
  { path: "/", component: AllMovies, layout: MoviesLayout},
  { path: "/series", component: Series, layout: MoviesLayout },
  { path: "/movie/detail/:slug/:episode", component: Detail, layout: MoviesLayout },
  { path: "/feature-films", component: FeatureFilms, layout: MoviesLayout },
  { path: "/tv-shows", component: TVShows, layout: MoviesLayout },
  { path: "/animated", component: Animated, layout: MoviesLayout },
  { path: "/search-film", component: SearchResult, layout: MoviesLayout },
  { path: "/my-list", component: MyList, layout: MoviesLayout },
  { path: "/profile", component: Profile, layout: MoviesLayout },
  { path: "/support", component: NotFound, layout: MoviesLayout },
  { path: "/contact", component: Contact, layout: MoviesLayout },
  { path: "/history", component: UserHistory, layout: MoviesLayout }
];

const adminPrivateRoutes = [
  { path: "/admin/dashboard", component: Dashboard, layout: AdminLayout },
  { path: "/admin/movies", component: Movies, layout: AdminLayout },
  { path: "/admin/movies/create-movie", component: CreateMoviePage, layout: AdminLayout },
  { path: "/admin/movies/edit/:id", component: EditMoviePage, layout: AdminLayout },
  { path: "/admin/authorization", component: Authorization, layout: AdminLayout },
  { path: "/admin/all-report", component: Reports, layout: AdminLayout }
];

export { publicRoutes, privateRoutes, adminPrivateRoutes };