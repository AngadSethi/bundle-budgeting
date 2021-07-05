function buildOutput(buildStats, extensions = ["js", "css"]) {
  const bundleStats = [];
  const chunkIdToChunkMapping = new Map();

  for (const chunk of buildStats["chunks"]) {
    chunkIdToChunkMapping.set(chunk["id"], chunk);
  }

  const regex = new RegExp("^.*\\.(" + extensions.join("|") + ")$", "i");

  for (const asset of buildStats["assets"].filter((a) => regex.test(a.name))) {
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
    };
    bundleStats.push(assetDetails);
  }
  return bundleStats;
}

export default buildOutput;
