import App from './App';
import { getAllCountries, getCountriesByRegion } from './mocks/handlers';
import { countries, server } from './mocks/server';
import {
  render, screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<App />', () => {

  test('renders initial screen without data', async () => {
    server.use(
      getAllCountries({ status: 200 })
    );
    // rendering the component
    const { getByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    // getting elements
    const filter = getByTestId(/filter-by-region/i);
    const search = getByTestId(/search-input/i);
    const cardGrid = screen.getByTestId('card-grid');
    // Asserts
    expect(filter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(cardGrid.children).toHaveLength(0);
  });

  it('render countries', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const countryName = screen.getAllByTestId('country-name');
    expect(countryName).toHaveLength(8);
  });

  it('render countries by region', async () => {
    const region = 'Americas';
    const mockSelectRegion = jest.fn();
    // mocking endpoint by region
    server.use(
      getCountriesByRegion({
        response: countries.filter(p => p.region === region),
        region: region,
        spy: mockSelectRegion
      })
    );
    render(<App />);
    // waiting for loading hide
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    // firing select region
    userEvent.selectOptions(
      screen.getByTestId(/filter-by-region/i), [region]
    );
    // waiting for loading hide after select new region
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    // getting elemnent by test attribute
    const regionName = screen.getAllByTestId('region-name');
    // asserts
    expect(mockSelectRegion).toBeCalledTimes(1);
    expect(regionName[0]).toHaveTextContent(region);
  });

  it('render countries by search', async () => {
    //const mockSelectRegion = jest.fn();
    render(<App />);
    // waiting for loading hide
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    // firing select region
    userEvent.type(
      screen.getByTestId(/search-input/i), 'mex'
    );
    // waiting for loading hide after select new region
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    // getting elemnent by test attribute
    const countryName = screen.getAllByTestId('country-name');
    // asserts 
    expect(countryName).not.toHaveLength(0); 
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
