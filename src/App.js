import React from "react";
import axios from "axios";
import SearchForm from "./SearchForm/SearchForm";
import Map from "./Map/Map";
import Results from "./Results/Results";
import "leaflet/dist/leaflet.js";

class App extends React.Component {
  state = {
    initialised: false,
    loading: false,
    error: null,
    query: "",
    results: [],
    map: {
      position: {
        lat: 51.505,
        lon: -0.09,
      },
      zoom: 13,
    },
  };

  nodesTimeout = null;

  handleSearchSubmit = async (e) => {
    e.preventDefault();

    this.setState({ initialised: true });

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${this.state.query}&format=json&email=rodrigo@rodrigodiez.io`
    );

    this.setState({
      map: {
        position: {
          lat: res.data[0].lat,
          lon: res.data[0].lon,
          bounds: [
            [res.data[0].boundingbox[0], res.data[0].boundingbox[2]],
            [res.data[0].boundingbox[1], res.data[0].boundingbox[3]],
          ],
        },
      },
    });
  };

  handleMapChange = async (e) => {
    if (this.nodesTimeout) {
      console.log("Debouncing timeout", this.nodesTimeout);
      clearTimeout(this.nodesTimeout);
      console.log("Debounced timeout", this.nodesTimeout);
    }

    this.nodesTimeout = setTimeout(
      async () => {
        console.log(e);

        const bounds = e.target.getBounds();

        const query = {
          north_west: {
            lat: bounds._northEast.lat,
            lon: bounds._southWest.lng,
          },
          south_east: {
            lat: bounds._southWest.lat,
            lon: bounds._northEast.lng,
          },
        };

        this.setState({ loading: true, error: null });

        try {
          const res = await axios.post("/api", { data: query });
          console.log(res.data);
          this.setState({ loading: false, results: res.data.data });
        } catch (e) {
          this.setState({ loading: false, error: true });
        }
      },
      500,
      e
    );

    console.log("Timeout scheduled", this.nodesTimeout);
  };

  handleSearchQueryChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    let results = null;

    if (this.state.initialised) {
      results = (
        <div className="row">
          <div className="col-md-4">
            <Map
              position={this.state.map.position}
              results={this.state.results}
              change={this.handleMapChange}
              zoom={this.state.map.zoom}
            />
          </div>

          <div className="col-md-8">
            <Results
              results={this.state.results}
              loading={this.state.loading}
            />
          </div>
        </div>
      );
    }

    let containerClasses = ["container", "h-100"];
    if (!this.state.initialised) {
      containerClasses.push(
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );
    }

    return (
      <div className={containerClasses.join(" ")}>
        <div className="row">
          <div className="col-md-12">
            <SearchForm
              query={this.state.query}
              change={this.handleSearchQueryChange}
              submit={this.handleSearchSubmit}
            />
          </div>
        </div>
        {results}
      </div>
    );
  }
}

export default App;
