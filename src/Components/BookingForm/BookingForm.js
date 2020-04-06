import React from 'react';

// Components
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import Loader from '../UI/Loader/Loader';
import Modal from '../UI/Modal/Modal';

// Styles
require('./BookingForm.scss');

export default class BookingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            boat: '', 
            captain: '', 
            date: '', 
            isLoading: false,
            isModalOpen: false,
            message:{
                header:'',
                content:''
            }
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
            message:{
                header:'Success',
                content: this.state.captain + ' you have been registered in '+ this.props.selectedHarbour +' harbour!'
            },
            boat: '', 
            captain: '', 
            date: ''
        })
        this.toggleModal();
    }

    toggleLoader(){
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
    }

    toggleModal(){
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }
      
    render(){
        return ( 
            <form className="FORM" onSubmit={this.handleSubmit.bind(this)}>
                <div className="loader" style={{ display: this.state.isLoading ? '' : 'none' }}>
                    <Loader />
                </div>
                <div className="modal" style={{ display: this.state.isModalOpen ? 'block' : 'none' }}>
                    <Modal onButtonClick={()=>this.toggleModal()} header={this.state.message.header} content={this.state.message.content}  />
                </div>
                <Label for={'boat-name'}>Boat name</Label>
                <Input name='boat' onChange={this.handleChange} value={this.state.boat} type='text' placeholder='Boat name' id='boat-name' required/>
                <Label for={'captain-name'}>Captain name and surname</Label>
                <Input name='captain' onChange={this.handleChange} value={this.state.captain} type='text' placeholder='Name and surname' id='captain-name' required/>
                <Label for={'date'}>Date from</Label>
                <Input name='date' onChange={this.handleChange} value={this.state.date} type='date' id='date'/>
                <Button type='submit' class='btn-primary'>Submit</Button>
            </form>
        )
    }
}

