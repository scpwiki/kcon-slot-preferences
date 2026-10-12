#!/bin/bash
set -eu

# Copy parser.ne (template) for two variants
sed -e 's/__DIGITS__/4/' parser.ne > parser4.ne
sed -e 's/__DIGITS__/5/' parser.ne > parser5.ne

# Generate grammars for both
nearleyc parser4.ne -o parser4.js
nearleyc parser5.ne -o parser5.js
