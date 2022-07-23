import { API_KEY, COUNTRY_API_URL_BASE } from "../const";

const fetchData = async (params) => {
    let response = [];
    let loaded = false;
    let error = '';

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

    try {
        const res = await fetch(`${COUNTRY_API_URL_BASE}${url}`, opts);
        if (!res.ok) {
            throw Error(res.status + ' ' + res.statusText);
        }
        const result = await res.json();
        loaded = true;
        /* it was necessary to sort the result
            and avoid Object.values because return unsorted list
        */
        const keys = Object.keys(result).sort();
        const resultAsArray = keys.map((key) => result[key]);
        /* getting array of fields */
        const search_parameters = Object.keys(Object.assign({}, ...resultAsArray));
        response = resultAsArray.filter(
            (item) => search_parameters.some(
                (searchParam) => item[searchParam].toString()
                    .toLowerCase()
                    .includes(params.query)
            )
        );
    } catch (err) {
        loaded = true;
        error = err.message.trim();
    }
    return { response, loaded, error };
}

export const getCountries = ({ query, region }) => {
    return fetchData({ query, region });
}