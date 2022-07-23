import { setupServer } from 'msw/node';
import { getAllCountries } from './handlers';

// Setup requests interception using the given handlers.
export const server = setupServer(
    getAllCountries({
        response: [],
        error: '',
        status: 200 
    })
);