#!/bin/bash

set -euxo pipefail

git fetch upstream --tags "${@:1}"
git merge "${@:1}"

