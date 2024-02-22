ITA:

per far partire il gioco sul terminal:

cd my-app
npm start

-----------------------

legenda = {
    -> : tocca al giocatore dopo il giocatore attivo,
    {} : salta il turno e scegli il giocatore che deve pescare,
    <--> : cambio giro 
}

Questa è una versione di gioco del table-game "Guacamole Olè", se non sapete le regole basta guardare le istruzioni all'interno del sito: https://boardgamegeek.com/boardgame/341315/ole-guacamole

Ho cambiato di poco il regolamento per semplicità:

-per finire la partita non bisogna finire il mazzo che in questa versione è potenzialmente infinito, la partita finisce quando finiscono i 15 minuti

-ogni turno ha 13 secondi invece di 12

-se un giocatore sbaglia basta cliccare il pulsante "Reset" e le lettere sul tavolo saranno automaticamente accumulate. Per riprendere basta cliccare "Pesca" con l'automatico cambio giocatore indicato con i "..." sopra al nome del giocatore.

Non ha alcuna estetica, se siete appassionati del gioco e volete implementarlo basta fare una fork, ne sarei felice.

Buon gioco!

------------------


ENG:

Legend = {
-> : it's the next player's turn after the active player,
{} : skip the turn and choose the player who must draw,
<--> : change direction
}


ENG:

To start the game in the terminal:

cd my-app
npm start

---------------------------------

This is a game version of the table game "Guacamole Olè". If you don't know the rules, you can look at the instructions on the website: https://boardgamegeek.com/boardgame/341315/ole-guacamole

I've slightly changed the rules for simplicity:

-To end the game, you don't need to finish the deck, which in this version is potentially infinite. The game ends when 15 minutes are up.

-Each turn lasts 13 seconds instead of 12.

If a player makes a mistake, just click the "Reset" button, and the letters on the table will be automatically accumulated. To continue, just click "Draw", with the automatic player change indicated by "..." above the player's name.

It has no aesthetics, if you're a fan of the game and want to implement it, feel free to fork it, I would be happy.

Enjoy the game!