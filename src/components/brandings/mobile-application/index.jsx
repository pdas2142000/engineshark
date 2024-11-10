import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
import { hs, ms } from '../../../utils/helpers/Metrics';
import { Fonts, TitleFont } from '../../../utils/constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MobileAppPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.es_title_area}>
                    <View style={styles.es_space_block}>
                        <View style={styles.es_psm_img_block}>
                            <Image
                                source={require('../../../../assets/images/social-network.jpg')}
                                alt="Psm image"
                                style={styles.es_psm_img}
                            />
                        </View>
                        <Text style={styles.es_title}>App Names</Text>
                        <Text style={styles.es_text}>
                            There are more than 4 million apps combined in Googles Play Store  and the Apples App Store. The amount of apps already rivals the number
                            of domain name registrations in country code Top-Level-Domains.
                        </Text>
                    </View>
                </View>
                <View style={styles.es_space_block}>
                    <Text style={styles.es_text}>
                        Names hold power—they allow us to differentiate people, brands, products, and services. When names are unique within a system, they become even more valuable, like domain names, trademarks, vanity numbers, or usernames on social networks. In the digital world, visibility is everything. Just as Search Engine Optimization (SEO) is crucial for Google rankings, App Store Optimization (ASO) is essential for maximizing app visibility and discoverability.
                    </Text>
                    <Text style={styles.es_text}>
                        App store browsing and searches remain the primary ways users find new apps. Incorporating relevant keywords in your app’s title can significantly boost its visibility, making it easier for users to discover your app. The statistics speak volumes: 0.1% of all apps generate 50% of all downloads. This proves that the right keywords can make or break your app’s success.
                    </Text>
                    <Text style={styles.es_text}>
                        To optimize discoverability, your app title should include high-volume, low-competition, and highly relevant keywords. It's a balancing act, but when done correctly, it can dramatically increase app downloads. Keep in mind that users often employ different search strategies, ranging from brand names and functionality to inspiration and personal interests.
                    </Text>
                    <Text style={styles.es_text}>
                        At Engine Shark, we're actively analyzing trends in both the Google Play Store and the Apple App Store to ensure that your app is seen by the right audience. Understanding user search behavior is key, and we’re here to help your app rise above the competition.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default MobileAppPage

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },

    es_title_area: {
        backgroundColor: '#d4dbe8',
        paddingVertical: hs(40),
    },
    es_space_block: {
        marginHorizontal: hs(15),
    },
    es_space_block_text: {
        marginHorizontal: hs(15),
        marginTop: hs(35),
    },
    es_title_text: {
        fontFamily: TitleFont.Font_800,
        fontSize: ms(20),
        marginTop: hs(15),
        fontWeight: '600',
        marginBottom: hs(10),
    },
    es_psm_img_block: {
        height: hs(250),
        marginVertical: hs(15),
    },
    es_psm_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: hs(15),
    },
    es_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(27),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
    },
    es_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(19),
        marginVertical: hs(10),
        color: Colors.black,
    },
    es_text: {
        fontFamily: Fonts.Font_600,
        color: '#33494d',
        lineHeight: hs(27),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
    },
});

