import React from "react";

const SearchForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div className="form-group">
        <label className="h1" htmlFor="searchQuery">
          Where do you want to go?
        </label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          aria-describedby="searchQueryHelp"
          value={props.query}
          onChange={props.change}
        ></input>
        <small id="searchQueryHelp" className="form-text text-muted">
          Example: Peak District
        </small>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
