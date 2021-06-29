import * as React from 'react';
import { Card, StyledBody } from 'baseui/card';

export default class Widget extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      numberOfBundles: props.insights[0].text,
      totalSize: props.insights[1].text,
      bundlesAddedRemoved: props.insights[2].text
    };
    console.log(props.insights);
  }


  render() {
    return (
      <div className="Widgets" >
        <Card
          overrides={
            {
              Root:
              {
                style: {
                  width: '328px',
                  height: '200px',
                  backgroundColor: 'pink'
                }
              }
            }
          }>
          <StyledBody>
            {this.state.numberOfBundles}
          </StyledBody>
        </Card>

        <Card
          overrides={
            {
              Root:
              {
                style: {
                  width: '328px',
                  height: '200px',
                  backgroundColor: 'orange'
                }
              }
            }
          }
        >
          <StyledBody>
            {this.state.totalSize}
          </StyledBody>
        </Card>

        <Card
          overrides={
            {
              Root:
              {
                style: {
                  width: '328px',
                  height: '200px',
                  backgroundColor: 'yellow'
                }
              }
            }
          }>
          <StyledBody>
            {this.state.bundlesAddedRemoved}
          </StyledBody>
        </Card>
      </div>
    );
  }
}