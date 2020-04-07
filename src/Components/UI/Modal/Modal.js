import React from 'react';

// Components
import Button from '../Button/Button';

// Styles
require('./Modal.scss');

export default class modal extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onButtonClick();
        }
    }
    render() {
        return (
            <div ref={this.setWrapperRef} className="MODAL">
                <div className="MODAL__container">
                    <h2>{this.props.header}</h2>
                    <hr />
                    <p>{this.props.content}</p>
                    <Button class="btn-danger" clicked={this.props.onButtonClick}>
                        Close
                    </Button>
                </div>
            </div>
        );
    }
}
