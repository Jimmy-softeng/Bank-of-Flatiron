import React from "react";

function Search({ onSearch }) {
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm); // trigger the search function from the parent component
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
