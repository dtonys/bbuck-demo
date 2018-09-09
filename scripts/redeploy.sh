#!/bin/sh
cd ~/bbuck-demo
git pull origin master
yarn
npm run build
npm run restart-prod
