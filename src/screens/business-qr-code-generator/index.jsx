import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import vCard from 'react-native-vcards'
import { launchImageLibrary } from 'react-native-image-picker'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Share from 'react-native-share'
import AppHeader from '../../components/header/AppHeader';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import formStyles from '../../styles/form-styles';
import Formfields from '../../../src/utils/models/Formfields.json';
import CustomInput from '../../components/form-utils/custom-input';
import UploadIcon from '../../../assets/icons/upload.svg'
import ShareIcon from '../../../assets/icons/share.svg'
import { IconProps } from '../../utils/helpers/Iconprops';

const BusinessQrCodeGenerator = ({ navigation }) => {
    const {
        handleSubmit,
        control,
        formState: { error },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })
    const [qrCodeText, setQrCodeText] = useState(undefined)
    const [logoImage, setLogoImage] = useState(null)
    const qrCodeRef = useRef(null)
  
    const onSubmit = async (data) => {
        try {
            await schema.validate(data);
            const contact = new vCard()
            contact.organization = data.name
            contact.email = data.username;
            contact.organization = data.company_name
            contact.workPhone = data.contact
            contact.homeAddress.street = data.street
            contact.homeAddress.city = data.city
            contact.homeAddress.stateProvince = data.state
            contact.homeAddress.postalCode = data.zip
            contact.homeAddress.countryRegion = data.country
            contact.url = data.website;
            const vCardString = contact.getFormattedString();
            setQrCodeText(vCardString);
        }
        catch (validationError) {
            console.error('Form data validation error:', validationError);
        }
    }
    const shareQRCode = async () => {
        if (qrCodeRef.current) {
            qrCodeRef.current.toDataURL((dataUrl) => {
                const urlToShare = `data:image/png;base64,${dataUrl}`
                const shareOptions = {
                    title: 'Share via',
                    message: `data:image/png;base64,${dataUrl}`,
                    url: urlToShare,
                }
                Share.open(shareOptions)
                .then((res) => {
                    console.log("Share result:", res);
                })
                .catch((err) => {
                    console.log("Share error:", err);
                });
            });
        } 
        else {
            console.log('QR code reference is not valid');
        }
    }

    const selectLogoImage = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        }
        try {
            const { didCancel, assets } = await launchImageLibrary(options);
            if (!didCancel && assets.length > 0) {
                setLogoImage(assets[0].uri);
            }
        } catch (error) {
            console.error('Image selection error:', error);
        }
    };

    const FormBuilder = [
        {
            name: 'company_name',
            parent: 'qr_generator',
            control,
            label: true,
            type: 'text',
            placeholder: true,
            styles: formStyles,
        },
        {
            name: 'contact',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'username',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'street',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'city',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'zip',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'state',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'country',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
        {
            name: 'website',
            parent: 'qr_generator',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: 'text',
        },
    ]

    const DownloadButtons = [
        {
            id: 1,
            title: "Sahre URL",
        },
    ]
    return (
        <View  style={{flex:1}}>
            <AppHeader
                {
                    ...{
                        title: 'Business QR',
                        isBack: true,
                        navigation: navigation,
                    }
                }
            />
            <ScrollView  styles={styles.container}>
                <View style={styles.es_qr_gen_block}>
                    <View style={styles.es_qr_data} >
                        {
                            <QRCode
                                id="qrCodeEl"
                                value={qrCodeText}
                                ecl='Q'
                                renderAs="svg"
                                logo={logoImage ? { uri: logoImage } : null}
                                logoHeight={40}
                                getRef={qrCodeRef}
                                logoWidth={40}
                                logoOpacity={0.8}
                                size={150}
                                eyeRadius={[
                                    {
                                        outer: [10, 10, 10, 10],
                                        inner: [0, 0, 0, 0],
                                    },
                                    {
                                        outer: [10, 10, 10, 10],
                                        inner: [0, 0, 0, 0],
                                    },
                                    {
                                        outer: [10, 10, 10, 10],
                                        inner: [0, 0, 0, 0],
                                    },
                                ]}
                            />
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.input_btn}
                        onPress={selectLogoImage}
                    >
                        <Text style={styles.input_btn_placeholder}>
                            {<Text style={styles.es_select_title}>Upload your Logo</Text>}
                        </Text>
                        <View style={styles.es_upload_btn}>
                            <UploadIcon {...IconProps(24)} fill={Colors.es_blue} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.es_download_btns}>
                        {
                            DownloadButtons.map((item, index) => {
                                return (
                                    <TouchableOpacity style={[styles.es_download_btn]} onPress={shareQRCode} key={index + 1}>
                                        <View style={styles.es_download_icon}>
                                            <ShareIcon  {...IconProps(18)} fill="white" />
                                        </View>
                                        <View>
                                            <Text style={[styles.es_btn_text]} >{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.input_filed_area}>
                    <Text style={styles.es_qr_form_title}>QR Code Generator</Text>
                    {FormBuilder.map(item => {
                        return <CustomInput {...item} key={item.name} />;
                    })}
                    <View style={styles.es_submit_btn_area}>
                        <TouchableOpacity
                            style={styles.es_submit_btn}
                            onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.es_submit_btn_title}>Generate QR Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default BusinessQrCodeGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    es_qr_gen_block: {
        borderWidth: ms(1.7),
        borderColor:'#e1e1e1',
        marginHorizontal: hs(15),
        padding: hs(20),
        borderRadius: hs(10),
        backgroundColor: 'white',
        marginTop: hs(30),
        paddingVertical: hs(45)
    },
    es_qr_data: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    es_select_title: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
        color: Colors.es_blue,
    },
    es_download_btns: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '102%',
        marginLeft: '-1%',
    },
    es_active_btn: {
        backgroundColor: Colors.es_white,
        borderColor: Colors.es_blue,
        borderWidth: hs(1.3)
    },
    es_download_btn: {
        backgroundColor: Colors.es_blue,
        flexDirection: 'row',
        alignItems:"center",
        width: "100%",
        paddingHorizontal: hs(15),
        paddingVertical: hs(13),
        borderRadius: hs(10),
        justifyContent: "center",
    },
    es_active_btn_text: {
        color: "black",
        fontFamily: Fonts.Font_600,
        fontSize: ms(14)
    },
    es_download_icon: {
        paddingRight: hs(10)
    },
    es_btn_text: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(14)
    },
    es_file_title: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(11),
        color: "#c4c3d6",
        alignSelf: "center",
    },
    input_btn: {
        borderRadius: hs(4),
        paddingHorizontal: hs(16),
        height: ms(45),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f8f8f8",
        marginVertical: hs(25)
    },
    input_btn_placeholder: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,

    },
    input_btn_text: {
        color: Colors.pp_black,
    },
    input_filed_area: {
        backgroundColor: 'white',
        marginHorizontal: hs(15),
        padding: hs(20),
        marginVertical: hs(40),
        borderRadius: hs(15),
        borderColor: '#e1e1e1',
        borderWidth: hs(1.7),
    },
    es_qr_form_title: {
        fontFamily: TitleFont.title_font_800,
        color: Colors.black,
        fontSize: ms(32),
        marginVertical: hs(15),
    },
    es_submit_btn_area: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    es_submit_btn: {
        paddingVertical: hs(12),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        borderRadius: hs(20),
        marginTop: hs(15),
    },
    es_submit_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 20,
        alignSelf: 'center',
    },
    es_upload_btn: {
        paddingLeft: hs(15)
    }
});

