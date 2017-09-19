import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: ${props => (props.open ? `${props.expandedHeight}px` : '0')};
  overflow: hidden;
  transition: height 0.25s cubic-bezier(0.39, 0.01, 0.55, 0.97);
`;

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedHeight: '',
    };
  }

  componentDidMount() {
    const expandedHeight = this.wrapper.offsetHeight;
    this.setFormHeight(expandedHeight);
  }

  setFormHeight = (expandedHeight) => {
    this.setState(() => ({ expandedHeight }));
  };

  render() {
    return (
      <Wrapper expandedHeight={this.state.expandedHeight} open={this.props.open}>
        <div
          ref={(el) => {
            this.wrapper = el;
          }}
        >
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}
