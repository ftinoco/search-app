import { useState } from 'react';
import { CountryComponent } from './components/country-component';
import { Error } from './components/error/error-component';
import { FilterByRegion } from './components/filter-component';
import SearchCountries from './components/search-component'; 
import { RegularList } from './regularList';
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
    {(error && <Error code={error}  />)}
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
          <RegularList
            items={search(data).slice(0, paginate)}
            itemComponent={CountryComponent}
            resourceName= 'country' />
        </ul>
        <button onClick={load_more}>Load More</button>
      </div>
    )}
  </>
}

export default App;
