import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    ImageBackground,
} from 'react-native';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import Brandicon from '../../../assets/icons/brand.svg'

const BusinessCreationScreen = ({ navigation }) => {
    const [businessName, setBusinessName] = useState('');

    const handleBusinessNameChange = (text) => {
        setBusinessName(text);
    }

    const handleSubmit = () => {
        if (businessName) {
            navigation.navigate('BrandSearch', { searchText: businessName });
        }
    }

    return (
        <View style={styles.container}>
            <AppHeader
                {
                ...{
                    isBack: true,
                    navigation,
                    title: "Create Business"
                }
                }
            />
            <ScrollView style={styles.es_main}>
                <View style={styles.es_banner_area}>
                    <ImageBackground
                        source={require('../../../assets/images/bg-img.jpg')}
                        style={styles.es_baner_img}>
                        <View style={styles.es_overlay}>
                            <Text style={styles.es_banner_title}>
                                Launch your Business in Just a Few Clicks
                            </Text>
                            <Text style={styles.es_banner_text}>
                                All the tools you need to start your business and look
                                professional, in one place
                            </Text>
                            <View style={styles.es_text_block}>
                                <TextInput
                                    style={styles.input}
                                    selectionColor={'black'}
                                    placeholder={'CHECK AVAILABILITY OF YOUR BILLION DOLLAR NAME'}
                                    placeholderTextColor={'#757575'}
                                    value={businessName}
                                    onChangeText={handleBusinessNameChange}
                                />
                            </View>
                            <View style={styles.es_start_btn_area} >
                                <TouchableOpacity style={styles.es_start_btn} onPress={handleSubmit} >
                                    <Text style={styles.es_start_btn_title}>GET STARTED</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.es_title_area}>
                    <View style={styles.es_space_block}>
                        <View style={styles.es_psm_img_block}>
                            <Image
                                source={require('../../../assets/images/creative.webp')}
                                alt="Psm image"
                                style={styles.es_psm_img}
                            />
                        </View>
                        <Text style={styles.es_title_text}>Business creation</Text>
                        <Text style={styles.es_text}>
                            Engine Shark will guide you through the process of selecting the right entity for your business.
                            We will help you by registering your business appropriately,letting you focus on the core of your business.
                        </Text>
                    </View>
                </View>
                <View style={styles.es_space_block_text}>
                    {
                        Details.map((item, index) => {
                            return (
                                <View key={index + 1}>
                                    <Text style={styles.es_text}>{item.content}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.es_business_plans}>
                    <View style={styles.es_space_block}>
                        <Brandicon style={styles.es_barnd_logo} />
                        <View style={styles.es_business_block}>
                            {
                                BusinessCreationData.map((item, index) => {
                                    return (
                                        <View key={index + 1} style={styles.es_business_content}>
                                            <View style={styles.es_bullet_dot} />
                                            <Text style={styles.es_busness_plan_text}>{item.title}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                {CardsData.map((item, index) => {
                    return (
                        <View key={index + 1} style={styles.es_priceCard}>
                            <Text style={styles.es_priceCardTitle}>{item.title}</Text>
                            <Text style={styles.es_priceCardContent}>{item.text_one}</Text>
                            {
                                item.lists.map((val, index) => {
                                    return (
                                        <View key={index + 1} style={styles.es_price_card_content}>
                                            <View style={styles.es_priceCard_dot} />
                                            <View>
                                                <Text style={styles.es_priceCardContent}>{val.points}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style={styles.es_btn_area}>
                                <Text style={styles.es_priceCardPrice}>{item.price}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Web', { url: item.link })}>
                                    <View style={styles.es_add_cart_btn}>
                                        <Text style={styles.es_add_cart_btn_title}>
                                            {item.btn}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
                <View style={styles.es_title_area}>
                    <View style={styles.es_space_block}>
                        <View style={styles.es_psm_img_block}>
                            <Image
                                source={require('../../../assets/images/business-id.jpg')}
                                alt="qr image"
                                style={styles.es_psm_img}
                            />
                        </View>
                        <Text style={styles.es_title_text}>Apply For Your EIN</Text>
                        <Text style={styles.es_text}>
                            No matter the size or structure of your business, your EIN is the cornerstone for managing taxes, opening bank accounts, and ensuring smooth financial operations.
                        </Text>
                    </View>
                    <View style={styles.es_qr_btn}>
                        <TouchableOpacity style={styles.es_start_btn} onPress={() => navigation.navigate('BusinessIdNumber')}>
                            <Text style={styles.es_start_btn_title}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default BusinessCreationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_main: {
        flex: 1
    },
    es_baner_img: {
        height: hs(600),
    },
    es_bg_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    es_banner_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(40),
        color: Colors.es_white,
        marginHorizontal: hs(10),
        textAlign: 'center',
        lineHeight: ms(56)
    },
    es_banner_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_white,
        lineHeight: ms(25),
        fontSize: ms(17),
        marginVertical: hs(12),
        marginHorizontal: hs(10),
        textAlign: 'center',
    },
    es_text_block: {
        marginVertical: hs(15),
        marginHorizontal: hs(10),
    },
    input: {
        height: hs(55),
        fontFamily: Fonts.Font_600,
        backgroundColor: 'white',
        borderColor: '#d1d5db',
        borderWidth: hs(1),
        elevation: 2,
        width: '100%',
        borderRadius: hs(4),
        paddingLeft: hs(15),
        paddingRight: hs(15),
        fontSize: ms(16),
        zIndex: 1,
        color: 'black',
        marginBottom: hs(15),
    },
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    es_start_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(12),
        paddingHorizontal: hs(27),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 20,
    },
    es_banner_img_block: {
        height: hs(300),
    },
    es_banner_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_title_area: {
        backgroundColor: '#d4dbe8',
        paddingVertical: hs(40),
    },
    es_title_text: {
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(22),
        fontWeight: "600",
        color: Colors.black
    },
    es_space_block: {
        marginHorizontal: hs(15),
    },
    es_space_block_text: {
        marginHorizontal: hs(15),
        marginTop: hs(35),
    },
    es_psm_img_block: {
        height: hs(230),
        marginVertical: hs(15),
    },
    es_psm_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: hs(15),
    },
    es_text: {
        fontFamily: Fonts.Font_400,
        color: Colors.es_lite_blue,
        lineHeight: hs(29),
        fontSize: ms(17),
        width: '100%',
        marginVertical: hs(12),
    },
    es_business_block: {
        marginTop: hs(10)
    },
    es_business_plans: {
        backgroundColor: "#f3f8ff",
        marginTop: hs(30),
        paddingVertical: hs(60)
    },
    es_barnd_logo: {
        height: hs(300),
        width: '100%',
        maxHeight: hs(300),
        margin: 'auto',
        maxWidth: '100%',
    },
    es_business_content: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: hs(16),
    },
    es_bullet_dot: {
        backgroundColor: Colors.es_blue,
        height: hs(6),
        width: hs(6),
    },
    es_busness_plan_text: {
        fontFamily: Fonts.Font_500,
        color: Colors.es_lite_blue,
        fontSize: ms(17),
        paddingLeft: hs(7)
    },
    es_priceCard: {
        backgroundColor: Colors.es_white,
        zIndex: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        elevation: 2,
        borderRadius: hs(14),
        paddingVertical: hs(27),
        paddingHorizontal: hs(27),
        marginHorizontal: hs(15),
        marginVertical: hs(20),
    },

    es_priceCardTitle: {
        color: 'black',
        fontSize: ms(27),
        fontFamily: Fonts.Font_700,
        fontWeight: "600",
    },
    es_price_card_content: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: hs(20),
    },
    es_priceCardContent: {
        color: '#33494d',
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        lineHeight: hs(26),
        paddingLeft: hs(17),
    },
    es_priceCard_dot: {
        backgroundColor: Colors.es_blue,
        height: hs(6),
        width: hs(6),
        position: "absolute",
        top: hs(7),
    },
    es_btn_area: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    es_priceCardPrice: {
        color: Colors.es_blue,
        fontSize: ms(26),
        fontFamily: Fonts.Font_700,
        paddingVertical: hs(2),
        marginBottom: hs(13),
    },
    es_add_cart_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(10),
        paddingHorizontal: hs(24),
        backgroundColor: Colors.es_blue,
    },
    es_add_cart_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_qr_btn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
        zIndex: 20,
        marginHorizontal: hs(15)
    }
});

const BusinessCreationData = [
    {
        id: 1,
        title: 'What is your idea?'
    },
    {
        id: 2,
        title: 'Do you have a name?',
    },
    {
        id: 3,
        title: 'Do you need a business plan?'
    },
    {
        id: 4,
        title: 'What type of entity would you like to form?'
    },
    {
        id: 5,
        title: 'Do you have a logo? Do you have a website?'
    },
    {
        id: 6,
        title: 'Do you have social media?'
    },
];



const CardsData = [
    {
        id: 1,
        title: 'BRONZE',
        price: '$750',
        link: "https://buy.stripe.com/6oE032dWUae2ak0eUZ",
        ID: "3ANJA3MR3EN82",
        btn: 'Buy now',
        lists: [
            {
                id: 1,
                points: 'DBA Formed',
            },
            {
                id: 2,
                points: 'Custom Logo',
            },
            {
                id: 1,
                points: 'Page Website – 5 Templates to choose from',
            },
            {
                id: 3,
                points: 'Website Hosting',
            },
            {
                id: 4,
                points: 'Website Monitoring & Security with Unlimited Support',
            },
            {
                id: 5,
                points: '3 Company Ads',
            },
            {
                id: 6,
                points: '5 SE Submissions',
            },
            {
                id: 7,
                points: 'Local Telephone Number',
            },
        ]
    },
    {
        id: 2,
        title: 'SILVER',
        ID: '3P5HDETANUUL8',
        link: "https://buy.stripe.com/4gw6rq1a83PE63K3ci",
        lists: [
            {
                id: 1,
                points: 'Corporation Formed'
            },
            {
                id: 2,
                points: 'Custom Logo'
            },
            {
                id: 3,
                points: '15 Page Website 10 Templates to choose from'
            },
            {
                id: 4,
                points: 'Website Hosting'
            },
            {
                id: 5,
                points: 'Website Monitoring & Security with Unlimited Support'
            },
            {
                id: 6,
                points: 'Google Analytics'
            },
            {
                id: 7,
                points: 'Social  Media Accounts Created: FB, Instagram & Twitter'
            },
            {
                id: 8,
                points: 'HootSuite'
            },
            {
                id: 9,
                points: '5 Company Ads'
            },
            {
                id: 10,
                points: '25 SE Submissions'
            },
            {
                id: 11,
                points: 'Local Telephone Number / Vanity #'
            },
            {
                id: 12,
                points: 'Google My Business (Maps) Setup'
            },
            {
                id: 13,
                points: 'Business Credit Building'
            },
        ],
        price: '$1350',
        btn: 'Buy now',
    },
    {
        id: 3,
        title: 'GOLD',
        ID: "WPGJB9AKWZ9W4",
        link: "https://buy.stripe.com/aEU5nm0645XMgIo3cj",
        lists: [
            {
                id: 1,
                points: 'Choice of Corporation Formed'
            },
            {
                id: 2,
                points: 'Custom Logo'
            },
            {
                id: 3,
                points: '25 Page Website – 20 Templates to choose from'
            },
            {
                id: 4,
                points: 'Website Hosting'
            },
            {
                id: 5,
                points: 'Website Monitoring & Security with Unlimited Support'
            },
            {
                id: 6,
                points: 'Google Analytics'
            },
            {
                id: 7,
                points: 'Social Media Accounts Created: FB, Instagram & Twitter'
            },
            {
                id: 8,
                points: 'HootSuite'
            },
            {
                id: 9,
                points: 'Brand Monitoring'
            },
            {
                id: 10,
                points: '50 SE Submissions'
            },
            {
                id: 11,
                points: 'Local Telephone Number / Vanity #'
            },
            {
                id: 12,
                points: 'Google My Business (Maps) Setup'
            },
            {
                id: 13,
                points: 'Business Credit Building'
            },
            {
                id: 14,
                points: 'Business Credit Building$200 FB Advertising Allowance'
            }
        ],
        price: '$2500',
        btn: 'Buy now',
    },
]
const Details = [
    {
        id: 1,
        content: "Unleash the full potential of your business with Engine Shark's explosive Business Development Services. We don't just offer consultants; we provide a team of visionaries who are experts at elevating your business to the next level. We dive deep to understand your specific needs and tailor strategies that drive results. Whether you're looking to increase revenue, dominate your market, or take your business to new heights, Engine Shark is your partner every step of the way."
    },
    {
        id: 2,
        content: "From selecting the perfect business entity to ensuring your business is registered and ready to operate, we handle the heavy lifting so you can focus on what matters most—growing your business. Our talented team will craft a dynamic, responsive website that reflects your brand and meets your business goals. Need a mobile app to supercharge sales and enhance customer interaction? We’ve got you covered with cutting-edge development that puts your business in the fast lane."
    },
    {
        id: 3,
        content: "At Engine Shark, we're not just about development—we’re about revolutionizing how you do business. Together, we’ll create powerful strategies, set ambitious goals, and unlock new revenue streams, positioning your company for explosive growth. Let Engine Shark propel your business to the next level with the most effective and customized solutions in the industry!"
    },
]