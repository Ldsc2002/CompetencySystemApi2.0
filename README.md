# CompetencySystemApi

## Installation

1.  Install the frontend using node
2.  Install the truffle folder using node
3.  Install Json Server
4.  Install Ganache

## Run using bash

**Gnome terminal is needed**

1. Run `sudo bash start.sh`
2. From the Truffle console copy the address of the contract and paste it on the frontend/src/config.js file

## Run manually

Run using diferent terminals, from the root directory

### Frontend

1. `cd frontend`
2. `npm start`

### Json-Server

1. `cd frontend/data`
2. `json-server --watch db.json --port 3004`

### Ganache

1. `cd ganache`
2. `ganache-cli --gasLimit=0x1fffffffffffff --gasPrice=0`

### Truffle

1. `cd Truffle`
2. `truffle migrate`

