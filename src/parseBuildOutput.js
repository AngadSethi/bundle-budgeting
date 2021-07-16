function buildOutput(buildStats) {
  const bundleStats = [];

  for (const asset of buildStats["assets"]) {
    const assetDetails = {
      name: asset["name"],
      size: asset["size"],
      hash: buildStats["hash"],
      timestamp: buildStats["builtAt"],
    };
    bundleStats.push(assetDetails);
  }
  return bundleStats;
}

export default buildOutput;
