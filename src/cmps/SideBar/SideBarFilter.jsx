
export function SideBarFilter() {
    return (
        <div className="sidebar-actions-container">
            <section className="sidebar-filter-container">
                <button className="sidebar-filter">Playlists</button>
                <button className="sidebar-filter">Artists</button>
                <button className="sidebar-filter">Albums</button>
            </section>
            <section className="sidebar-search-container">
                <button className="sidebar-search-btn">
                    <svg width="16px" height="16px" role="img" aria-hidden="true" className="sidebar-search-btn-icon" viewBox="0 0 16 16" ><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7"></path></svg>
                </button>
                <button className="sidebar-sort-btn">
                    <span className="sidebar-sort-name">Recents</span>
                    <svg width="16px" height="16px" role="img" aria-hidden="true" className="sidebar-sort-btn-icon" viewBox="0 0 16 16" ><path d="M15 14.5H5V13h10zm0-5.75H5v-1.5h10zM15 3H5V1.5h10zM3 3H1V1.5h2zm0 11.5H1V13h2zm0-5.75H1v-1.5h2z"></path></svg>
                </button>
            </section>
        </div>
    )
}
