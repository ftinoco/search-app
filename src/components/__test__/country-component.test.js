import { render, screen } from '@testing-library/react';
import { CountryComponent } from '../country-component';
 
describe('testing country component', () => {

    const data = require('../../mocks/countries.json'); 
    const countries = Object.values(data); 

    it('render component correctly', () => {
        render(<CountryComponent country={countries[0]} />);
        const countryName = screen.getByTestId('country-name');
        expect(countryName).toHaveTextContent('Afghanistan');
    });
});