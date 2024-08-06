# CompetencySystemApi2.0

## Run the project

Run using different terminals, from the root directory

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm start`

### Json-Server

1. `cd frontend/data`
2. `npx json-server --watch db.json --port 3004`

### Ganache

1. `cd ganache`
2. `npx ganache-cli --gasLimit=0x1fffffffffffff --gasPrice=0`

### Truffle

1. `cd Truffle`
2. `npm install`
3. `npx truffle migrate`
4. Copy the contract address from the console to the `frontend/src/config.js` file

