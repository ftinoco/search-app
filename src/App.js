import { useState } from 'react';
import { CountryComponent } from './components/country-component';
import { Error } from './components/error/error-component';
import { FilterByRegion } from './components/filter-component';
import SearchCountries from './components/search-component';
import { RegularList } from './regularList';
import { useFetch } from './services/fetchHook';

function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [paginate, setPaginate] = useState(8);
 
  const { data, loaded, error } = useFetch({
    query: query,
    region: filter
  });

  const loadMore = () => {
    setPaginate((prevValue) => prevValue + 8);
  };

  const restorePaginate = () => {
    setPaginate(8);
  } 

  return <>
    {(error && <Error code={error} />)}
    {(!loaded && <>loading...</>)}
    {(!error && loaded &&
      <div className="wrapper">
        <div className="wrapper-inner">
          <SearchCountries callback={setQuery} />
          <FilterByRegion data={data} callback={setFilter} />
        </div>
        <ul className="card-grid">
          <RegularList
            items={data.slice(0, paginate)}
            itemComponent={CountryComponent}
            resourceName='country' />
        </ul>
        {
          (paginate < data.length) ?
            <button onClick={loadMore}>Load More</button>
            :
            <button onClick={restorePaginate}>Load Less</button>
        }
      </div>
    )}
  </>
}

export default App;