const schema = yup.object().shape({
    company_name: yup
        .string()
        .required(Formfields.qr_generator.company_name.errors.required)
        .max(40, Formfields.qr_generator.company_name.errors.maxLength.message)
        .min(3, Formfields.qr_generator.company_name.errors.minLength.message),

    contact: yup
        .string()
        .nullable()
        .required(Formfields.qr_generator.contact.errors.required)
        .max(10,Formfields.qr_generator.contact.errors.maxLength.message)
        .min(10,Formfields.qr_generator.contact.errors.minLength.message),
      

    username: yup
        .string()
        .required(Formfields.tools.username.errors.required)
        .email(Formfields.tools.username.errors.pattern.message),

    street: yup
        .string()
        .required(Formfields.qr_generator.street.errors.required)
        .max(40, Formfields.qr_generator.street.errors.maxLength.message)
        .min(3, Formfields.qr_generator.street.errors.minLength.message),

    city: yup
        .string()
        .required(Formfields.qr_generator.city.errors.required)
        .max(40, Formfields.qr_generator.city.errors.maxLength.message)
        .min(3, Formfields.qr_generator.city.errors.minLength.message),

    zip: yup.string()
    .required(Formfields.qr_generator.zip.errors.required)
    .max(8, Formfields.qr_generator.zip.errors.maxLength.message)
    .min(3, Formfields.qr_generator.zip.errors.minLength.message),

    state: yup
        .string()
        .required(Formfields.qr_generator.state.errors.required)
        .max(40, Formfields.qr_generator.state.errors.maxLength.message)
        .min(3, Formfields.qr_generator.state.errors.minLength.message),

    country: yup
        .string()
        .required(Formfields.qr_generator.country.errors.required)
        .max(40, Formfields.qr_generator.country.errors.maxLength.message)
        .min(3, Formfields.qr_generator.country.errors.minLength.message),

    website: yup
        .string()
        .required(Formfields.qr_generator.website.errors.required)
        .max(40, Formfields.qr_generator.website.errors.maxLength.message)
        .min(3, Formfields.qr_generator.website.errors.minLength.message),
});
