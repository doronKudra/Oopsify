

export function SearchGenres() {

    const genres = [
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
    ]

    return (
        <div className="search-genres">
            {genres.map(genre =>(
                <section className="genre-preview" style={{backgroundColor:genre.bgc}}>
                    <h2>{genre.name}</h2>
                    <img src={genre.url} alt="" />
                </section>
            ))}
        </div>
    )
}