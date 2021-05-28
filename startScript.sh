#!/bin/bash

PORT=8080 REGION=IND node dist/App.js &
PORT=8081 REGION=USA node dist/App.js &
PORT=8082 REGION=EU node dist/App.js &

wait
echo "All processes done!"