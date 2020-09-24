import React from "react";

const Result = (props) => {
  return (
    <div className={`card ${props.className}`}>
      <div className="card-body">
        <h5 className="card-title">{props.data.tags.name}</h5>
        {props.data.tags["addr:postcode"] && props.data.tags["addr:street"] && (
          <p className="card-text">
            {props.data.tags["addr:housenumber"]}{" "}
            {props.data.tags["addr:street"]}
            {", "}
            {props.data.tags["addr:postcode"]}
          </p>
        )}
        <ul className="list-group list-group-flush">
          {props.data.tags.website && (
            <li className="list-group-item text-truncate">
              <i className="fa fa-link mr-1"></i>
              <a className="card-link" href={props.data.tags.website}>
                <small>Website</small>
              </a>
            </li>
          )}
          {props.data.tags.phone && (
            <li className="list-group-item text-truncate">
              <i className="fa fa-phone mr-1"></i>
              <small>
                <a href={`tel: ${props.data.tags.phone}`}>
                  {props.data.tags.phone}
                </a>
              </small>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Result;
