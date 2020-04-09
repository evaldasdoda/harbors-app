import React from 'react';
import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerFull, faHome, faMapMarkerAlt, faCloud } from '@fortawesome/free-solid-svg-icons';

// Components
import Button from '../../Components/UI/Button/Button';
import BookingForm from '../../Components/BookingForm/BookingForm';
import Loader from '../../Components/UI/Loader/Loader';
import Modal from '../../Components/UI/Modal/Modal';

// Styles
import mapStyles from './MapStyles';
require('./Map.scss');

export default class Gmap extends React.Component {
    state = {
        harbors: [],
        selectedHarbor: {
            image: null,
            name: null,
            lat: null,
            lon: null,
            canBook: null
        },
        harborWeather: {
            city: null,
            country: null,
            tempC: null,
            tempF: null,
            condition: null
        },
        showBookingForm: false,
        isLoading: false,
        isModalOpen: false,
        message: {
            header: '',
            content: '',
        },
    };

    
    WrappedMap = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap defaultZoom={10} defaultCenter={{ lat: 54.675693, lng: 25.284074 }} defaultOptions={{ styles: mapStyles }}>
                {props.children}
            </GoogleMap>
        ))
    );
    
    UNSAFE_componentWillMount() {
        this.toggleLoader();
        axios.get(`https://devapi.harba.co/harbors/visible`).then((res) => {
            this.setState({ harbors: res.data });
            this.toggleLoader();
        });
    }
    getSelectedHarbor(harbor) {
        console.log(harbor)
        this.toggleLoader();
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${harbor.lat}&lon=${harbor.lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
            )
            .then((res) => {
                this.setState({
                    harborWeather:{
                        city: res.data.name,
                        country: res.data.sys.country,
                        tempC: Math.round(res.data.main.temp),
                        tempF: Math.round(res.data.main.temp*9/5+32),
                        condition: res.data.weather[0].main
                    }
                })
                this.setState({ selectedHarbor: {
                    image: harbor.image,
                    name: harbor.name,
                    lat: parseFloat(harbor.lat),
                    lon: parseFloat(harbor.lon),
                    canBook: harbor.canBook
                } });
                this.toggleLoader();
            })
            .catch((err) => {
                this.setState({
                    message: {
                        header: 'Request error',
                        content: 'Contact admin',
                    },
                });
                this.toggleModal();
                this.toggleLoader();
                return;
            });
    }

    toggleBookingForm() {
        this.setState((prevState) => ({
            showBookingForm: !prevState.showBookingForm,
        }));
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
    }
    render() {
        return (
            <section className="MAP">
                {this.state.isLoading && <Loader />}
                {this.state.isModalOpen && (
                    <Modal
                        onButtonClick={() => this.toggleModal()}
                        header={this.state.message.header}
                        content={this.state.message.content}
                        backClick={true}
                    />
                )}
                <this.WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                >
                    {this.state.harbors.map(function (harbor) {
                        return (
                            <Marker
                                key={harbor.id}
                                position={{ lat: parseFloat(harbor.lat), lng: parseFloat(harbor.lon) }}
                                onClick={() => this.getSelectedHarbor(harbor)}
                                icon={{
                                    url: '/map-pin.png',
                                    scaledSize: new window.google.maps.Size(50,50)
                                }}
                                />
                        );
                    }, this)}
                    {this.state.selectedHarbor.name && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(this.state.selectedHarbor.lat),
                                lng: parseFloat(this.state.selectedHarbor.lon),
                            }}
                            onCloseClick={() => {
                                this.setState({ 
                                    selectedHarbor: {
                                        image: null,
                                        name: null,
                                        lat: null,
                                        lon: null,
                                        canBook: null
                                    },
                                    harborWeather: {
                                        city: null,
                                        country: null,
                                        tempC: null,
                                        tempF: null,
                                        condition: null
                                    },
                                    showBookingForm:false 
                                });
                            }}
                        >
                            <div className="MAP__popup">
                                {this.state.selectedHarbor.image && (
                                    <img src={`https://devapi.harba.co${this.state.selectedHarbor.image}`} alt="Harbor" />
                                )}
                                <h2>
                                    <FontAwesomeIcon icon={faHome} />
                                    {this.state.selectedHarbor.name}
                                </h2>
                                <h3>
                                    {this.state.harborWeather.city && this.state.harborWeather.country &&
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            {this.state.harborWeather.city} | {this.state.harborWeather.country}
                                        </React.Fragment>
                                    }
                                </h3>
                                <h3>
                                    <FontAwesomeIcon icon={faCloud} />
                                    {this.state.harborWeather.condition}
                                </h3>
                                <h3>
                                    <FontAwesomeIcon icon={faThermometerFull} />
                                    {this.state.harborWeather.tempC} &deg;C | {this.state.harborWeather.tempF} &deg;F
                                </h3>
                                <h3>
                                    <i>Weather provider - OpenWeather</i>
                                </h3>
                                {this.state.selectedHarbor.canBook && (
                                    <Button class="btn-primary" clicked={() => this.toggleBookingForm()}>
                                        Book now
                                    </Button>
                                )}
                                {this.state.showBookingForm && (
                                    <BookingForm
                                        selectedHarbor={this.state.selectedHarbor.name}
                                        closeForm={this.toggleBookingForm.bind(this)}
                                    />
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </this.WrappedMap>
            </section>
        );
    }
}
