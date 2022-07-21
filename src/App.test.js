import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import App from './App';
import { getAllCountries } from './mocks/handlers';

describe('<App />', () => {
  const data = require('./mocks/countries.json');
  const countries = Object.values(data);

  const server = setupServer(
    getAllCountries({
      response: countries,
      error: '',
      status: 200
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders initial screen without data', () => {
    // rendering the component
    const { getByTestId } = render(<App />);
    // getting elements
    const filter = getByTestId(/filter-by-region/i);
    const search = getByTestId(/search-input/i);
    // Asserts
    expect(filter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });




});
