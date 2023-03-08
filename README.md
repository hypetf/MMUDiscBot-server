# Server in ExpressJS

## Getting Started

### Description

This is the server of a website which allows to upload an
audio file and send it to a Discord Bot through a custom API and play it in a Discord Channel.

### Prerequisites

To run this project locally, you will need to have NPM and NodeJS installed.<br/>
This project is developed on NodeJS v16.14.2.<br/>

-   [Download NodeJS](https://nodejs.org/en/download/)

### Setup

1. Clone the repository inside your project folder.
    ```sh
    git clone https://github.com/hypetf/MMUDiscBot-server.git
    ```
2. Install all required npm packages by running:
    ```sh
    npm install
    ```
3. Get the server running with **_(create .env file before this)_**:
    ```sh
    npm run server
    ```

#### Create .env file and fill the following variables:

```sh
DISCORD_CLIENT_ID=(from discord dev portal)
DISCORD_CLIENT_SECRET=(from discord dev portal)
DISCORD_REDIRECT_URL=http://localhost:5000/api/auth/redirect | (add to discord dev portal)
SUCCESS_REDIRECT_URL=http://localhost:5173/home
GUILD_ID=(any)

CRYPTO_SECRET_KEY=(generate random secret key)
SESSION_SECRET=(generate random secret key)
PORT=5000
```

Client should be live on:

```sh
http://localhost:5000/
```
