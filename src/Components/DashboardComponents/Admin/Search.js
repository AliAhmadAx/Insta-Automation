import React from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";
import Buttons from "../../Buttons/Buttons";
import SearchButtons from "../../Buttons/SearchButtons";

const Search = ({
  getEventsData,
  search,
  setSearch,
  setData,
  setTotalPages,
  setTotalRecords,
  placeholder,
}) => {
  //   const [search, setSearch] = useState("");

  return (
    <div>
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault();
          {
            search.length <= 0
              ? toast.error("Search form is empty")
              : getEventsData();
          }
        }}
      >
        <input
          className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
          type="search"
          value={search}
          placeholder={`Search ${placeholder}`}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              setData = setData;
              setTotalPages = setTotalPages;
              setTotalRecords = setTotalRecords;
            }
          }}
        />
        <SearchButtons type="submit" />
      </form>
    </div>
  );
};

export default Search;
