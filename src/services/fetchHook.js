import { useEffect, useState } from "react"
import { COUNTRY_API_URL_BASE, API_KEY } from "../const";

export const useFetch = (url) => {
    const [response, setResponse] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [error, setError] = useState('');

    const fetchData = () => {
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(`${COUNTRY_API_URL_BASE}${url}`, opts)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.status + ' ' + response.statusText)
                }
                return response.json();
            })
            .then((result) => {
                setLoaded(true);
                setResponse(result);
            })
            .catch((error) => {
                setLoaded(true);
                setError(error.message.trim());
            });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    return { data: Object.values(response), loaded, error };
} 