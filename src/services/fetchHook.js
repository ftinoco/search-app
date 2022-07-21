import { useEffect, useState } from "react"
import { COUNTRY_API_URL_BASE, API_KEY } from "../const";

export const useFetch = ({query, region}) => {
    const [response, setResponse] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [error, setError] = useState('');

    const fetchData = (params) => {
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        };

        let url = '/all'
        if (params.region)
            url = `/region/${params.region}`

        fetch(`${COUNTRY_API_URL_BASE}${url}`, opts)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.status + ' ' + response.statusText)
                }
                return response.json();
            })
            .then((result) => {
                setLoaded(true); 

                const keys = Object.keys(result).sort(); 
                const resultAsArray = keys.map((key) => result[key]);    
                const search_parameters = Object.keys(Object.assign({}, ...resultAsArray));                 
                setResponse(resultAsArray.filter(
                    (item) =>
                        search_parameters.some(
                            (searchParam) => item[searchParam].toString()
                                .toLowerCase()
                                .includes(params.query)
                        )
                )); 
            })
            .catch((error) => {
                setLoaded(true);
                setError(error.message.trim());
            });
    }

    useEffect(() => {
        console.log('called!');
        fetchData({query, region});
    }, [region, query]);

    return { data: response, loaded, error };
} 