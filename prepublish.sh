#!/bin/bash

set -o errexit

rm -rf dist || true
mkdir dist
npm run build
mv canon-react.js ./dist
mv canon-react.min.js ./dist
rm -rf test-built ./dist
rm test_bundle.js ./dist
