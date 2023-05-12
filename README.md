<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use MIT. 📜  -->

![whos-that-pokemon-logo-font-text-alphabet-word-number-transparent-png-2534662-2](https://github.com/DennisHvA/real-time-web-2223/assets/94405795/03257993-0600-4381-9281-e89d34846a83)

## Description

Who's That Pokémon? is een vraag-en-antwoordsegment dat voorkomt in tal van afleveringen van de Pokémon. Ik heb geprobeerd dit na te maken en er een soort spel van te maken waar de eerste die de pokemon raad een punt krijgt.

## Features

-  Een chatroom waar berichten komen als iemand connect, disconnect, een goed antwoord raad, offline is en natuurlijk als iemand iets typt.
- Een userlist/scoreboard waar alle gebruikers te zien zijn die geconnect zijn. Deze wordt geupdate als iemand connect, disconnect en als er een goed antwoord wordt gegeven. 
- Een spel element waar je raad welke pokemon het is. Hierbij wordt er steeds een nieuwe pokemon ingeladen en worden de punten bijgehouden. 

## API

Voor het raden van de pokemon heb ik afbeeldingen nodig. Hiervoor gebruik ik de officiele [(PokeAPI)](https://pokeapi.co).

Er zit heel erg veel in de api, maar ik gebruik alleen de naam en een afbeelding van de pokemon. Als ik een random pokemon ophaal zit de data als volgt in een object.

```json
{
    "name": "pikachu",
    "sprites": {
        "other": {
            "dream_world": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
            }
        }
    },
}
```

![Section 2](https://github.com/DennisHvA/real-time-web-2223/assets/94405795/bfefcea3-0cbf-43d9-aaea-268a4ca438cc)

## Data Life Cycle

![Section 1](https://github.com/DennisHvA/real-time-web-2223/assets/94405795/71310d36-d232-4ef3-813f-45db035ce3ac)

## Wishlist

| Features                      | Klaar? |
| :--------------------------- | :---- |
| Basic chat                   | ✅    |
| Usernames                    | ✅    |
| Bericht als iemand connect   | ✅    |
| Bericht als iemand disconnect| ✅    |
| Bericht met username         | ✅    |
| Verschillende berichten      | ✅    |
| Aan het typen bericht        | ✅    |
| Username met form en dialog  | ✅    |
| Berichten history            | ✅    |
| Data ophalen in de server    | ✅    |
| Data render voor clients     | ✅    |
| Bij goed antwoord iets doen  | ✅    |
| Userlist                     | ✅    |
| Punt erbij voor goed antwoord| ✅    |
| Fetch voor goed antwoord     | ✅    |
| Offline bericht              | ✅    |
| Skip pokemon                 |       |
| Beperkte tijd voor raden     |       |
| Hints                        |       |
| Eerste tot x aantal punten   |       |

## Sources

[(Socket introduction)](https://socket.io/get-started/chat)
[(Offline)](https://socket.io/docs/v4/client-offline-behavior/)
[(Emit cheatsheet)](https://socket.io/docs/v4/client-offline-behavior/)
[(Barebonechat)](https://socket.io/docs/v4/client-offline-behavior/)

## Deployment

[https://whos-that-pokemon.up.railway.app](https://whos-that-pokemon.up.railway.app)

## Installation

Installeer deze repository: 

```
Git clone https://github.com/dennishva/real-time-web-2223
```

Om Node modules te installeren:

```
npm install
```

Om de applicatie te starten:

```
npm start
```

Om gebruik te maken van automatische updates tijdens development:

```
npm run dev
```

## License

De [MIT](https://github.com/DennisHvA/real-time-web-2223/blob/main/LICENSE) licentie wordt gebruikt

