import React from "react";

const Result = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{props.data.tags.name}</div>
        <ul className="list-group list-group-flush">
          {props.data.tags.website && (
            <li className="list-group-item text-truncate">
              <a className="card-link" href={props.data.tags.website}>
                <i className="fa fa-code"></i>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Result;
