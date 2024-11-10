import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from '../../../assets/icons/menu-burger.svg'
import { IconProps } from "../../utils/helpers/Iconprops";

const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView />
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
                            <MenuIcon  {...IconProps(20)} />
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
                    <Image
                        source={require("../../../assets/images/logo.png")}
                        style={{ width: width(15) * 3.92, height: width(15) }}
                    />
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
                <View style={{ marginTop: height(2), padding: width(4) }}>
                    <View style={{ backgroundColor: "#f6f6f6" }}>
                        <Text
                            style={{
                                color: "#3B5998",
                                textAlign: "center",
                                fontSize: totalSize(3),
                                fontFamily: "Montserrat-Bold",
                                paddingVertical: height(4),
                            }}
                        >
                            About
                        </Text>
                        <Text style={styles.AboutText}>
                            Are you tired of going to multiple sites or wasting hours of
                            time to see if your name is available whether it be for business
                            or pleasure?
                        </Text>

                        <Text style={styles.AboutText}>
                            Do you want an easier way to claim your name or your company
                            brand name by going to one site only?
                        </Text>

                        <Text style={styles.AboutText}>
                            Engine Shark is your answer! We search the murky waters of the
                            Internet so you don’t have to. We simplify the process that will
                            take you hours into seconds. Whether it’s domain names, blog,
                            trademarks, communities, entertainment, microblogging, music,
                            news, photos, technology, travel, or videos, we have the answer
                            waiting for you in seconds.
                        </Text>

                        <Text style={styles.AboutText}>
                            Engine Shark has the cutting-edge technology that other search
                            engines envy and a world-class team to facilitate any of your
                            needs. We help beautify trademark infringement’s,
                            cybersquatting, misrepresentation of yourself or your brand.
                        </Text>

                        <Text style={styles.AboutText}>
                            Engine Shark is a total branding stop that specializes in making
                            your business ideas a reality! You start with searching your
                            business name and we offer to take it to fruition by
                            establishing your business entity, creating your company logo
                            and website, create and manage your social media accounts as
                            well. At Engine Shark, with over 100 years of combined business
                            experience, we know the struggles a new business endures, that
                            is why we are so passionate about your business venture and we
                            strive to ensure you start strong so you can focus on running
                            your business.
                        </Text>

                        <Text style={styles.AboutText}>
                            Engine Shark has just added a very helpful product line that
                            allows entrepreneurs to start their Corporation, LLC, or
                            proprietorship and help them navigate their dreams to a web
                            presence. We will develop a website that can explain the story
                            better than anyone and help you become the leader in your
                            industry.
                        </Text>

                        <Text style={styles.AboutText}>
                            We help entrepreneurs build their dreams. We take your vision
                            and create your business identity so you, as a business owner,
                            can focus on the core of your business.
                        </Text>

                        <Text style={styles.AboutText}>
                            We have created a very simplistic format to give your business a
                            strong start, to whisk your dreams in motion.
                        </Text>
                    </View>
                </View>
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
    AboutText: {
        color: "black",
        fontSize: totalSize(1.8),
        fontFamily: "Montserrat-Regular",
        paddingVertical: width(2),
        paddingHorizontal: width(4),
    },
});

export default AboutScreen;
