// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
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
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    })
    .then(({ body }) => {
      return app.client.chat.postMessage({
        channel: channelId,
        parse: "",
        text: slackAlertMessage(JSON.parse(body)),
      });
    })
    .then((result) => ({
      statusCode: 200,
      body: result.message.text,
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
      bundleList.push(bundle.name);
    }
    if (bundle.sizes.length === 1) {
      newBundleNames.push(bundle.name);
    }
    if (
      bundle.size < bundle.budget &&
      bundle.sizes[numberOfBuilds - 1] > bundle.sizes[numberOfBuilds - 2]
    ) {
      // Bundles within Budget but whose sizes have increased.
      enlargedBundles.push(bundle.name);
    }
  });
  return [bundleList, newBundleNames, enlargedBundles];
};

const slackAlertMessage = (result) => {
  const message = computeInsights(result);
  const bundleList = message[0];
  const newBundles = message[1];
  const enlargedBundles = message[2];
  const AlertMessage = [
    {
      type: "Bundles that exceed the Budget in the latest build",
      text: {
        type: "mrkdwn",
        text: Array.toString(bundleList),
      },
    },
    {
      type: "New bundles added in the latest build",
      text: {
        type: "mrkdwn",
        text: Array.toString(newBundles),
      },
    },
    {
      type: "Bundles within budget whose sizes have increased",
      text: {
        type: "mrkdwn",
        text: Array.toString(enlargedBundles),
      },
    },
  ];
  return AlertMessage;
};
