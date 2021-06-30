import * as React from 'react';
import { Button } from 'baseui/button';
import { Drawer, ANCHOR } from 'baseui/drawer';
import hamburgericon from '../hamburgericon.png';


export default function SideBar() {
    let initialState = {};
    var anchor = ANCHOR['left'];
    initialState[anchor] = false;

    const [isOpen, setIsOpen] = React.useState(initialState);

    function close(anchorType) {
        setIsOpen({ isOpen, [anchorType]: false });
    }

    return (
        <React.Fragment>
            {
                <React.Fragment>
                    <Button
                        onClick={() =>
                            setIsOpen({ ...isOpen, [anchor]: true })
                        }
                        overrides={{
                            BaseButton: {
                                style: {
                                    backgroundColor: 'white',
                                    marginRight: '12px',
                                },
                            },
                        }}
                    >
                        <img src={hamburgericon} alt="sidemenu" style={{ height: "25px", width: "25px" }}></img>
                    </Button>
                    <Drawer
                        onClose={() => close(anchor)}
                        isOpen={isOpen[anchor]}
                        anchor={anchor}

                    >
                        Bundle1.js<br />
                        Bundle2.js
                    </Drawer>
                </React.Fragment>
            }
        </React.Fragment>
    );
}