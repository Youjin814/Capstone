import React, { useState } from "react";
import './App.css';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        id="SearchBar"
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="What are you looking for?"
      />
      <button id="SearchButton" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;