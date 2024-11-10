import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    BackHandler,
    StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { width, height } from "react-native-dimension";
import * as Progress from "react-native-progress";
import AppHeader from "../../components/header/AppHeader";

const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
var sheet = document.createElement('style');
sheet.innerHTML = "body{-webkit-user-select: none;}";
document.head.appendChild(sheet); `;

const TestScreen = ({ navigation,route }) => {
    const WEBVIEW_REF = useRef(null);
    const [visible, setVisible] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        const handleBackButton = () => {
            if (canGoBack) {
                WEBVIEW_REF.current.goBack();
                return true;
            } else {
                navigation.goBack("Home");
            }
        };

        BackHandler.addEventListener("hardwareBackPress", handleBackButton);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
        };
    }, [canGoBack, navigation]);

    const hideSpinner = () => {
        setVisible(false);
    };

    const showSpinner = () => {
        setVisible(true);
    };

    const onNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
    };

 
    return (
        <View style={styles.container}>
            <AppHeader
                 {...{
                    isBack: true,
                    navigation,
                    title: "Engineshark"
                }}
            />
            <StatusBar backgroundColor="#385591" barStyle="dark-content" />
            {visible && (
                <Progress.Bar
                    indeterminate
                    width={width(100)}
                    borderRadius={2}
                    borderWidth={0}
                    color={"#344e86"}
                    height={2}
                />
            )}
            <WebView
                ref={WEBVIEW_REF}
                onLoad={hideSpinner}
                onLoadStart={showSpinner}
                source={{ uri: "https://sso.godaddy.com/login" }}
                onNavigationStateChange={onNavigationStateChange}
                injectedJavaScript={INJECTEDJAVASCRIPT}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
});

export default TestScreen;
