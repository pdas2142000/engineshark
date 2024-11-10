import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import AppHeader from '../../components/header/AppHeader';
import SocialBrandSearch from '../../components/brandings/social-brand-search'
import Domains from '../../components/brandings/domains';
import TradeMark from '../../components/brandings/TradeMark'
import MobileAppPage from '../../components/brandings/mobile-application';
import MostPopular from '../../components/brandings/most-popular';

const BrandSearch = ({ navigation, route }) => {

    const data = route?.params?.trade;
    const searchText = route?.params?.searchText;
    const [isSelected, setIsSelected] = useState(data  || 'Social Networks');
    const [search, setSearch] = useState(null);

    useEffect(() => {
        if (searchText) {
            setIsSelected( searchText ? 'Domains' : 'Social Networks');
            setSearch(searchText);
        } 
        else {
            setIsSelected(data || 'Social Networks');
        }
    }, [searchText, data]);


    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    isBack: true,
                    navigation,
                    title: 'Brand search',

                }}
            />
            <ScrollView>
                <View style={styles.es_brand_block}>
                    <View style={styles.es_brand_btn_area}>
                        {Data.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index+1}
                                    onPress={() => setIsSelected(item?.btn_title)}
                                    style={[
                                        styles.es_brand_btn,
                                        isSelected === item.btn_title ? styles.es_active_btn : styles.es_inactive_btn,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.es_brand_btn_title,
                                            isSelected === item.btn_title ? styles.es_active_title : styles.es_inactive_text,
                                        ]}>
                                        {item.btn_title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View>
                        {Data.map((item, index) => {
                            if (isSelected === item.btn_title && item.searchData) {
                                return (
                                    <View key={index+1}>
                                        <Text style={styles.es_brand_main_title}>{item.searchData[0].title}</Text>
                                        <Text style={styles.es_brand_text}>
                                            {item.searchData[0].content}
                                        </Text>
                                    </View>
                                )
                            }
                          
                        })}
                    </View>
                </View>
                {
                    isSelected === "Social Networks" ? <SocialBrandSearch  {...{ search, setSearch }} /> : null
                }
                {
                    isSelected === "Domains" ? <Domains {...{ search, setSearch }} /> : null
                }
                {
                    isSelected === "Trademark" ? <TradeMark {...{ search, setSearch }} /> : null
                }
                {
                    isSelected === "Mobile Applications" ? <MobileAppPage /> : null
                }
                {
                    isSelected === "Most Popular" ? <MostPopular  {...{ search, setSearch }} /> : null
                }
            </ScrollView>
        </View>
    );
};

export default BrandSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },
    es_brand_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'Colors.es_blue',
        marginVertical: hs(10),
        borderRadius: hs(30),
        borderWidth: hs(0.9),
    },
    es_brand_btn_title: {
        paddingVertical: hs(10),
        paddingHorizontal: hs(16),
        color: Colors.black,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
    },
    es_active_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.es_blue,
        marginVertical: hs(10),
        borderRadius: hs(30),
        borderWidth: hs(0.9),
        backgroundColor: Colors.es_blue,
    },
    es_inactive_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hs(10),
        borderRadius: hs(30),
        borderColor: Colors.es_black,
        borderWidth: hs(0.9),
    },
    es_active_title: {
        paddingVertical: hs(10),
        paddingHorizontal: hs(16),
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
    },
    es_inactive_text: {
        paddingVertical: hs(10),
        paddingHorizontal: hs(16),
        color: Colors.es_black,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },
    es_brand_block: {
        backgroundColor: '#e9eef7',
        paddingTop: hs(20),
        paddingHorizontal: hs(10),
    },
    es_brand_main_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(45),
        textAlign: 'center',
        marginTop: hs(15),
        color: Colors.black,
    },
    es_brand_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(20),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
        textAlign: 'center',
    },
    es_brand_text_field: {
        marginHorizontal: hs(15),
    },
    es_content_area: {
        margin: hs(15),
    },
    es_content_title: {
        color: 'black',
        fontSize: ms(17),
        fontFamily: Fonts.Font_700,
        marginBottom: hs(10),
        lineHeight: hs(24),
    },

    es_brand_title: {
        fontSize: ms(28),
        fontFamily: Fonts.Font_600,
        marginVertical: hs(10),
        textAlign: 'center',
    },

    es_book_marking_block: {
        backgroundColor: '#f3f8ff',
        paddingVertical: hs(55),
        marginVertical: hs(30),
    },
    es_brand_bookmarketing: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    es_bookmarketing_img_border: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '31%',
        margin: '1%',
        borderRadius: hs(4),
        borderColor: '#e7e7e7',
        borderWidth: hs(2),
        backgroundColor: 'white',
        height: hs(50),
    },
    es_bookmarketing_logo: {
        height: hs(70),
        width: hs(90),
    },
    es_bookmarketing_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    es_cards_content_area: {
        marginHorizontal: hs(15),
        marginBottom: hs(30),
    },
    es_cards_title_area: {
        backgroundColor: '#f2f2f2',
        paddingVertical: hs(80),
        marginTop: hs(20),
    },
    es_cards_title: {
        color: 'black',
        fontSize: ms(20),
        fontFamily: Fonts.Font_700,
    },
    es_card_block_text: {
        color: Colors.es_lite_blue,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        paddingVertical: hs(15),
        lineHeight: hs(26),
    },
    es_marketing_block: {
        marginVertical: hs(45),
        marginHorizontal: hs(15),
    },
    es_marketing_title: {
        color: 'black',
        fontSize: ms(18),
        fontFamily: TitleFont.title_font_600,
        fontWeight: '600',
        textAlign: 'center',
    },
    es_marketing_cards: {
        marginHorizontal: hs(10),
    },
    es_marketing_card_title: {
        color: 'black',
        fontSize: ms(19),
        fontFamily: Fonts.Font_700,
        marginBottom: hs(11),
    },
    es_marketing_cards_data: {
        backgroundColor: '#f8f8f8',
        marginTop: hs(35),
        marginVertical: hs(20),
        padding: hs(25),
    },
    es_marketing_card_content: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(24),
        fontSize: ms(15),
    },
});

const Data = [
    {
        id: 1,
        btn_title: 'Social Networks',
        navigation: 'BrandSearch',
        searchData: [{
            title: "Social Networks",
            content: "  We search all of the murky waters of the internet so you do not have to.",
            placeholderText: "search for a new brand",
            btn: "SEARCH BRAND"
        }]
    },
    {
        id: 2,
        btn_title: 'Domains',
        navigation: 'Domains',
        searchData: [
            {
                title: "New .COMs Only $9.99!*",
                placeholderText: "search for a new domain",
                btn: "SEARCH DOMAIN"
            }
        ]
    },
    {
        id: 3,
        btn_title: 'Trademark',
        navigation: 'TradeMark',
        searchData: [
            {
                title: "Search of the USPTO Trademark Database",
                content: "Please enter a keyword to search in the USPTO trademark database",
                placeholderText: "search",
                btn: "SEARCH TRADEMARK"
            }
        ]
    },
    {
        id: 4,
        btn_title: 'Mobile Applications',
        navigation: 'MobileAppPage',
    },
    {
        id: 5,
        btn_title: 'Most Popular',
        navigation: 'MostPopular',
        searchData: [
            {
                title: "Most Popular",
                content: "  Enter your personal username or business brand name in the  entername here box above and click Search.",
                placeholderText: "search for brand",
                btn: "SEARCH BRAND"
            }
        ]
    },
];