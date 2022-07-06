import { useState } from 'react';
import { FilterByRegion } from './components/filter-component';
import SearchCountries from './components/search-component';
import { useFetch } from './services/fetchHook';

function App() {
  const { data, loaded, error } = useFetch('/all');

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [paginate, setpaginate] = useState(8);

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

  return <>
    {(error && <>{error.message}</>)}
    {(!loaded && <>loading...</>)}
    {(!error && loaded &&
      <div className="wrapper">
        <div className="wrapper-inner">
        <SearchCountries callback={setQuery}>
        </SearchCountries>
        <FilterByRegion data={data} callback={setFilter}>
        </FilterByRegion>
        </div>
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
    )}
  </>
}

export default App;
