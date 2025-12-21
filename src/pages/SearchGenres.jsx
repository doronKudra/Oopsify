
export function SearchGenres() {

    const genres = [
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Podcasts', bgc: '#006450', url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa' },
        { name: 'Live Events', bgc: '#8400e7', url: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg' },
        { name: '2025 in Music', bgc: '#8e7203', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
        { name: '2025 in Podcasts', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
        { name: 'New Releases', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64' },
        { name: 'Pop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825' },
        { name: 'Hip-Hop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf5f3752b3234e724f9cd6056f' },
        { name: 'Rock', bgc: '#006450', url: 'https://i.scdn.co/image/ab67fb8200005cafda4c849095796a9e5d2c4ddb' },
        { name: 'Latin', bgc: '#0d73ec', url: 'https://i.scdn.co/image/ab67fb8200005caf3a44e7ae3d808c220898185c' },
        { name: 'Charts', bgc: '#8d67ab', url: 'https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg' },
        { name: 'Podcast Charts', bgc: '#0d73ec', url: 'https://t.scdn.co/images/7262179db37c498480ef06bfacb60310.jpeg' },
        { name: 'Educational', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67656300005f1fd464f18a416c86ede3a235a7' },
        { name: 'Documentary', bgc: '#503750', url: 'https://i.scdn.co/image/ab6765630000ba8a2f514cde3ee9501e7ada4cf4' },
    ]

    return (
        <div className="search-genres">
            <div className="search-genres-header" >
                <h1>Browse all</h1>
            </div>
            {genres.map(genre => (
                <section key={genre.name} className="genre-preview" style={{ backgroundColor: genre.bgc }}>
                    <h2>{genre.name}</h2>
                    <img src={genre.url} alt="" />
                </section>
            ))}
        </div>
    )
}