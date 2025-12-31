import { useNavigate } from "react-router"

export function SearchGenres() {
    const navigate = useNavigate()

    const genres = [
        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Classical', bgc: '#7d4b32', url: 'https://i.scdn.co/image/ab67fb8200005caf4597370d1058e1ec3c1a56fa' },
        { name: 'Chill', bgc: '#b06237', url: 'https://i.scdn.co/image/ab67fb8200005caf330ca3a3bfaf8b18407fb33e' },
        { name: 'K-pop', bgc: '#e91429', url: 'https://i.scdn.co/image/ab67fb8200005caf4b42030ee01cf793663dbb73' },
        { name: 'Jazz', bgc: '#8d67ab', url: 'https://i.scdn.co/image/ab67fb8200005cafa1bb187ec2f4606aa7101bad' },
        { name: 'Love', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf21c9a95a2702ce535fb07915' },
        { name: 'Sleep', bgc: '#1e3264', url: 'https://i.scdn.co/image/ab67fb8200005caf1cef0cee1e498abb8e74955f' },
        { name: 'Metal', bgc: '#e91429', url: 'https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d' },
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


        { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
        { name: 'Classical', bgc: '#7d4b32', url: 'https://i.scdn.co/image/ab67fb8200005caf4597370d1058e1ec3c1a56fa' },
        { name: 'Chill', bgc: '#b06237', url: 'https://i.scdn.co/image/ab67fb8200005caf330ca3a3bfaf8b18407fb33e' },
        { name: 'K-pop', bgc: '#e91429', url: 'https://i.scdn.co/image/ab67fb8200005caf4b42030ee01cf793663dbb73' },
        { name: 'Jazz', bgc: '#8d67ab', url: 'https://i.scdn.co/image/ab67fb8200005cafa1bb187ec2f4606aa7101bad' },
        { name: 'Love', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf21c9a95a2702ce535fb07915' },
        { name: 'Sleep', bgc: '#1e3264', url: 'https://i.scdn.co/image/ab67fb8200005caf1cef0cee1e498abb8e74955f' },
        { name: 'Metal', bgc: '#e91429', url: 'https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d' },
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
        { name: 'Podcasts', bgc: '#006450', url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa' },


    //     { name: 'Live Events', bgc: '#8400e7', url: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg' },
    //     { name: '2025 in Music', bgc: '#8e7203', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
    //     { name: '2025 in Podcasts', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
    //     { name: 'New Releases', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64' },
    //     { name: 'Pop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825' },
    //     { name: 'Hip-Hop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf5f3752b3234e724f9cd6056f' },
    //     { name: 'Rock', bgc: '#006450', url: 'https://i.scdn.co/image/ab67fb8200005cafda4c849095796a9e5d2c4ddb' },
    //     { name: 'Latin', bgc: '#0d73ec', url: 'https://i.scdn.co/image/ab67fb8200005caf3a44e7ae3d808c220898185c' },
    //     { name: 'Charts', bgc: '#8d67ab', url: 'https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg' },
    //     { name: 'Podcast Charts', bgc: '#0d73ec', url: 'https://t.scdn.co/images/7262179db37c498480ef06bfacb60310.jpeg' },
    //     { name: 'Educational', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67656300005f1fd464f18a416c86ede3a235a7' },
    //     { name: 'Documentary', bgc: '#503750', url: 'https://i.scdn.co/image/ab6765630000ba8a2f514cde3ee9501e7ada4cf4' },
    //     { name: 'Music', bgc: '#dc148c', url: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' },
    //     { name: 'Podcasts', bgc: '#006450', url: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa' },
    //     { name: 'Live Events', bgc: '#8400e7', url: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg' },
    //     { name: '2025 in Music', bgc: '#8e7203', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
    //     { name: '2025 in Podcasts', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005cafdcf5fdd3c5644b186f3bac53' },
    //     { name: 'New Releases', bgc: '#608108', url: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64' },
    //     { name: 'Pop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825' },
    //     { name: 'Hip-Hop', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67fb8200005caf5f3752b3234e724f9cd6056f' },
    //     { name: 'Rock', bgc: '#006450', url: 'https://i.scdn.co/image/ab67fb8200005cafda4c849095796a9e5d2c4ddb' },
    //     { name: 'Latin', bgc: '#0d73ec', url: 'https://i.scdn.co/image/ab67fb8200005caf3a44e7ae3d808c220898185c' },
    //     { name: 'Charts', bgc: '#8d67ab', url: 'https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg' },
    //     { name: 'Podcast Charts', bgc: '#0d73ec', url: 'https://t.scdn.co/images/7262179db37c498480ef06bfacb60310.jpeg' },
    //     { name: 'Educational', bgc: '#477d95', url: 'https://i.scdn.co/image/ab67656300005f1fd464f18a416c86ede3a235a7' },
    //     { name: 'Documentary', bgc: '#503750', url: 'https://i.scdn.co/image/ab6765630000ba8a2f514cde3ee9501e7ada4cf4' },
    ]
    function onGenre(genre) {
        navigate(`/search?txt=genre:${genre.name.toLowerCase()}&type=track`)
    }

    return (
        <div className="search-genres">
            <div className="search-genres-header" >
                <h1>Browse all</h1>
            </div>
            {genres.map((genre, idx) => (
                <section onClick={() => onGenre(genre)} key={genre.name + idx} className="genre-preview" style={{ backgroundColor: genre.bgc }}>
                    <h2>{genre.name}</h2>
                    <img src={genre.url} alt="" />
                </section>
            ))}
        </div>
    )
}