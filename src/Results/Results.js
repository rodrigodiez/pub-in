import React from "react";
import Result from "./Result";

const Results = (props) => {
  if (props.loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (props.error) {
    return (
      <div className="alert alert-danger" role="alert">
        Ooops! Something went wrong. Please try again
      </div>
    );
  }
  if (props.results.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No results found
      </div>
    );
  }
  return (
    <div>
      {props.results.map((r) => {
        return <Result data={r} key={r.id} />;
      })}
    </div>
  );
};

export default Results;
