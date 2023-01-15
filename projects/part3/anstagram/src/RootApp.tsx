import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { RootStackNavigation } from "./navigations/RootStackNavigation";
import { SplashView } from "./SplashView";
export const RootApp:React.FC =()=>{
    const [initialize, setInitialize] = useState(false);

    if(!initialize) 
        return (
            <SplashView
                onFinishLoad={()=> setInitialize(true)}
            />
        );


    return (
        <NavigationContainer>
            <RootStackNavigation/>
        </NavigationContainer>
    )
}