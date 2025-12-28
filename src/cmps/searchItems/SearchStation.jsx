


export function SearchStation({ items }) {
    return (
        <ul className="search-station-list">
            {items.map(item => (
                <li key={item._id} className="search-station">
                    <img src={item.images[0]?.url || defaultImg} alt="" />
                    <p>{item.name}</p>
                    <h6>By {item.owner.name}</h6>
                </li>
            ))}
        </ul>
    )
}