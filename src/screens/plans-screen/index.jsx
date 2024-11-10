import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms } from '../../utils/helpers/Metrics';
import CheckIcon from '../../../assets/icons/checked.svg';
import Crossicon from '../../../assets/icons/cross-circle.svg';
import { IconProps } from '../../utils/helpers/Iconprops';
import RNFetchBlob from 'rn-fetch-blob';


const PlansScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params.select;
    const search = route.params.search;
    const selecData = route.params.selectBg;
    const [searchData, setSearchdata] = useState(search);
    const [domains, setDomains] = useState(PlansData);
    const [resultFetched, setResultFetched] = useState(false);
    const [trademarkAvailable, setTrademarkAvailable] = useState(false);
    const [searchedFor, setSearchedFor] = useState(null);
    const availability = route.params.availbaleLLC?.isAvailable;

    const fetchData = async () => {

        const socialMediaData = PlansData.map(item => item?.SocilaMedia?.map(val => ({
            name: val.title,
            link: searchData,
        }))).flat();

        const parameters = 'data=' + JSON.stringify(socialMediaData);

        setIsLoading(true)

        const response = await RNFetchBlob.fetch(
            'POST',
            'https://blog.engineshark.com/welcome/check_availability_bulk',
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            parameters,
        );

        const responseDataArray = await response.json();

        const updatedDomains = PlansData.map((item, index) => {
            if (item.SocilaMedia) {
                return {
                    ...item,
                    SocilaMedia: item.SocilaMedia.map(val => ({
                        ...val,
                        result: true,
                        availability: responseDataArray
                            ? responseDataArray.find(
                                responseItem => responseItem[val.title] === 'true',
                            )
                            : false,
                    })),
                };
            } else {
                return item;
            }
        });

        setIsLoading(false)
        setDomains(updatedDomains);

    };

    const checkTradeMarkAvailability = async () => {
        const parameters = 'username=' + searchData;
        setResultFetched(true);
        const response = await RNFetchBlob.fetch(
            'POST',
            'https://engineshark.com/check_trademark',
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            parameters,
        );
        const data = await response.json();
        if (selecData.includes('Trademark')) {
            if (data.count === 0) {
                setTrademarkAvailable(true);
                setSearchedFor(searchData);
            } else {
                setTrademarkAvailable(false);
            }
        } 
        else {
            setTrademarkAvailable(false);
        }
    };

    useEffect(() => {
        fetchData();
        checkTradeMarkAvailability();
    }, [searchData]);

    const filteredPlansData = domains.filter(item =>
        data.some(selectedItem => selectedItem.title === item.title),
    );

    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    navigation,
                    title: 'Plans',
                    isBack: true,
                }}
            />
            {isLoading ? (
                <View style={styles.es_plans_block}>
                    <ActivityIndicator color={Colors.es_blue} size="large" />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.es_palns_space_area}>
                        <View style={styles.es_card_title_area}>
                            <Text style={styles.es_card_title}>
                                Craftnotion Business Plans
                            </Text>
                        </View>
                        <View style={styles.es_services}>
                            {filteredPlansData.map((item, index) => {
                                return (
                                    <View style={styles.es_service_card} key={index + 1}>
                                        <View style={styles.es_services_space_area}>
                                            <View style={styles.es_services_text_area}>
                                                <View>
                                                    <Text style={styles.es_services_text}>
                                                        {index + 1}. {item?.title}
                                                    </Text>
                                                </View>
                                                <View style={styles.es_start_btn_area}>
                                                    <TouchableOpacity style={styles.es_start_btn} onPress={() => navigation.navigate(item.link, { url: `https://www.secureserver.net/products/domain-registration/find?plid=528853&domainToCheck`, trade: item.title === 'Trademark' ? "Trademark" : item.link })}>
                                                        <Text style={styles.es_start_btn_title}>
                                                            {item.btn}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.es_card_media_titles}>
                                                {item?.SocilaMedia
                                                    ? item?.SocilaMedia?.map(val => {
                                                        return (
                                                            <View
                                                                style={styles.es_media_text_area}
                                                                key={val.id}>
                                                                <View>
                                                                    {val.availability ? (
                                                                        <CheckIcon
                                                                            {...IconProps(13)}
                                                                            fill="rgb(199 208 179)"
                                                                        />
                                                                    ) : (
                                                                        <Crossicon
                                                                            {...IconProps(13)}
                                                                            fill="#ff716a"
                                                                        />
                                                                    )}
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.es_media_text}>
                                                                        {val.text}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                    : item.title === 'Start LLC' && (
                                                        availability ? (
                                                            <View style={styles.es_media_text_area}>
                                                                <CheckIcon
                                                                    {...IconProps(13)}
                                                                    fill="rgb(199 208 179)"
                                                                />
                                                                <Text style={styles.es_media_text}>Great news!
                                                                    {search} appears to be available*
                                                                </Text>
                                                            </View>
                                                        ) : (
                                                            <View style={styles.es_media_text_area}>
                                                                <Crossicon
                                                                    {...IconProps(13)}
                                                                    fill="#ff716a"
                                                                />
                                                                <Text style={styles.es_media_text}> Great news!
                                                                    {search} appears to be not available*
                                                                </Text>
                                                            </View>
                                                        )
                                                    )}
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        {
                            <View>
                                {!resultFetched ? (
                                    <View style={styles.es_message_alert_area}>
                                        <Text style={styles.es_alert_msg_text}>
                                            Please enter a keyword to search in the USPTO trademark
                                            database
                                        </Text>
                                    </View>
                                ) : (
                                    <View>
                                        {trademarkAvailable ? (
                                            <View style={styles.es_message_alert_area}>
                                                <Text style={styles.es_alert_msg_text}>
                                                    The name you searched for,
                                                    <Text style={styles.es_toast_text}>
                                                        {searchedFor}
                                                    </Text>
                                                    , is not located in the USPTO database! This means
                                                    that no one else has trademarked the term{' '}
                                                    {searchedFor}... yet! You can
                                                    <TouchableOpacity onPress={() => navigation.navigate('Web', { url: "https://www.uspto.gov/" })}>
                                                        <Text style={styles.es_web_link}>Register</Text>
                                                    </TouchableOpacity>
                                                    it now for only $158 + the standard $325 USPTO Filing
                                                    Fee.
                                                </Text>
                                            </View>
                                        ) : selecData.includes('Trademark') ? (
                                            <View style={styles.es_message_alert_area}>
                                                <Text style={styles.es_alert_msg_text}>
                                                    Sorry, your Trademark is Not Available!
                                                </Text>
                                            </View>
                                        ) : null}
                                    </View>
                                )}
                            </View>
                        }
                    </View>
                </ScrollView>
            )}
        </View>
    );
};


export default PlansScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.es_sky_blue,
    },
    es_plans_block: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    es_palns_space_area: {
        marginHorizontal: hs(15),
    },
    es_card_title_area: {
        backgroundColor: Colors.es_blue,
        borderRadius: 5,
        padding: hs(15),
        marginTop: hs(20),

    },
    es_card_title: {
        color: Colors.es_white,
        fontSize: ms(19),
        fontFamily: TitleFont.title_font_800,
    },
    es_plans_loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    es_services: {
        marginTop: hs(20),
        backgroundColor: Colors.es_white,
        borderRadius: hs(10),
    },
    es_service_card: {
        paddingVertical: hs(13),
        borderBottomWidth: hs(0.7),
        borderColor: '#dedede',
    },
    es_services_space_area: {
        paddingHorizontal: hs(17),
    },
    es_services_text_area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    es_services_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(15),
        color: Colors.black,
    },
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    es_start_btn: {
        borderRadius: hs(6),
        paddingVertical: hs(6),
        paddingHorizontal: hs(9),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(11),
        zIndex: 20,
    },
    es_card_media_titles: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    es_media_text_area: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: hs(5),
    },
    es_media_text: {
        fontFamily: Fonts.Font_400,
        fontSize: ms(13),
        paddingLeft: hs(5),
    },
    es_message_alert_area: {
        backgroundColor: Colors.es_blue,
        borderRadius: 5,
        padding: hs(15),
        marginVertical: hs(20),
    },
    es_alert_msg_text: {
        lineHeight: ms(23),
        color: Colors.es_white,
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
    },
    es_web_link: {
        fontFamily: Fonts.Font_700,
        color: '#007bff',
        fontSize: ms(15),
        textAlign: "center",
        paddingHorizontal: hs(6)
    },

});

