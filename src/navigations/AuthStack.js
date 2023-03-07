import React from 'react';
import { Flash, Login, SignUp } from "../screens";
import navigationStrings from "./navigationStrings";

const AuthStack =(Stack) => {
    return (
    <>
        {/* <Stack.Screen name={navigationStrings.FLASH} component={Flash} /> */}
        <Stack.Screen name={navigationStrings.LOGIN} component={Login}  />
        <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
    </>
    )
}

export default AuthStack;