var bundle_stats = require('./data/bundle-stats.json')
var bundleStats = []
class parsedOutput {
    constructor(assetName, assetSize, chunks){
        this.assetname = assetName;
        this.size = assetSize;
        this.chunks = chunks;
    }
}
const parseBuildOutput = () => {
    let buildAssets = bundle_stats["assets"];
    for(let asset of buildAssets){
        let assetName = asset["name"];
        let assetSize = asset["size"];
        let assetChunkIds = asset["chunks"];
        if(assetChunkIds.length === 0){
            assetChunkIds = []
        }

        let assetDetails = new parsedOutput(assetName , assetSize , assetChunkIds);
        bundleStats.push(assetDetails)

    }
}

parseBuildOutput()
// console.log(bundleStats)