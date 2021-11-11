#!/bin/bash
cmd=( gnome-terminal --tab-with-profile=Default -e)
cd frontend
gnome-terminal -- bash -c "npm start; exec bash"
cd data 
ls
gnome-terminal -- bash -c "json-server --watch db.json --port 3004; exec bash"
cd ../../ganache
gnome-terminal -- bash -c "ganache-cli --gasLimit=0x1fffffffffffff --gasPrice=0;exec bash"
cd ../Truffle
gnome-terminal -- bash -c "truffle migrate; exec bash"
