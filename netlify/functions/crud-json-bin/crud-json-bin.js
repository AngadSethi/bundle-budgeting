// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
/**
 * A utility function for generating bundle-specific URLs.
 * @param {string} name
 * @returns {string}
 */
const generateBundleUrl = (name) => "/bundle?b=" + encodeURI(name);

/**
 * A utility function for parsing sizes, converting them to MB, and
 * returning a string with the unit appended.
 * @param {string|Number} size
 * @returns {string}
 */
const parseSize = (size) => {
  // 1 KiB is equivalent to 0.001024 MB
  const SCALE = 0.001024;

  const scaledSize = (parseFloat(size) * SCALE).toLocaleString();

  return scaledSize + " MB";
};

const fetch = require("node-fetch");
const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// The channel ID on Slack.
const channelId = "C028N6F6EA2";

const buildOutput = (buildStats) => {
  const bundleStats = [];
  const sizeMap = new Map();

  buildStats.assets.forEach((asset) => {
    sizeMap.set(asset.name, asset.size);
  });

  for (const assetByChunkName in buildStats.assetsByChunkName) {
    const name = assetByChunkName;
    const chunks = buildStats.assetsByChunkName[assetByChunkName];
    const size = chunks.reduce((accumulator, currentValue) => {
      return accumulator + sizeMap.get(currentValue);
    }, 0);

    const assetDetails = {
      name: name,
      size: size,
      hash: buildStats["hash"],
      timestamp: buildStats["builtAt"],
    };
    bundleStats.push(assetDetails);
  }
  return bundleStats;
};

/**
 * A utility function for merging two build outputs.
 * @param {Array} previousStats
 * @param {Array} currentStats
 * @returns {Array}
 */
const mergeStats = (previousStats, currentStats) => {
  const bundlesMap = new Map();
  currentStats.forEach((currentStat) => {
    bundlesMap.set(currentStat.name, currentStat);
  });

  return previousStats.map((previousStat) => {
    if (bundlesMap.has(previousStat.name) === true) {
      const savedEntry = bundlesMap.get(previousStat.name);
      return {
        ...previousStat,
        hash: savedEntry.hash,
        size: savedEntry.size,
        timestamp: savedEntry.timestamp,
        sizes: [...previousStat.sizes, [savedEntry.timestamp, savedEntry.size]],
      };
    }
    return previousStat;
  });
};

const fetchBin = () => {
  return fetch("https://api.jsonbin.io/v3/b/60f6e61da263d14a29787fa2/latest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$ULU37v/482M.qG.Ac/BPT.HzIJ907rXMwFcEjblPH6/SEg2yj2j.O",
    },
  }).then((result) => result.json());
};

const updateBin = (newData) => {
  return fetch("https://api.jsonbin.io/v3/b/60f6e61da263d14a29787fa2", {
    body: JSON.stringify(newData),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$ULU37v/482M.qG.Ac/BPT.HzIJ907rXMwFcEjblPH6/SEg2yj2j.O",
    },
  }).then((result) => result.json());
};

exports.handler = async (event, context) => {
  return fetchBin()
    .then((result) => {
      return updateBin(
        mergeStats(result.record, buildOutput(JSON.parse(event.body)))
      );
    })
    .then((result) => {
      return app.client.chat.postMessage({
        channel: channelId,
        text: JSON.stringify(slackAlertMessage(result.record)),
        blocks: JSON.stringify(slackAlertMessage(result.record)),
      });
    })
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch((error) => ({
      statusCode: 500,
      body: JSON.stringify(error),
    }));
};

const computeInsights = (result) => {
  const bundleList = [];
  const newBundleNames = [];
  const enlargedBundles = [];

  result.forEach((bundle) => {
    const latestBundleSize = bundle.size;
    const numberOfBuilds = bundle.sizes.length;
    if (latestBundleSize > bundle.budget) {
      bundleList.push(bundle);
    }
    if (bundle.sizes.length === 1) {
      newBundleNames.push(bundle);
    }
    if (
      bundle.size < bundle.budget &&
      bundle.sizes[numberOfBuilds - 1][1] > bundle.sizes[numberOfBuilds - 2][1]
    ) {
      // Bundles within Budget but whose sizes have increased.
      enlargedBundles.push(bundle);
    }
  });
  return [bundleList, newBundleNames, enlargedBundles];
};

const formatBundle = (bundle) => {
  const html = `
  *<https://bundle-budgetor.netlify.app${generateBundleUrl(bundle.name)}|${
    bundle.name
  }>*
  - *Owner*: ${bundle.owner}
  - *Size*: ${parseSize(bundle.size)}
  - *Budget*: ${parseSize(bundle.budget)}
  `;
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: html,
    },
  };
};

const slackAlertMessage = (result) => {
  const message = computeInsights(result);
  const bundleList = message[0];
  const newBundles = message[1];
  const enlargedBundles = message[2];

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Latest Build Output - Report",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*:rotating_light: Bundles that have exceeded their budget in the latest build*\n",
      },
    },
    ...bundleList.map(formatBundle),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*:new: New bundles added in the latest build*\n",
      },
    },
    ...newBundles.map(formatBundle),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*:chart_with_upwards_trend: Bundles within budget whose sizes have increased*\n",
      },
    },
    ...enlargedBundles.map(formatBundle),
  ];
};
