import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Pagination, SIZE } from "baseui/pagination";
import BundleCard from "./BundleCard";

/**
 * The class encapsulating all cards displaying their individual bundles.
 */
class CardGroup extends React.Component {
  constructor(props) {
    super(props);

    this.PER_PAGE = 1;

    this.state = {
      currentPage: 1,
      isLoaded: false,
    };
  }

  filterResults(result, extensions) {
    const regex = new RegExp("^.*\\.(" + extensions.join("|") + ")$", "i");

    const newResult = {
      bundles: [...result.bundles],
      orphans: [...result.orphans],
    };

    newResult.bundles = newResult.bundles.filter((bundle) =>
      regex.test(bundle.data.name)
    );
    newResult.orphans = newResult.orphans.filter((bundle) =>
      regex.test(bundle.name)
    );

    return newResult;
  }

  componentDidMount() {
    if (this.props.buildOutput !== null) {
      this.setState({
        result: this.filterResults(
          this.props.buildOutput.result,
          this.props.fileType
        ),
        isLoaded: true,
      });
    }
  }

  renderCards() {
    return this.state.result.bundles
      .slice(
        (this.state.currentPage - 1) * this.PER_PAGE,
        this.state.currentPage * this.PER_PAGE
      )
      .map((bundle) => {
        return (
          <FlexGridItem key={bundle.data.name}>
            <BundleCard bundle={bundle} />
          </FlexGridItem>
        );
      });
  }

  render() {
    if (this.state.isLoaded === true) {
      const NUM_PAGES = Math.ceil(
        this.state.result.bundles.length / this.PER_PAGE
      );
      return (
        <div>
          <FlexGrid
            flexGridColumnCount={[1, 2, 3]}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
          >
            {this.renderCards()}
          </FlexGrid>
          <FlexGrid justifyContent={"center"} marginTop={"scale1000"}>
            <Pagination
              numPages={NUM_PAGES}
              size={SIZE.compact}
              currentPage={this.state.currentPage}
              onPageChange={({ nextPage }) => {
                this.setState({
                  currentPage: Math.min(Math.max(nextPage, 1), NUM_PAGES),
                });
              }}
            />
          </FlexGrid>
        </div>
      );
    }
    return <div />;
  }
}

export default CardGroup;
