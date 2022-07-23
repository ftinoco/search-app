export const RegularList = ({
    items,
    resourceName,
    itemComponent: ItemComponent
}) => {
    return (
        <ul className="card-grid" data-testid='card-grid'>
            {items.map((item, idx) => (
                <ItemComponent key={idx} {...{ [resourceName]: item }} />
            ))}
        </ul>
    )
}