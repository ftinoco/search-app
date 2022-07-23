import { useEffect, useState } from 'react';
import { CountryComponent } from './components/country-component';
import { Error as ErrorEnum } from './components/error/error-component';
import { FilterByRegion } from './components/filter-component';
import SearchCountries from './components/search-component';
import { API_KEY, COUNTRY_API_URL_BASE } from './const';
import { RegularList } from './regularList';
//import { getCountries } from './services';

function App() {
  const [data, setResponse] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [paginate, setPaginate] = useState(8);

  useEffect(() => {
    setLoaded(false);
    const opts = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    };
    //console.debug(filter);
    const url = (filter) ? `/region/${filter}` : '/all';
    fetch(`${COUNTRY_API_URL_BASE}${url}`, opts)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status)
        }
        return response.json();
      })
      .then((result) => {
        setLoaded(true);
        /* it was necessary to sort the result
            and avoid Object.values because return unsorted list
        */
        const keys = Object.keys(result).sort();
        const resultAsArray = keys.map((key) => result[key]);
        // filtering countries just by name
        setResponse(resultAsArray.filter(
          (item) => item['name'].toString()
            .toLowerCase()
            .includes(query)
        ));
      })
      .catch((error) => {
        setLoaded(true);
        setError(error.message.trim());
      });
  }, [query, filter]);

  const loadMore = () => {
    setPaginate((prevValue) => prevValue + 8);
  };

  const restorePaginate = () => {
    setPaginate(8);
  }

  return (
    <>
      {(error && <ErrorEnum code={error} />)}
      {(!error &&
        <div className="wrapper">
          <div className="wrapper-inner">
            <SearchCountries callback={setQuery} />
            <FilterByRegion data={data} callback={setFilter} />
          </div>
          {(!loaded ?
            <div data-testid="loading">loading...</div>
            :
            <RegularList
              items={data.slice(0, paginate)}
              itemComponent={CountryComponent}
              resourceName='country' />
          )}
          {
            (paginate < data.length) ?
              <button onClick={loadMore}>Load More</button>
              :
              <button onClick={restorePaginate}>Load Less</button>
          }
        </div>
      )}
    </>
  )
}

export default App;
