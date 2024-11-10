import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { LogoFont } from '../../utils/models/LogoFont';
import { LogoStyle } from '../../utils/models/LogoStyle';
import AppHeader from '../../components/header/AppHeader';
import Share from 'react-native-share';
import Formfields from '../../utils/models/Formfields.json';
import RNFetchBlob from 'rn-fetch-blob';
import CloseIcon from '../../../assets/icons/cross-circle.svg';
import { IconProps } from '../../utils/helpers/Iconprops';
import CustomSelectInput from '../../components/form-utils/custom-select-input';
import CustomInput from '../../components/form-utils/custom-input';
import formStyles from '../../styles/form-styles';
import { PortalHost } from '@gorhom/portal';
import ShareIcon from '../../../assets/icons/share.svg';

const LogoMakerCards = ({ navigation, route }) => {
    const { data } = route.params;

    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data?.name,
            style: [data?.style[0]],
            fonts: [data?.fonts[0]],
        },
    });

    const [Response, SetResponse] = useState(null);
    const [load, setLoad] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const onSubmit = async formData => {
        const styleFontId = {
            styleFontId: {
                styleId: LogoStyle.find(n => n.title === formData.style[0])?.fontId,
                fontId: LogoFont.find(n => n.title === formData.fonts[0])?.fontId,
            },
        };

        setLoad(true);

        const parameters = JSON.stringify(styleFontId);

        const response = await RNFetchBlob.fetch(
            'POST',
            `https://blog.engineshark.com/welcome/generate_logo?text=${data.name}&font=${styleFontId.styleFontId.fontId}&style=${styleFontId.styleFontId.styleId}`,
            {
                'Content-Type': 'application/json',
            },
            parameters,
        );

        const responseData = await response.json();

        if (responseData.data) {
            SetResponse(responseData?.data);
        }
        setLoad(false);
        setPopupVisible(false);
        reset(formData);
    };

    const fetchData = async () => {
        const styleFontId = {
            styleFontId: {
                styleId: LogoStyle.find(n => n.title === data.style[0])?.fontId,
                fontId: LogoFont.find(n => n.title === data.fonts[0])?.fontId,
            },
        };

        const parameters = JSON.stringify(styleFontId);

        setLoad(true);

        const response = await RNFetchBlob.fetch(
            'POST',
            `https://blog.engineshark.com/welcome/generate_logo?text=${data.name}&font=${styleFontId.styleFontId.fontId}&style=${styleFontId.styleFontId.styleId}`,
            {
                'Content-Type': 'application/json',
            },
            parameters,
        );

        const responseData = await response.json();

        if (responseData) {
            setLoad(false);
        }
        SetResponse(responseData.data);

        setValue('name', data.name);
        setValue('style', [data.style[0]]);
        setValue('fonts', [data.fonts[0]]);
    };

    const regenerateLogo = async () => {
        setLoad(true);

        const styleFontId = {
            styleFontId: {
                styleId: LogoStyle.find(n => n.title === watch('style')[0])?.fontId,
                fontId: LogoFont.find(n => n.title === watch('fonts')[0])?.fontId,
            },
        };

        const parameters = JSON.stringify(styleFontId);

        const response = await RNFetchBlob.fetch(
            'POST',
            `https://blog.engineshark.com/welcome/generate_logo?text=${data.name}&font=${styleFontId.styleFontId.fontId}&style=${styleFontId.styleFontId.styleId}`,
            {
                'Content-Type': 'application/json',
            },
            parameters,
        );

        const responseData = await response.json();

        if (responseData.data) {
            SetResponse(responseData.data);
        }
        setLoad(false);
    };

    const ShareImage = imageUri => {
        const shareOptions = {
            title: 'Share Logo',
            message: 'Check out this awesome logo!',
            url: imageUri,
        };
        Share.open(shareOptions);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openFilterPopup = () => {
        setPopupVisible(true);
    };

    const closeFilterPopup = () => {
        setPopupVisible(false);
    };

    const Formbuilder = [
        {
            name: 'name',
            parent: 'logo_api_lite',
            styles: formStyles,
            control,
            type: 'text',
            label: true,
        },
        {
            name: 'style',
            parent: 'logo_api_lite',
            formStyles: formStyles,
            control,
            type: 'select',
            label: true,
            data: LogoStyle,
            searchable: true,
            multi: false,
            show: false,
            setValue,
        },
        {
            name: 'fonts',
            parent: 'logo_api_lite',
            formStyles: formStyles,
            control,
            type: 'select',
            label: true,
            data: LogoFont,
            searchable: true,
            multi: false,
            show: false,
            setValue,
        },
    ];

    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    isBack: true,
                    navigation,
                    title: 'Ai Logos',
                }}
            />
            {load ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={Colors.es_blue} />
                </View>
            ) : (
                <ScrollView>
                    {
                        <View style={styles.es_logo_area}>
                            <View style={styles.es_logo_title_arbtnea}>
                                <View>
                                    <View style={styles.es_logo_reg_btn}>
                                        <TouchableOpacity
                                            style={styles.es_logo_btn}
                                            onPress={regenerateLogo}>
                                            <Text style={styles.es_btn_title}>Regenerate</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.es_logo_reg_btn}>
                                    <TouchableOpacity
                                        style={styles.es_logo_btn}
                                        onPress={openFilterPopup}>
                                        <Text style={styles.es_btn_title}>Filter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {Response?.map((item, index) => {
                                return (
                                    <View style={styles.es_logo_area}>
                                        <View style={styles.es_imgs} key={index + 1}>
                                            <Image
                                                source={{ uri: item.replace(/^http:/, 'https:') }}
                                                alt="logo"
                                                style={[styles.es_lgmaker_imgs]}
                                            />
                                        </View>
                                        <View style={styles.es_logo_saver}>
                                            <TouchableOpacity
                                                style={styles.es_logo_download_btn}
                                                onPress={() => ShareImage(item)}>
                                                <View>
                                                    <ShareIcon
                                                        {...IconProps(ms(10))}
                                                        fill={Colors.es_white}
                                                    />
                                                </View>
                                                <Text style={styles.es_logo_download_title}>Share</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    }
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={popupVisible}
                        onRequestClose={closeFilterPopup}>
                        <View style={styles.es_modalBackdrop}>
                            <View style={styles.es_modalContent}>
                                <TouchableOpacity
                                    onPress={closeFilterPopup}
                                    style={styles.es_popup_btn}>
                                    <CloseIcon {...IconProps(20)} fill={Colors.black} />
                                </TouchableOpacity>
                                <View>
                                    {Formbuilder.map((item, index) => {
                                        return (
                                            <View key={index + 1} style={{ zIndex: -1 }}>
                                                {item.type === 'text' && <CustomInput {...item} />}
                                                {item.type === 'select' && (
                                                    <CustomSelectInput {...item} />
                                                )}
                                            </View>
                                        );
                                    })}
                                    <View style={styles.es_lgmaker_btn}>
                                        <TouchableOpacity
                                            style={styles.es_lgmaker_btn_block}
                                            onPress={handleSubmit(onSubmit)}>
                                            {load ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={Colors.es_white}
                                                />
                                            ) : (
                                                <Text style={styles.es_lgmaker_text}>
                                                    Generate Logo
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <PortalHost name="BottomSheetHost" />
                    </Modal>
                </ScrollView>
            )}
        </View>
    );
};

export default LogoMakerCards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    es_logo_area: {
        backgroundColor: `rgb(248 248 248)`,
        padding: 30,
        position: 'relative',
    },
    es_logomaker_title: {
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(26),
    },
    es_imgs: {
        height: hs(220),
        width: '100%',
        marginBottom: hs(20),
    },
    es_lgmaker_imgs: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: hs(15),
    },
    es_logo_title_arbtnea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hs(20),
    },
    es_logo_reg_btn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: hs(10),
    },
    es_logo_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(10),
        paddingHorizontal: hs(30),
        backgroundColor: Colors.es_blue,
    },
    es_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    es_modalContainer: {
        marginHorizontal: hs(15),
        flex: 1,
    },
    es_modalContent: {
        backgroundColor: 'white',
        borderRadius: hs(6),
        position: 'relative',
        padding: hs(20),
    },
    es_popup_btn: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    es_lgmaker_btn_block: {
        borderRadius: hs(30),
        paddingVertical: hs(12),
        width: '100%',
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        alignItems: 'center',
    },
    es_lgmaker_text: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
    },
    es_lgmaker_btn: {
        width: '100%',
        padding: hs(10),
    },
    es_logo_download_btn: {
        borderRadius: hs(30),
        paddingVertical: hs(4),
        paddingHorizontal: hs(18),
        backgroundColor: Colors.es_blue,
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_logo_download_title: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        paddingLeft: hs(6),
    },
    es_logo_saver: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 45,
        top: 45,
    },
});

const schema = yup.object().shape({
    name: yup.string().required(Formfields.logo_api_lite.name.errors.required),

    fonts: yup.mixed().required(Formfields.logo_api_lite.fonts.errors.required),

    style: yup.mixed().required(Formfields.logo_api_lite.style.errors.required),
});

const images = [
    {
        imgs: 'https://reactnative.dev/img/tiny_logo.png',
    },
];
