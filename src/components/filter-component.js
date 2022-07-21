export function FilterByRegion({ callback }) {
    const filter_items = [
        'Africa',
        'Americas',
        'Antartic',
        'Asia',
        'Europe',
        'Oceania'
    ];

    return <>
        <div className="select">
            <select
                onChange={(e) => callback(e.target.value)}
                className="custom-select"
                aria-label="Filter countries by region"
                data-testid="filter-by-region">
                <option value="">Filter By Region</option>
                {
                    filter_items.map((item) => (
                        <option key={item} value={item}>Filter by {item}</option>
                    ))
                }
            </select>
            <span className="focus"></span>
        </div>
    </>;
}