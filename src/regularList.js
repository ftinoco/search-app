export const RegularList = ({
    items,
    resourceName,
    itemComponent: ItemComponent
}) => { 
    return (
        <>
            {items.map((item, idx) => (
                <ItemComponent key={idx} {...{ [resourceName]: item }} />
            ))}
        </>
    )
}