import { WIKI_INFO_URL_BASE } from "../const";

export const CountryComponent = ({ country }) => {
    const {
        alpha3Code,
        flag: {large},
        name,
        capital,
        region,
        population,
        area
    } = country;

    return (
        <>
            <li key={alpha3Code}>
                <article className="card">
                    <div className="card-image">
                        <a href={WIKI_INFO_URL_BASE + name} target="_blank" rel='noreferrer' >
                            <img src={large} alt={name} />
                        </a>
                    </div>
                    <div className="card-content">
                        <h2 className="card-name">{name}</h2>
                        <ul className="card-list">
                            <li>Capital: <span>{capital}</span></li>
                            <li>Region: <span>{region}</span></li>
                            <li>
                                Population: <span>
                                    {
                                        population.toLocaleString(
                                            navigator.language, {
                                            minimumFractionDigits: 2
                                        })
                                    }
                                </span>
                            </li>
                            <li>Area: <span>
                                {
                                    area.toLocaleString(
                                        navigator.language, {
                                        minimumFractionDigits: 2
                                    })
                                } km<sup>2</sup>
                            </span>
                            </li>
                        </ul>
                    </div>
                </article>
            </li>
        </>
    );
}