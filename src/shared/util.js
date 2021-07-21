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
