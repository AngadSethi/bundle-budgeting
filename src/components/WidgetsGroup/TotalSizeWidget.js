import * as React from "react";
import BundleChart from "../BundleChart";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ListItem, ListItemLabel } from "baseui/list";

import MyCard from "../MyCard";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from "baseui/modal";
import buildOutput from "../../parseBuildOutput";
import { parse } from "@babel/core";

export default class TotalSizeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSize: 0,
            budgetListOpen: false,
            totalSizeOpen: false,
        };
        this.totalSizeModalClose = this.totalSizeModalClose.bind(this);
        // console.log(props.insights);
    }

    componentDidMount() {
        if (this.props.buildOutput != null) {
            let buildOut = this.props.buildOutput;
            let bundleStats = buildOut["parsedBuildStats"];
            let buildSize = 0;
            for (let bundle of bundleStats) {
                buildSize = buildSize + bundle["size"];
            }
            buildSize = (buildSize / 1024).toFixed(3);
            this.setState({ totalSize: buildSize })
        }
    }

    budgetListclose() {
        this.setState({ budgetListOpen: false });
    }

    totalSizeModalClose() {
        this.setState({ totalSizeOpen: false });
    }


    render() {
        return (
            < div >
                <div onClick={() => this.setState({ totalSizeOpen: true })}>
                    <MyCard
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    backgroundColor: $theme.colors.warning200,
                                }),
                            },
                        }}
                        content={"The Total size of this build is " + this.state.totalSize + " MB"}
                        help={"Click to view Graph"}
                    />
                </div>

                <Modal
                    onClose={this.totalSizeModalClose}
                    isOpen={this.state.totalSizeOpen}
                >
                    <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
                    <ModalBody>
                        <FlexGrid
                            flexGridColumnCount={[1, 2]}
                            flexGridColumnGap="scale800"
                            flexGridRowGap="scale800"
                        >
                            <FlexGridItem maxWidth={"scale2400"}>
                                <ul
                                    style={{
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                    }}
                                >
                                    <ListItem>
                                        <ListItemLabel>Total Size</ListItemLabel>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemLabel>Total Budget</ListItemLabel>
                                    </ListItem>
                                </ul>
                            </FlexGridItem>
                            <FlexGridItem>
                                <BundleChart
                                    name={"Project Name"}
                                // overshot={bundle.data.overshot}
                                />
                            </FlexGridItem>
                        </FlexGrid>
                    </ModalBody>
                    <ModalFooter>
                        <ModalButton onClick={this.totalSizeModalClose}>Okay</ModalButton>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}