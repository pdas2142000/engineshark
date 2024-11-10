import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    ImageBackground,
    Modal,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import AppHeader from '../../components/header/AppHeader';
import ServiceIconThree from '../../../assets/icons/K-pop band-rafiki.svg';
import CloseIcon from '../../../assets/icons/cross-circle.svg';
import { IconProps } from '../../utils/helpers/Iconprops';
import Formfields from '../../utils/models/Formfields.json';
import CustomInput from '../../components/form-utils/custom-input';
import formStyles from '../../styles/form-styles';
import { deviceType } from '../../utils/helpers/Metrics';

const HomeScreen = ({ navigation }) => {

    const { handleSubmit, control, formState: { error }, watch, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [businessName, setBusinessName] = useState('');
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('')

    const handleBusinessNameChange = text => {
        setBusinessName(text);
    };

    const handlePress = () => {
        if (businessName ) {
            navigation.navigate('BrandSearch', { searchText: businessName });
            setBottomSheetVisible(!bottomSheetVisible);
        }
    };

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const Formbuilder = [
        {
            name: 'email',
            parent: 'subscribe',
            label: false,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
    ];

    const onSubmit = data => {
        if (data) {
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    navigation,
                    isLogo: true,
                    isMenu: true,
                }}
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
                            <View style={styles.es_text_block}>
                                <TextInput
                                    style={styles.input}
                                    selectionColor={'black'}
                                    placeholder='CHECK AVAILABILITY OF YOUR BILLION DOLLAR NAME'
                                    placeholderTextColor={'#757575'}
                                    value={businessName}
                                    onChangeText={handleBusinessNameChange}
                                />
                            </View>
                            <View style={styles.es_start_btn_area}>
                                <TouchableOpacity
                                    style={styles.es_start_btn}
                                    onPress={handlePress}>
                                    <Text style={styles.es_start_btn_title}>GET STARTED</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.es_service}>
                    {services.map((item, index) => {
                        return (
                            <View
                                key={index + 1}
                                style={[
                                    styles.es_service_cards,
                                    item.id % 2 !== 0 ? styles.active_bg : null,
                                ]}
                            >
                                <View style={styles.es_services}>
                                    <View style={styles.es_service_imgs_area}>
                                        <Image source={item.imgs} style={styles.es_service_imgs} />
                                    </View>
                                    <Text style={styles.es_service_title}>{item.title}</Text>
                                    <Text style={styles.es_service_text}>{item.content}</Text>
                                    {
                                        item.title === "Domain Search" ? 
                                        <View style={styles.es_text_block}>
                                            <TextInput
                                                style={styles.input}
                                                selectionColor={'black'}
                                                placeholder={'SEARCH YOUR DONAIN'}
                                                placeholderTextColor={'#757575'}
                                                onChangeText={(text) => setSearch(text)}
                                                value={search}
                                            />
                                        </View> : null
                                    }
                               {item.btn ? (
                                    <View style={styles.es_service_btn_area}>
                                        <TouchableOpacity
                                            style={styles.es_service_btn}
                                            onPress={() => {
                                                if(item.title === 'Domain Search'){
                                                    if(search){
                                                        navigation.navigate(item.link,{searchText:search})
                                                    }
                                                }
                                                else {
                                                    navigation.navigate(item.link)
                                                }
                                            }}
                                        >
                                            <Text style={styles.es_service_btn_title}>
                                                {item.btn}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.es_business_bg_image}>
                    <View style={styles.es_business_block}>
                        <Text style={styles.es_busniess_count}>Engine Shark</Text>
                        <Text style={styles.es_business_text}>
                            The preferred choice for countless entrepreneurs embarking on their business ventures.
                        </Text>
                        <View style={styles.es_text_block}>
                            <TextInput
                                style={styles.input}
                                selectionColor={'black'}
                                placeholder={'Enter your business name'}
                                placeholderTextColor={'#757575'}
                                onChangeText={handleBusinessNameChange}
                            />
                        </View>
                        <View style={styles.es_start_btn_area}>
                            <TouchableOpacity
                                style={styles.es_start_btn}
                                onPress={handleSubmit}>
                                <Text style={styles.es_start_btn_title}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View style={styles.es_modalBackdrop}>
                        <View style={styles.es_modalContainer}>
                            <View style={styles.es_modalContent}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.es_popup_btn}>
                                    <CloseIcon {...IconProps(20)} fill={Colors.black} />
                                </TouchableOpacity>
                                <Text style={styles.es_popup_title}>
                                    Join us
                                </Text>
                                <View style={styles.es_text_filed}>
                                    {Formbuilder.map(val => {
                                        return <CustomInput {...val} key={val.name} />;
                                    })}
                                    <View
                                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.es_subscribe_btn}
                                            onPress={handleSubmit(onSubmit)}>
                                            <Text style={styles.es_subscribe_btn_title}>
                                                SUBSCRIBE
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_main: {
        flex: 1,
        flexGrow: 1,
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
        lineHeight: ms(56),
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
    es_service: {
        marginTop: hs(80),
    },
    es_service_cards: {
        marginTop: hs(20),
    },
    es_services: {
        marginHorizontal: hs(20),
        marginVertical: hs(40),
    },
    es_service_imgs_area: {
        height: hs(220),
        marginVertical: hs(20),
    },
    es_service_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: hs(20),
    },

    active_bg: {
        backgroundColor: '#f8f8f8',
        paddingVertical: hs(30),
    },
    es_service_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(40),
        fontWeight: '600',
        lineHeight: ms(43),
        color: Colors.es_black,
    },
    es_service_text: {
        fontFamily: Fonts.Font_400,
        fontSize: ms(16),
        marginTop: hs(15),
        marginBottom: hs(10),
        lineHeight: hs(23),
        color:Colors.es_dark_blue,
    },
    es_service_btn_area: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: hs(10),
    },
    es_service_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(14),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
    },
    es_service_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_bg_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_business_bg_image: {
        backgroundColor: Colors.es_sky_blue,
        paddingVertical: hs(40),
    },
    es_business_block: {
        padding: hs(10),
        justifyContent: 'center',
    },
    es_busniess_count: {
        fontSize: ms(40),
        fontFamily: Fonts.Font_600,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: hs(14),
    },
    es_business_text: {
        fontFamily: Fonts.Font_500,
        color: Colors.black,
        fontSize: ms(18),
        lineHeight: ms(29),
        textAlign: 'center',
    },
    es_modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    es_modalContainer: {
        marginHorizontal: hs(30),
    },
    es_popup_title: {
        marginHorizontal: hs(15),
        textAlign: 'center',
        color: Colors.es_black,
        fontSize: ms(26),
        fontWeight: '700',
        fontFamily: TitleFont.title_font_600,
    },
    es_modalContent: {
        backgroundColor: 'white',
        borderRadius: hs(6),
        position: 'relative',
        padding: hs(20),
        height: deviceType==='Tablet'? hs(200) : 'auto',
        marginHorizontal:deviceType==='Tablet'?ms(80):0
    },
    es_popup_btn: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    es_text_filed: {
        marginTop: hs(15),
    },
    es_subscribe_btn: {
        paddingVertical: hs(10),
        paddingHorizontal: hs(20),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        marginTop: hs(15),
        borderRadius: hs(20)
    },
    es_subscribe_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 20,
    },
});

