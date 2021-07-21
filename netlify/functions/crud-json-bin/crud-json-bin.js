// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require("node-fetch");

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
  });
};

const updateBin = (newData) => {
  return fetch("https://api.jsonbin.io/v3/b/60f6e61da263d14a29787fa2", {
    body: newData,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$ULU37v/482M.qG.Ac/BPT.HzIJ907rXMwFcEjblPH6/SEg2yj2j.O",
    },
  });
};

exports.handler = async (event, context) => {
  try {
    fetchBin().then((result) => {
      const mergedStats = mergeStats(result.record, buildOutput(event.body));
      updateBin(mergedStats)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return { statusCode: 500, body: error.toString() };
        })
        .then((result) => {
          return {
            statusCode: 200,
            body: result,
          };
        })
        .catch((error) => {
          return { statusCode: 500, body: error.toString() };
        });
    });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
