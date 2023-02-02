import HandleSearch from "../../Components/ExploredComponents/HandleSearch";
import MovieList from "../../Components/ExploredComponents/MovieList";

function Explored() {
  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col pt-16 dark:bg-gray-800 bg-white px-5 py-5">
      <HandleSearch />
      <MovieList />
    </div>
  );
}

export default Explored;
