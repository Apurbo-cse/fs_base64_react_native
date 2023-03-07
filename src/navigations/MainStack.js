import { Flash, Login, SignUp } from "../screens";
import navigationStrings from "./navigationStrings";
import TabRoute from "./TabRoute";
import React from 'react';

export default function (Stack) {
    return (
    <>
        <Stack.Screen name={navigationStrings.TABROUTE} component={TabRoute} />
    </>
    )
}