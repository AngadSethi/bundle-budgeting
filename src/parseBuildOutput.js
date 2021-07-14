function buildOutput(buildStats) {
  const bundleStats = [];
  const chunkIdToChunkMapping = new Map();

  for (const chunk of buildStats["chunks"]) {
    chunkIdToChunkMapping.set(chunk["id"], chunk);
  }

  for (const asset of buildStats["assets"]) {
    const assetDetails = {
      name: asset["name"],
      size: asset["size"],
      chunks: asset["chunks"].map((chunk) => {
        const chunkObject = chunkIdToChunkMapping.get(chunk);
        return {
          names: chunkObject["names"],
          size: chunkObject["size"],
        };
      }),
      hash: buildStats["hash"],
      timestamp: buildStats["builtAt"],
    };
    bundleStats.push(assetDetails);
  }
  return bundleStats;
}

export default buildOutput;
