import { useEffect, useState } from "react"
import { COUNTRY_API_URL_BASE, API_KEY } from "../const";

/**
 * custom hook
 * @param {*} param0 filter by any field and region name
 * @returns data from api as array, boolean that indicate if
 * the information is loading and error message if there is an error
 * @ref https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj
 */
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
                /* it was necessary to sort the result
                    and avoid Object.values because return unsorted list
                */
                const keys = Object.keys(result).sort(); 
                const resultAsArray = keys.map((key) => result[key]);    
                /* getting array of fields */
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
        fetchData({query, region});
    },
    // the sending of parameters as separate objects, 
    // as a single parameter caused multiple executions
    [region, query]);

    return { data: response, loaded, error };
} 