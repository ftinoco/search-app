import { rest } from 'msw';
import { COUNTRY_API_URL_BASE } from '../const';

export const getAllCountries = ({
    response = [],
    error = '',
    status
}) => rest.get(`${COUNTRY_API_URL_BASE}/all`, (_, res, ctx) => {
    return res(
        ctx.json(response),
        ctx.status(status, error)
    );
});

export const getCountriesByRegion = ({
    response = [],
    error = '',
    status = 200,
    region,
    spy = jest.Mock
}) => rest.get(`${COUNTRY_API_URL_BASE}/region/${region}`,
    (_, res, ctx) => {
        spy(_.body);
        return res(
            ctx.json(response),
            ctx.status(status, error)
        );
    });
