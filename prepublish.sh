#!/bin/bash

set -o errexit

git stash save 'Before publish'
rm -rf dist
mkdir dist
npm run build
mv canon-react.js ./dist
mv canon-react.min.js ./dist
rm -rf test-built
rm test_bundle.js
git stash pop
