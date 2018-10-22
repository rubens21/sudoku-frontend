#!/bin/bash

docker build -t sudoku-spa:level-4 .
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "\n\nAll set, run ${GREEN}docker run -it --net=host sudoku-spa:level-4${NC} to start the container"
echo "Note: the parameter '--net=host' is NOT optional"