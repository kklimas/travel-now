#!/bin/bash

# run server && application gui
# if using linux type ./run.sh in terminal
cd ./server && npm i && npm run dev &
cd ./client && npm i && ng serve --open