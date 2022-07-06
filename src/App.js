import { useState, useEffect } from 'react';
import { API_KEY, COUNTRY_API_URL } from './const';
import { FilterByRegion } from './filter-component';
import SearchCountries from './search-component';

function App() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [paginate, setpaginate] = useState(8);

  useEffect(() => {
    const request_headers = new Headers();
    request_headers.append('Authorization', `Bearer ${API_KEY}`);
    request_headers.append('Content-Type', 'application/json');

    fetch(COUNTRY_API_URL, {
      method: 'GET',
      headers: request_headers
    })
      .then((req) => req.json())
      .then((res) => {
        setLoaded(true);
        setItems(res);
      },
        (error) => {
          setLoaded(true);
          setError(error);
        });
  }, []);

  const data = Object.values(items);
  const search_parameters = Object.keys(Object.assign({}, ...data));

  const search = (data) => {
    return data.filter(
      (item) =>
        item.region.includes(filter) &&
        search_parameters.some(
          (param) => item[param].toString().toLowerCase().includes(query)
        )
    );
  }

  const load_more = () => {
    setpaginate((prevValue) => prevValue + 8);
  };

  if (error) {
    return <>{error.message}</>
  } else if (!loaded) {
    return <>loading...</>
  } else {
    return <>
      <div className="wrapper">
        <SearchCountries callback={setQuery}>
        </SearchCountries>
        <FilterByRegion data={data} callback={setFilter}>
        </FilterByRegion>
        <ul className="card-grid">
          {search(data)
            .slice(0, paginate)
            .map((item) => (
              <li key={item.alpha3Code}>
                <article className="card">
                  <div className="card-image">
                    <img src={item.flag.large} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ul className="card-list">
                      <li>Capital: <span>{item.capital}</span></li>
                      <li>Region: <span>{item.region}</span></li>
                      <li>
                        Population: <span>
                          {
                            item.population.toLocaleString(
                              navigator.language, {
                              minimumFractionDigits: 2
                            })
                          }
                        </span>
                      </li>
                      <li>Area: <span>
                        {
                          item.area.toLocaleString(
                            navigator.language, {
                            minimumFractionDigits: 2
                          })
                        } km2
                      </span>
                      </li>
                    </ul>
                  </div>
                </article>
              </li>
            ))}
        </ul>
        <button onClick={load_more}>Load More</button>
      </div>
    </>
  }
}

export default App;
