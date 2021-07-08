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

export default class TotalSizeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSize: props.totalSize,
            budgetListOpen: false,
            totalSizeOpen: false,
        };
        this.totalSizeModalClose = this.totalSizeModalClose.bind(this);
        // console.log(props.insights);
    }

    budgetListclose() {
        this.setState({ budgetListOpen: false });
    }

    totalSizeModalClose() {
        this.setState({ totalSizeOpen: false });
    }


    render() {
        return (
            <div>
                <div onClick={() => this.setState({ totalSizeOpen: true })}>
                    <MyCard
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    backgroundColor: $theme.colors.warning200,
                                }),
                            },
                        }}
                        content={this.state.totalSize}
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
            </div>
        )
    }
}