/**
 * A utility function for generating bundle-specific URLs.
 * @param {string} name
 * @returns {string}
 */
export const generateBundleUrl = (name) => "/bundle?b=" + encodeURI(name);

/**
 * A utility function for parsing sizes, converting them to MB, and
 * returning a string with the unit appended.
 * @param {string|Number} size
 * @returns {string}
 */
export const parseSize = (size) => {
  // 1 KiB is equivalent to 0.001024 MB
  const SCALE = 0.001024;

  const scaledSize = (parseFloat(size) * SCALE).toLocaleString();

  return scaledSize + " MB";
};

/**
 * A utility function for merging two build outputs.
 * @param {Array} previousStats
 * @param {Array} currentStats
 * @returns {Array}
 */
export const mergeStats = (previousStats, currentStats) => {
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
