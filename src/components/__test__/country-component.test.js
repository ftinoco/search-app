import { render, screen } from '@testing-library/react';
import { countries } from '../../mocks/server';
import { CountryComponent } from '../country-component';
 
describe('testing country component', () => { 
    it('render component correctly', () => {
        render(<CountryComponent country={countries[0]} />);
        const countryName = screen.getByTestId('country-name');
        expect(countryName).toHaveTextContent('Afghanistan');
    });
});