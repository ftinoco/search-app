/**
 * Controlled component to manage search input
 * @param {callback} param0 callback function to fire when input value change 
 * @returns Search component
 */
const SearchCountries = ({callback}) => {
  return (
    <div className="search-wrapper">
      <label htmlFor="search-form">
        <input type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search for..."
          onChange={(e) => callback(e.target.value)}
          autoComplete="off"
          data-testid="search-input"
        />
        <span className="sr-only">Search countries here</span>
      </label>
    </div>
  );
}

export default SearchCountries;