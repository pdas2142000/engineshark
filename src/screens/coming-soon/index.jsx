import React, { useState, useEffect } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import RNFetchBlob from "rn-fetch-blob";
import { ms } from "../../utils/helpers/Metrics";
import { useRoute } from "@react-navigation/native";

const CommingSoon = ({ navigation }) => {
    const [term, setTerm] = useState(null);
    const [states, setStates] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const {route} = useRoute()
    
    const searchForLLC = (term, state) => {
        const parameters = "llc=" + term + "&state=" + state;
        RNFetchBlob.fetch(
            "POST",
            "https://engineshark.com/welcome/check_llc",
            {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
            },
            parameters
        )
            .then((res) => {
                let response = JSON.parse(res.data);
                setIsAvailable(response.isAvailable);
                setLoaded(true);
            })
            .catch((errorMessage, statusCode) => {
                console.log(errorMessage);
            });
    };

    useEffect(() => {
        // const termParam = navigation.getParam("term", null);
        // const stateParam = navigation.getParam("state", null);

        // if (termParam !== term || stateParam !== states) {
        //     setTerm(termParam);
        //     setStates(stateParam);
        //     setLoaded(false);
        //     searchForLLC(termParam, stateParam);
        // }
    }, [navigation, term, states]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#385591" barStyle="dark-content" />
            <View style={styles.header}>
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        <View style={{ paddingLeft: width(2) }}>
                            {/* <Feather name="menu" size={totalSize(3.5)} color="black" /> */}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <View style={{ flexDirection: "row", marginTop: 7 }}>
                            {/* <Ionicons
                                    name="md-arrow-back"
                                    size={totalSize(2)}
                                    color="#385591"
                                /> */}
                            <Text
                                style={{
                                    color: "#385591",
                                    fontSize: totalSize(1.8),
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                }}
                            >
                                Back
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView decelerationRate={0.997}>
                <View
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        paddingVertical: height(2),
                    }}
                >
                    {/* <Image
                            source={require("../assets/logo.png")}
                            style={{ width: width(15) * 3.92, height: width(15) }}
                        /> */}
                    <Text
                        style={{
                            fontFamily: "Montserrat-Bold",
                            color: "black",
                            paddingVertical: height(1),
                            fontSize: totalSize(1.8),
                        }}
                    >
                        24/7 Sales & Support (480) 624-2500
                    </Text>
                </View>
                {loaded ? (
                    <View>
                        {isAvailable ? (
                            <View
                                style={{ paddingVertical: height(8), alignItems: "center" }}
                            >
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: totalSize(3),
                                        fontFamily: "Montserrat-Regular",
                                        paddingVertical: width(2),
                                        marginTop: height(3),
                                    }}
                                >
                                    Great news!
                                </Text>
                                <Text style={{ marginTop: height(2) }}>
                                    <Text
                                        style={{
                                            color: "black",
                                            textAlign: "center",
                                            fontSize: totalSize(2),
                                            fontFamily: "Montserrat-Bold",
                                            paddingVertical: height(1),
                                        }}
                                    >
                                        {term}
                                    </Text>{" "}
                                    <Text
                                        style={{
                                            color: "black",
                                            fontSize: totalSize(2),
                                            fontFamily: "Montserrat-Regular",
                                        }}
                                    >
                                        appears to be available*
                                    </Text>
                                </Text>
                                <Text
                                    onPress={() => {
                                        navigation.navigate("LLCsearch");
                                    }}
                                    style={{
                                        color: "black",
                                        fontSize: totalSize(2.3),
                                        fontFamily: "Montserrat-Regular",
                                        paddingVertical: width(2),
                                        marginTop: height(7),
                                    }}
                                >
                                    {/* <FontAwesome
                                            name="angle-double-left"
                                            size={totalSize(2.8)}
                                            color="black"
                                        /> */}
                                    back
                                </Text>
                            </View>
                        ) : (
                            <View style={{ paddingVertical: height(8), alignItems: "center" }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: totalSize(3),
                                        fontFamily: "Montserrat-Regular",
                                        paddingVertical: width(2),
                                        marginTop: height(3),
                                    }}
                                >
                                    Bad news!
                                </Text>
                                <Text style={{ marginTop: height(2) }}>
                                    <Text
                                        style={{
                                            color: "black",
                                            textAlign: "center",
                                            fontSize: totalSize(2),
                                            fontFamily: "Montserrat-Bold",
                                            paddingVertical: height(1),
                                        }}
                                    >
                                        {term}
                                    </Text>{" "}
                                    <Text
                                        style={{
                                            color: "black",
                                            fontSize: ms(2),
                                            fontFamily: "Montserrat-Regular",
                                        }}
                                    >
                                        appears to be not available*
                                    </Text>
                                </Text>
                                <Text
                                    onPress={() => {
                                        navigation.navigate("LLCsearch");
                                    }}
                                    style={{
                                        color: "black",
                                        fontSize: totalSize(2.3),
                                        fontFamily: "Montserrat-Regular",
                                        paddingVertical: width(2),
                                        marginTop: height(7),
                                    }}
                                >
                                    {/* <FontAwesome
                                            name="angle-double-left"
                                            size={totalSize(2.8)}
                                            color="black"
                                        />{" "} */}
                                    back
                                </Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={{ alignItems: "center", marginTop: height(5) }}>
                        <ActivityIndicator size="large" color="#385591" />
                        <Text
                            onPress={() => {
                                navigation.navigate("LLCsearch");
                            }}
                            style={{
                                color: "black",
                                fontSize: totalSize(2.3),
                                fontFamily: "Montserrat-Regular",
                                paddingVertical: width(2),
                                marginTop: height(7),
                            }}
                        >
                            {/* <FontAwesome
                                    name="angle-double-left"
                                    size={totalSize(2.8)}
                                    color="black"
                                />{" "} */}
                            back
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        height: height(5),
        backgroundColor: "white",
        justifyContent: "center",
    },
});

export default CommingSoon;
