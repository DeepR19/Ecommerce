import React from 'react'
import {Stepper, StepLabel, Step} from "@material-ui/core";
import {Link} from "react-router-dom";

import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import "./CheckoutSteps.scss"

export default function CheckOutStep({activeSteps}) {
    const steps = [
        {
            label: "Shipping Details",
            icon: <LocalShippingIcon/>
        },
        {
            label: "Confirm Order",
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: "Payment",
            icon: <AccountBalanceIcon/>
        },
    ];
  return (
   <>
        <Stepper className="stepOut" alternativeLabel activeStep={activeSteps}>
            {steps.map((item,index) => (
                <Step 
                    key={index}
                    active={activeSteps === index ?true:false}  // tell current active page
                    completed={activeSteps >= index ? true:false}  // tell previoud compleated page
                >
                    <Link to={index === 0 ? "/login/shipping" : (index === 1? "/order/confirm" : "/payment")}>
                        <StepLabel 
                            icon={item.icon}
                            style={{color: activeSteps >= index ? 'tomato': '#0007'}}
                        > {item.label}</StepLabel>
                    </Link>

                </Step>
            ))}
        </Stepper>
   </>
  )
}
