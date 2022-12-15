#!/bin/bash

# run server && application gui
# if using linux type ./run.sh in terminal
cd ./server && npm run dev & cd ./client && ng serve --open