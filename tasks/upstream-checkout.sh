#!/bin/bash
#
# Retrieve tags from the facebook upstream.
#
# Example:
#   ./tasks/upstream-checkout.sh $TAG $NEW_BRANCH
#   ./tasks/upstream-checkout.sh react-scripts@0.8.5 custom/react-scripts-custom

set -euxo pipefail

git fetch --tags upstream

git checkout tags/"${@:1}" -b "${@:2}"

