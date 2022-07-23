import { setupServer } from 'msw/node';
import { getAllCountries } from './handlers';

const data = require('./countries.json');
export const countries = Object.values(data);

// Setup requests interception using the given handlers.
export const server = setupServer(
    getAllCountries({
        response: countries, 
        status: 200 
    })
);