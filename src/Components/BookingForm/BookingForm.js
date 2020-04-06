import React from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types';

// Components
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import Loader from '../UI/Loader/Loader';
import Modal from '../UI/Modal/Modal';

// Styles
require('./BookingForm.scss');

export default class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boat: '',
            captain: '',
            dateFrom: '',
            dateTo: '',
            isLoading: false,
            isModalOpen: false,
            message: {
                header: '',
                content: '',
            },
            finish: false,
        };
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    handleSubmit(event) {
        event.preventDefault();
        // this.toggleLoader();
        // let payload = {
        //     'boat_name': this.state.boat,
        //     'captain_name': this.state.captain,
        //     'date': this.state.date
        // };

        // axios({
        //     url: 'https://test.com/api/get_product',
        //     method: 'post',
        //     data: payload
        // })
        // .then(function (response) {
        //     // your action after success
        //     console.log(response);
        //     this.toggleLoader();
        // })
        // .catch(function (error) {
        //     // your action on error success
        //     console.log(error);
        //     this.toggleLoader();
        // });
        this.setState({
            message: {
                header: 'Success',
                content:
                    'Hello ' +
                    this.state.captain +
                    ', you have been registered in ' +
                    this.props.selectedHarbour +
                    ' harbour from ' +
                    this.state.dateFrom +
                    ' to ' +
                    this.state.dateTo,
            },
            finish: true,
        });
        document.getElementById('form').reset();
        this.toggleModal();
    }

    toggleLoader() {
        this.setState((prevState) => ({
            isLoading: !prevState.isLoading,
        }));
    }

    toggleModal() {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
        if (this.state.finish) {
            this.props.closeForm();
        } else {
            return;
        }
    }

    render() {
        return (
            <form id="form" className="FORM" onSubmit={this.handleSubmit.bind(this)}>
                {this.state.isLoading && <Loader />}
                {this.state.isModalOpen && (
                    <Modal
                        onButtonClick={() => this.toggleModal()}
                        header={this.state.message.header}
                        content={this.state.message.content}
                    />
                )}

                <Label for={'boat-name'}>Boat name</Label>
                <Input
                    name="boat"
                    onChange={this.handleChange}
                    value={this.state.boat}
                    type="text"
                    placeholder="Boat name"
                    id="boat-name"
                    required
                />
                <Label for={'captain-name'}>Captain name and surname</Label>
                <Input
                    name="captain"
                    onChange={this.handleChange}
                    value={this.state.captain}
                    type="text"
                    placeholder="Name and surname"
                    id="captain-name"
                    required
                />
                <Label for={'dateFrom'}>Date from</Label>
                <Input
                    name="dateFrom"
                    onChange={this.handleChange}
                    value={this.state.dateFrom}
                    type="date"
                    id="dateFrom"
                    required
                    min={moment().format('YYYY-MM-DD')}
                />
                <Label for={'dateTo'}>Date to</Label>
                <Input
                    name="dateTo"
                    onChange={this.handleChange}
                    value={this.state.dateTo}
                    type="date"
                    id="dateTo"
                    required
                    min={this.state.dateFrom ? this.state.dateFrom : moment().format('YYYY-MM-DD')}
                />

                <Button type="submit" class="btn-primary">
                    Submit
                </Button>
            </form>
        );
    }
}

BookingForm.propTypes = {
    selectedHarbour: PropTypes.string,
};
