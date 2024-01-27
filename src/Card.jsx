import { useState, useEffect } from 'react';
import './Card.css'
export default function Card({ onGeneralScore, onGeneralBestScore }) {

    const [pokemon, setPokemon] = useState(null);
    const [clickedIDs, setClickedIDs] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestCore] = useState(0);
    const generatePokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

    function shuffle(pokemonArray) {
        for (let i = pokemonArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));

            // Swap current element with random element
            [pokemonArray[i], pokemonArray[randomIndex]] =
                [pokemonArray[randomIndex], pokemonArray[i]];
        }
        return pokemonArray;
    }
    const pokemonIds = [1, 4, 7, 25, 39, 52, 54, 58, 113, 129, 133, 151];
    const shuffleIDs = shuffle([...pokemonIds]);
    console.log(shuffleIDs);
    const pokemons = shuffleIDs.map((id) => generatePokemonUrl(id));

    const handleClicks = (ID, pokemon) => {
        // console.log('ID', ID);
        // Set a new best score if clicked on a repeated pokemon's ID
        if (clickedIDs.includes(ID)) {
            if (score > bestScore) {
                setBestCore(score);
                // console.log('Best score', {bestScore});
            }
            // Reset Score
            setScore(0);
            setClickedIDs([]);

        } else { // Add the non-repeated pokemon's ID to the array
            setClickedIDs((previousClikedIDs) => [...previousClikedIDs, ID]);
            setScore((prevScore) => prevScore + 1);
        }
        setPokemon(shuffle([...pokemon]));

    }

    // Set score on App.jsx when score is update
    useEffect(() => {
        onGeneralScore(score);
    }, [score])

    useEffect(() => {
        onGeneralBestScore(bestScore);
    }, [bestScore])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Promise.all will fetch all the pokemon URLs data simultaneously
                const responses = await Promise.all(pokemons.map(url => fetch(url)));

                // console.log('RESPONSES', responses);
                // Filter any unsuccessful URLs
                const successfulResponses = responses.filter(response => response.ok);
                // console.log('SUCCESSFUL', successfulResponses);
                if (successfulResponses.length !== pokemons.length) {
                    throw new Error('Not all requests were successful');
                }

                // Parse JSON for each successful response
                const data = await Promise.all(successfulResponses.map(response => response.json()));
                // console.log('DATA', data);
                setPokemon(data);
            } catch (error) {
                console.error('Error fetching data', error.message);
            }
        };

        fetchData();
    }, []);

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex-container'>
            {/* Map over the array of Pokémon data */}
            {pokemon.map((pokeData) => (
                <div key={pokeData.id} className='pokemon-container' onClick={() => handleClicks(pokeData.id, pokemon)}>
                    <img src={pokeData.sprites.front_default} alt={pokeData.name} className='pokemon-img' />
                    <h2 className='pokemon-name'>{pokeData.name}</h2>
                </div>
            ))}
        </div>
    );
}

