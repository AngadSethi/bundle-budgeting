function buildOutput(buildStats) {
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
}

export default buildOutput;
