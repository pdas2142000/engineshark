
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './src/navigators/AppNavigation'
import { PortalProvider } from '@gorhom/portal'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message'

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const App = () => {
    return (
        <GestureHandlerRootView  style={{flex:1}}>
            <PortalProvider>
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </PortalProvider>
            <Toast
                {
                    ...{
                        topOffset: 50,
                        position: 'top',
                        keyboardOffset: 10,
                    }
                }
            />
        </GestureHandlerRootView>
    )
}

export default App