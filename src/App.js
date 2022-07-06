import {useState, useEffect } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const request_headers = new Headers();
    const api_key = 'beMYso6KrgPLE1GhKBthDv6AycEKOdsqyqn1XHk6';
    request_headers.append('Authorization', `Bearer ${api_key}`);
    request_headers.append('Content-Type', 'application/json');

    fetch('https://countryapi.io/api/all', {
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

  //console.log(items);
  const data = Object.values(items);

  if (error) {
    return <>{error.message}</>
  } else if(!loaded) {
    return <>loading...</>
  }else {
    return (
      <div className="wrapper">
        <ul className="card-grid">
        {data.map((item) => {
          <li key={item.alpha3Code}>
            <article className="card">
              <div className="card-image">
                <img src={item.flag.large} alt={item.name} />
              </div>
              <div className="card-content">
                <h2 className="card-name">{item.name}</h2>
              </div>
            </article>
          </li>
        })}
        </ul>
      </div>
    );
  }

}

export default App;
