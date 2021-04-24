# hello-world-javascript-library
![Continuous integration](https://github.com/fp51/hello-world-javascript-library/workflows/Continuous%20integration/badge.svg)

This is a repo template for other javascript oss libraries. Use it for your new
library to have a repository set up with lint, test and usefull github
workflows.

# Features

## Continuous integration

Runs lint, test and build on every commit.

## Continuous delivery

Publish canary versions of the library for pull requests. Publish latest version
once a pull request is merged on `main`.

## Automatic version bump

Flag your pull requests with `Action: patch bump`, `Action: minor bump`,
`Action: major bump` to increment the version of your package or with
`Action: no bump` otherwise.

## Automatic changelog bump

Simply complete the `Unreleased` section of the changelog in your pull request.
It will be update to the new version once merge.

## Automatic release creation

Github releases are created automatically on a new version, using the
corresponding part of the changelog as content.

## Automatic rebase and merge 

Flagging a pull request with the `Action: keep-rebased-then-merge` flag with
keep it rebased until it can me merged.

## Automatic Github Pages documentation release 

Merging a pull request on `master` will push a new generation of the
documentation on `gh-pages`
([example](https://fp51.github.io/hello-world-javascript-library/))

## Dependabot

See [`config`](.github/dependabot.yml)
