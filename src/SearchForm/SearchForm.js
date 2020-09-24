import React from "react";

const SearchForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div className="form-group">
        <label className="h1" htmlFor="searchQuery">
          <i className="fa fa-beer mr-1"></i>
          <i className="fa fa-bed mr-1"></i>Where are you going?
        </label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          aria-describedby="searchQueryHelp"
          value={props.query}
          onChange={props.change}
          placeholder="Example: Peak district"
        ></input>
      </div>
    </form>
  );
};

export default SearchForm;
