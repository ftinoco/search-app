import App from './App';
import { getAllCountries, getCountriesByRegion } from './mocks/handlers';
import { server } from './mocks/server';
import {
  render, screen,
  waitForElementToBeRemoved
} from '@testing-library/react';

describe('<App />', () => {
  const data = require('./mocks/countries.json');
  const countries = Object.values(data);

  test('renders initial screen without data', async () => {
    // rendering the component
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    // getting elements
    const filter = screen.getByTestId(/filter-by-region/i);
    const search = screen.getByTestId(/search-input/i);
    // Asserts
    expect(filter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  it('render countries', async () => {
    server.use(
      getAllCountries({
        response: countries,
        error: '',
        status: 200
      })
    )
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const countryName = screen.getAllByTestId('country-name');
    expect(countryName).toHaveLength(8);
  });

  // pending, test if need select filter event
  it('render countries by region', async () => {
    server.use(
      getCountriesByRegion({
        response: countries,
        error: '',
        status: 200,
        region: 'Americas'
      })
    )
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const regionName = screen.getAllByTestId('region-name');
    expect(regionName[0]).toHaveTextContent('Americas');
  });

  describe('handling errors', () => {

    it('internal server error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'Something went wrong',
          status: 500
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByTestId('500-error');
      expect(errorContainer).toBeInTheDocument();
    });

    it('bad request error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'Request was invalid',
          status: 400
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByText(/Request was invalid./i);
      expect(errorContainer).toBeInTheDocument();
    });
     
    it('unathorized error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'unathorized',
          status: 401
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByText(/No API key was found./i);
      expect(errorContainer).toBeInTheDocument();
    });
    
    it('forbidden error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'forbidden',
          status: 403
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByText(/The API key is invalid./i);
      expect(errorContainer).toBeInTheDocument();
    });
    
    it('method not allowed error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'method not allowed',
          status: 405
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByText(/Incorrect HTTP method provided./i);
      expect(errorContainer).toBeInTheDocument();
    });
    
    it('too many requests error', async () => {
      server.use(
        getAllCountries({
          response: countries,
          error: 'too many requests',
          status: 429
        })
      )
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
      const errorContainer = screen.getByText(/Client is rate limited./i);
      expect(errorContainer).toBeInTheDocument();
    });
  });
});
