import React, { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import Loader from "../../components/Loader";
import Prouser from "../../assets/images/user.png";

function SearchAccountPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultContent, setDefaultContent] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const isSearching = searchQuery.trim() !== "";

  // API hook for fetching data
  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: ["searchAccount", searchQuery],
    endpoint: `${apiPath.common.searchAccount}?q=${searchQuery}&page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: false, // We will manually trigger refetch
  });

  // Effect to handle API response
  useEffect(() => {
    if (data?.status && !isError) {
      if (isSearching) {
        setResults(data?.data ?? []);
      } else {
        setDefaultContent(data?.data ?? []);
      }
    }
  }, [data, isError, isSearching]);

  // Debounced refetch function
  const debouncedSearch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch]
  );

  // Effect to trigger search or fetch default content
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleClick = (item, type) => {
    if (type === "user") {
      navigate(`/@${item?.user_name}`);
    } else if (type === "occasion") {
      navigate(`/occasion/details/${item?.name}/${item._id}`);
    } else if (type === "sub_category") {
      navigate(`/sub-category/details/${item?.name}/${item._id}`);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p className="text-red-500">Error: {error.message}</p>;
    }

    if (isSearching) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Accounts</h2>
          {results.length > 0 ? (
            results.map((user) => (
              <div key={user._id} onClick={() => handleClick(user, "user")} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">
                <img src={user.image || Prouser} alt={user.user_name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{user.user_name}</span>
                  <span className="text-sm text-gray-400">{user.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No accounts found for "{searchQuery}".</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Explore Shayari</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {defaultContent.map((diary) => (
            <div key={diary._id} className="group cursor-pointer" onClick={() => handleClick(diary, diary?.type)}>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src={diary.image} alt={diary.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold mt-2 truncate text-white">{diary.name ? diary.name : ""}</h3>
              <p className="text-sm text-gray-400">{diary.description ? diary.description : ""}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Main>
      <div className="container mx-auto px-4 py-6 text-black">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Search</h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search for accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Content Display */}
        <div>{renderContent()}</div>
      </div>
    </Main>
  );
}

export default SearchAccountPage;