const PlansData = [
    {
        id: 1,
        title: 'Domain',
        btn: 'Get Started',
        link: "Web",
        SocilaMedia: [
            {
                id: 1,
                text: '.info',
                title: 'info',
                result: false,
                availability: false,
            },
            {
                id: 2,
                text: '.com',
                title: 'com',
                result: false,
                availability: false,
            },
            {
                id: 3,
                text: '.org',
                title: 'org',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 2,
        title: 'Trademark',
        link: "BrandSearch",
        btn: 'Get Started',
    },
    {
        id: 3,
        title: 'Website',
        btn: 'Get Started',
        link: "BusinessCreation",
    },
    {
        id: 4,
        title: 'Business Name',
        btn: 'Get Started',
        link: "BusinessCreation",
    },
    {
        id: 5,
        title: 'Social Media',
        btn: 'Get Started',
        link: "BrandSearch",
        SocilaMedia: [
            {
                id: 1,
                text: 'Facebook',
                title: 'Facebook',
                result: false,
                availability: false,
            },
            {
                id: 2,
                text: 'Linkedin',
                title: 'Linkedin',
                result: false,
                availability: false,
            },
            {
                id: 3,
                text: 'Youtube',
                title: 'Youtube',
                result: false,
                availability: false,
            },
            {
                id: 4,
                text: 'Instagram',
                title: 'Instagram',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 6,
        title: 'Logo',
        btn: 'Get Started',
        link: "LogoDesign",
    },
    {
        id: 7,
        title: "Start LLC",
        btn: 'Get Started',
        link: "BusinessCreation"
    },
    {
        id: 8,
        title: "QrCode",
        btn: 'Get Started',
        link: "BusinessCodeGenerator"
    },
    {
        id: 9,
        title: "AiTools",
        btn: 'Get Started',
        link: "BusinessAiTools"
    }

];
