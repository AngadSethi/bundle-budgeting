import * as React from "react";
import returnResult from "../ProcessBudgets";

import MyCard from "../MyCard";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from "baseui/modal";

export default class BundleListWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfBundles: props.numberOfBundles,
            bundleList: [],
            budgetListOpen: false,
        };
        this.budgetListclose = this.budgetListclose.bind(this);
    }

    componentDidMount() {
        let bundledata = returnResult();
        let bundles = bundledata["bundles"];
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
                <div onDoubleClick={() => this.setState({ budgetListOpen: true })}>
                    <MyCard
                        overrides={{
                            Root: {
                                style: ({ $theme }) => ({
                                    backgroundColor: $theme.colors.positive300,
                                }),
                            },
                        }}
                        content={this.state.numberOfBundles}
                    />
                </div>

                <Modal
                    onClose={this.budgetListclose}
                    isOpen={this.state.budgetListOpen}
                >
                    <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <ModalButton onClick={this.budgetListclose}>Okay</ModalButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
