# TommyOh0428.github.io

This repository hosts the interactive portfolio website published via GitHub Pages.

## Continuous deployment

A GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) automatically deploys the site to GitHub Pages whenever changes are pushed to the `main` branch or the workflow is manually dispatched. The job checks out the repository, prepares a clean site artifact, and publishes it to the `github-pages` environment. Ensure GitHub Pages is configured to use the "GitHub Actions" source in the repository settings to complete the setup.
