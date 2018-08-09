#!/bin/sh
cd ~/webapps/bbuck-demo
git pull origin master
yarn
npm run build
forever restart bbuck-demo
