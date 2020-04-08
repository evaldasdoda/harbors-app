import React from 'react';
import PropTypes from 'prop-types';

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
        if(this.props.backClick){
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }

    componentWillUnmount() {
        if(this.props.backClick){
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }

    setWrapperRef(node) {
        if(this.props.backClick){
            this.wrapperRef = node;
        }
    }

    handleClickOutside(event) {
        if(this.props.backClick){
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.props.onButtonClick();
            }
        }
    }
    render() {
        return (
            <div data-testid="modal" ref={this.setWrapperRef} className="MODAL">
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
modal.propTypes = {
    backClick: PropTypes.bool,
    header: PropTypes.string,
    content: PropTypes.string,
    onButtonClick: PropTypes.func,
};