const services = [
    {
        title: 'Domain Search',
        content: 'Welcome to Engine Shark, your go-to platform for securing the ideal web presence. Find, track, and claim your digital territory seamlessly.',
        imgs: require('../../../assets/images/domainsearch.jpg'),
        btn: 'SEARCH DOMAIN',
        link: 'BrandSearch'
    },
    {
        id: 1,
        imgs: require('../../../assets/images/showcasetwo.webp'),
        title: 'A True One Stop Shop',
        content:
            'Use our AI-powered tool to create a logo and style guide that’s the perfect match for your business. Get unlimited designs for social media and publish your digital business card, all branded with your logo and theme.',
        btn: 'GET STARTED',
        link: 'LogoDesign',
    },
    {
        id: 2,
        imgs: require('../../../assets/images/shocasethree.webp'),
        title: 'Get Your LLC',
        content:
            'Sleep easy at night knowing that your business and its assets are protected. We make it simple to register your business as an LLC and trademark your logo.',
        btn: 'START A LLC',
        link: 'BusinessCreation',
    },
    {
        id: 3,
        Icon: ServiceIconThree,
        imgs: require('../../../assets/images/showcasefour.webp'),
        title: 'Put Your Brand Out There',
        content:
            'Show up as an pro with printed business cards, t-shirts and branded merchandise that make your brand look official from day one.',
        btn: 'GET STARTED',
        link: 'BusinessCodeGenerator',
    },
    {
        id: 4,
        Icon: ServiceIconThree,
        title: 'Get Your QR Code',
        content:
            'Include your business name, phone number, and email address in the QR code. This makes it easy for potential customers to reach out to you.',
        imgs: require('../../../assets/images/business-qr-scanner.jpg'),
        btn: 'GET STARTED',
        link: 'BusinessCodeGenerator',
    },
];
const schema = yup.object().shape({
    email: yup
        .string()
        .required(Formfields.subscribe.email.errors.required)
        .email(Formfields.subscribe.email.errors.pattern.message),
});
