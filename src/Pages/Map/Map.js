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
        harbours: [],
        selectedHarbour: null,
        harbourWeather: null,
        showBookingForm: false,
        isLoading: false,
        isModalOpen: false,
        message: {
            header: '',
            content: '',
        },
    };

    UNSAFE_componentWillMount() {
        this.toggleLoader();
        axios.get(`https://devapi.harba.co/harbors/visible`).then((res) => {
            this.setState({ harbours: res.data });
            console.log(this.state.harbours);
            this.toggleLoader();
        });
    }

    WrappedMap = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap defaultZoom={10} defaultCenter={{ lat: 54.675693, lng: 25.284074 }} defaultOptions={{ styles: mapStyles }}>
                {props.children}
            </GoogleMap>
        ))
    );

    getSelectedHarbour(harbour) {
        this.toggleLoader();
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${harbour.lat}&lon=${harbour.lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
            )
            .then((res) => {
                this.setState({ harbourWeather: res.data });
                this.setState({ selectedHarbour: harbour });
                this.toggleLoader();
            })
            .catch((err) => {
                console.log(err);
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
                    />
                )}
                <this.WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                >
                    {this.state.harbours.map(function (harbour, i) {
                        return (
                            <Marker
                                key={harbour.id}
                                position={{ lat: parseFloat(harbour.lat), lng: parseFloat(harbour.lon) }}
                                onClick={() => this.getSelectedHarbour(harbour)}
                                icon={{
                                    url: '/map-pin.png',
                                    scaledSize: new window.google.maps.Size(50,50)
                                }}
                            />
                        );
                    }, this)}
                    {this.state.selectedHarbour && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(this.state.selectedHarbour.lat),
                                lng: parseFloat(this.state.selectedHarbour.lon),
                            }}
                            onCloseClick={() => {
                                this.setState({ selectedHarbour: null, harbourWeather: null, showBookingForm:false });
                            }}
                        >
                            <div className="MAP__popup">
                                {this.state.selectedHarbour.image && (
                                    <img src={`https://devapi.harba.co/${this.state.selectedHarbour.image}`} alt="Harbour" />
                                )}
                                <h2>
                                    <FontAwesomeIcon icon={faHome} />
                                    {this.state.selectedHarbour.name}
                                </h2>
                                <h3>
                                    <i>Weather provider - OpenWeather</i>
                                </h3>
                                <h3>
                                    {this.state.harbourWeather.name && this.state.harbourWeather.sys.country &&
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            {this.state.harbourWeather.name} | {this.state.harbourWeather.sys.country}
                                        </React.Fragment>
                                    }
                                </h3>
                                <h3>
                                    <FontAwesomeIcon icon={faCloud} />
                                    {this.state.harbourWeather.weather[0].main}
                                </h3>
                                <h3>
                                    <FontAwesomeIcon icon={faThermometerFull} />
                                    {Math.round(this.state.harbourWeather.main.temp)}
                                </h3>
                                {this.state.selectedHarbour.canBook && (
                                    <Button class="btn-primary" clicked={() => this.toggleBookingForm()}>
                                        Book now
                                    </Button>
                                )}
                                {this.state.showBookingForm && (
                                    <BookingForm
                                        selectedHarbour={this.state.selectedHarbour.name}
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
