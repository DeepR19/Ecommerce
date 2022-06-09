import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../Actions/cartAction';
import {Country, State} from "country-state-city";

import HomeIcon from "@material-ui/icons/Home"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import PinDropIcon from "@material-ui/icons/PinDrop"
import PhoneIcon from "@material-ui/icons/Phone"
import PublicIcon from "@material-ui/icons/Public"
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation"

import CheckOutStep from "./CheckOutStep"
import { useNavigate } from 'react-router-dom';

export default function Shipping() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const {shippingInfo} = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e)=>{
        e.preventDefault();

        if(phoneNo.length > 10 || phoneNo.length < 10){
            alert("Phone Number should be 10 digit long")
            return
        }
        dispatch(
            saveShippingInfo({address, city, state, country, pinCode, phoneNo})
        );
        navigate('/order/confirm');


    }
  return (
    <>

    <CheckOutStep activeSteps={0}/>   {/* here activeSteps tell current position of the Stepper */}

    <div className="shippingContainer">
        <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form className="shippingForm"
                  encType='multipart/form-data'
                  onSubmit={shippingSubmit}        
            >
                <div>
                    <HomeIcon/>

                    <input type="text"
                           placeholder='Address'
                           required
                           value={address}
                           onChange={(e)=> setAddress(e.target.value )}        
                    />
                </div>
                <div>
                    <LocationCityIcon/>

                    <input type="text"
                           placeholder='city'
                           required
                           value={city}
                           onChange={(e)=> setCity(e.target.value )}        
                    />
                </div>
                <div>
                    <PinDropIcon/>

                    <input type="text"
                           placeholder='Pin Code'
                           required
                           value={pinCode}
                           onChange={(e)=> setPinCode(e.target.value )}        
                    />
                </div>
                <div>
                    <PhoneIcon/>

                    <input type="number"
                           placeholder='Phone NUmber'
                           required
                           value={phoneNo}
                           onChange={(e)=> setPhoneNo(e.target.value )}        
                    />
                </div>

                <div>
                    <PublicIcon/>

                    <select
                        required
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                    >
                        <option value=""><b> Country</b></option>
                        {
                            Country && 
                            Country.getAllCountries().map(item=>(
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>

                        {/* here we add state accourding to Country */}
                {
                    country && (
                        <div>
                            <TransferWithinAStationIcon/>

                            <select
                                required
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {
                                    State && 
                                    State.getStatesOfCountry(country).map(item=>(
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                };


                <input type="submit"
                       value="Countinue"
                       className="shippingBtn"
                       disabled = {state ? false: true}        
                />

            </form>
        </div>
    </div>
    </>
  )
}
