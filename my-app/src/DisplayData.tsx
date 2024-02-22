import React, { useEffect, useState } from 'react'

type Player = {
    name: string,
    card: number
}

export default function DisplayData() {
    const generalTimer = 15 * 60;
    const turnDuration = 13; // Assumo che sia la durata di un turno in secondi
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [playerAttivoIndex, setPlayerAttivoIndex] = useState(-1);
    const [gameTimer, setGameTimer] = useState(generalTimer);
    const [turnTimer, setTurnTimer] = useState(turnDuration);
    const [turnoAttivo, setTurnoAttivo] = useState(false);
    const [lettersOnTheTable, setLettersOnTheTable] = useState<string[]>([]);
    const [playersNumber, setPlayersNumber] = useState<number>(0);
    const [gameOn, setGameOn] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z', '->', '<-->', '{}'];

    useEffect(() => {
        let intervalloGenerale: NodeJS.Timeout | null = null;
        if (gameOn && !gameFinished) {
            intervalloGenerale = setInterval(() => {
                setGameTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => {
            if (intervalloGenerale) clearInterval(intervalloGenerale);
        };
    }, [gameOn, gameFinished]);

    useEffect(() => {
        let intervalloTurno: NodeJS.Timeout | null = null;
        if (turnoAttivo) {
            intervalloTurno = setInterval(() => {
                setTurnTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(intervalloTurno!);
                        setTurnoAttivo(false);
                        return turnDuration; // Resetta il timer per il prossimo turno
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalloTurno) clearInterval(intervalloTurno);
        };
    }, [turnoAttivo]);

    const handlePesca = () => {
        // Assicurati che il gioco sia in corso e ci siano giocatori
        if (!gameOn || players.length === 0) return;
    
        setTurnoAttivo(true);
        const randomLetterIndex = Math.floor(Math.random() * letters.length);
        const randomLetter = letters[randomLetterIndex];
    
        setLettersOnTheTable(prevLetters => [...prevLetters, randomLetter]);
        setPlayerAttivoIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            return nextIndex < players.length ? nextIndex : 0;
        });
    
        setTurnTimer(turnDuration);
    };

    const handleReset = () => {
        if (playerAttivoIndex >= 0 && playerAttivoIndex < players.length) {
            setPlayers(prevPlayers => prevPlayers.map((player, index) => {
                if (index === playerAttivoIndex) {
                    return { ...player, card: player.card + lettersOnTheTable.length };
                }
                return player;
            }));
        }
        setLettersOnTheTable([]);
        setTurnTimer(turnDuration);
        setGameFinished(false);
    };

    const handlePlayers = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPlayers = playerNames.map((name, index) => ({
            name: name || `Player ${index + 1}`, 
            card: 0,
        }));
        setPlayers(newPlayers);
        setGameOn(true);
    };

    const handlePlayersNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        setPlayersNumber(num);
        setPlayerNames(Array(num).fill('')); 
    };

    const handlePlayerNameChange = (index: number, newName: string) => {
        const updatedNames = playerNames.map((name, idx) => idx === index ? newName : name);
        setPlayerNames(updatedNames);
    };

    return (
        <>
            <div className='grid grid-cols-5 gap-10 w-full h-full'>
                {lettersOnTheTable.map((letter, index) => (
                    <h1 key={index} className='font-bold text-5xl'>{letter}</h1>
                ))}
            </div>

            {gameOn ? (
                <>
                <div className='flex flex-row justify-around w-full fixed bottom-8 items-center'>
                    
                    {players.map((player, index) => (
                        <div key={index}>
                            <div className={index === playerAttivoIndex ? 'block' : 'hidden'}>
                                ...
                            </div>
                            <div>
                            {player.name}
                            </div>
                            <div>
                            {player.card}
                            </div>                          
                        </div>
                    ))}
                    <div className='flex justify-between w-[300px]'>
                        <button className='b-1 border-8 p-4 rounded-xl border-amber-600 bg-amber-400 ' onClick={handlePesca}>PESCA</button>
                        <button className='b-1 border-8 p-4 rounded-xl border-amber-600 bg-amber-400 ' onClick={handleReset}>RESET</button>
                    </div>
                    </div>
                
                
                    

                    <div className='w-full fixed bottom-[150px]'>
                        <div>timer turno: {turnTimer}
                        </div>
                        <div>timer partita: {Math.floor(gameTimer / 60)}:{String(gameTimer % 60).padStart(2, '0')}
                        </div>
                    </div>
                    
                </>
                
            ) : (
                <>
                    <form onSubmit={handlePlayers} className='flex flex-row justify-around items-baseline'>
                    <input 
                        type="number"
                        className='h-8 p-5 rounded-xl'
                        value={playersNumber}
                        onChange={handlePlayersNumberChange} 
                    />
                    <div className='flex flex-col items-center'>
                    {playerNames.map((name, index) => (
                        <input
                            key={index}
                            type="text"
                            value={name}
                            className='mt-10'
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                            placeholder={`Nome giocatore ${index + 1}`}
                        />
                    ))}
                    </div>
                    
                        <button type="submit" className='border-4 rounded-xl p-3 border-amber-600 bg-amber-400 transition-all transition-0.3s hover:scale-110'>COMINCIA PARTITA</button>
                    </form>

                    
                </>
            )}
        </>
    );
}