# Bundle Budgetor
[![Netlify Status](https://api.netlify.com/api/v1/badges/dd1c8192-7930-4d2d-a39a-229225925ac0/deploy-status)](https://app.netlify.com/sites/bundle-budgetor/deploys)

Bundle Budgetor is an application crafted for developers, enabling them to monitor and budget Webpack build outputs, set sizing limits on bundles, explore budget violations and bundle anomalies.

By tapping into the Webpack build process, Bundle Budgetor analyses and gathers insights about the output, structuring and displaying them in a minimalistic UI for the developer’s consumption, because not too many developers have an appetite for JSON.

## Key Features
- A dashboard for monitoring bundles and their budgets.
- Identifying Bundle Owners and Budgets
- Insights on Bundles exceeding their budget
- Insight on the new bundles being added on the latest build
- Observing bundle sizes and build sizes over time.


In the project directory, you can run:

### Implementation

Bundle Budgetor is an application developed entirely with the [Base Web React UI framework](https://baseweb.design/).

In addition to the user interface, it also contains an API to ingest data.

The API has been built with [Netlify’s 𝛌 function](https://www.netlify.com/products/functions/), and the computed output is stored in [JSONBin.io](https://jsonbin.io/) which allows for easy reads and updates.

