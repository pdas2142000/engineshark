import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppHeader from '../../components/header/AppHeader'
import Formfields from '../../utils/models/Formfields.json'
import { LogoFont } from '../../utils/models/LogoFont'
import { LogoStyle } from '../../utils/models/LogoStyle'
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { hs, ms } from '../../utils/helpers/Metrics';
import CustomInput from '../../components/form-utils/custom-input';
import CustomSelectInput from '../../components/form-utils/custom-select-input';
import formStyles from '../../styles/form-styles';
import { PortalHost } from '@gorhom/portal';

const Logomaker = ({ navigation }) => {

    const { setValue, control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            style: [LogoStyle[0].title],
            fonts: [LogoFont[0].title],
        },
    });
    const [load, setLoad] = useState(false)
    const [LoadData, setLoadData] = useState(false)
    const [formdata, setFormData] = useState(null)
    const [Data, setData] = useState([])

    const Formbuilder = [
        {
            name: "name",
            parent: "logo_api_lite",
            styles: formStyles,
            control,
            type: "text",
            label: true,
        },
        {
            name: "style",
            parent: "logo_api_lite",
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
            name: "fonts",
            parent: "logo_api_lite",
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
    ]

    const onSubmit = async (data) => {
       
        setFormData(data)
        if(data){
             navigation.navigate("LogoCards", { data: data })
        }
        const styleFontId = {
            styleFontId: {
                styleId: LogoStyle.find((n) => n.title === data.style[0])?.fontId,
                fontId: LogoFont.find((n) => n.title === data.fonts[0])?.fontId,
            },
        };
       

        // const parameters = JSON.stringify(styleFontId);

        // const response = await RNFetchBlob.fetch(
        //     'POST',
        //     `https://engineshark.com/welcome/generate_logo?text=${data.name}&font=${styleFontId.styleFontId.fontId}&style=${styleFontId.styleFontId.styleId}`,
        //     {
        //         'Content-Type': 'application/json',
        //     },
        //     parameters
        // );

        // if (response.data) {
        //     setData(response?.data)
        //     setLoad(false)
           
        // }

    }

    return (
        <View style={styles.container}>
            <AppHeader
                {
                ...{
                    title: "Ai Logo Maker",
                    isBack: true,
                    navigation,

                }
                }
            />
            <ScrollView style={styles.es_main}>
                <View style={styles.es_maker_form}>
                    <View style={styles.es_lgmaker_img}>
                        <Image
                            source={require("../../../assets/images/logo-maker-output/logo.png")}
                            alt='ai logo'
                            style={styles.es_lgmaker_imgs}
                        />
                    </View>
                    <Text style={styles.es_lgmaker_title}>Logo Creation wizard</Text>
                    <View  style={styles.es_logo_form}>
                        {
                            Formbuilder.map((item, index) => {
                                return (
                                    <View key={index + 1}>
                                        {
                                            item.type === "text" && <CustomInput
                                                {...item}
                                            />

                                        }
                                        {
                                            item.type === "select" && <CustomSelectInput {...item} />
                                        }
                                    </View>
                                )
                            })
                        }
                     
                    </View>
                </View>
            </ScrollView>
                <View style={styles.es_lgmaker_btn}>
                    <TouchableOpacity style={styles.es_lgmaker_btn_block} onPress={handleSubmit(onSubmit)}>
                        {
                            load ? 
                            <ActivityIndicator size="small" color={Colors.es_white} />
                                :
                            <Text style={styles.es_lgmaker_text}>Generate Logo</Text>
                        }
                    </TouchableOpacity>
                </View>
            <PortalHost name="BottomSheetHost" />
        </View>
    )
}

export default Logomaker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.es_white
    },
    es_main:{
        flex:1,
        flexGrow:1
    },
    es_maker_form: {
        marginHorizontal: hs(15)
    },
    es_lgmaker_title: {
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(26),
        textAlign: "center",
        marginTop: hs(20),
        color:Colors.es_black,
    },
    es_lgmaker_img: {
        height: hs(290),
        width: "100%",
    },
    es_lgmaker_imgs: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: hs(10)
    },
    es_lgmaker_btn: {
        width: '100%',
        paddingHorizontal:ms(15),
    },
    es_lgmaker_text: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
    },
    es_lgmaker_btn_block: {
        borderRadius: hs(30),
        paddingVertical: hs(12),
        width: '100%',
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        alignItems: "center",
        marginBottom:ms(20),
        zIndex:-1
    },

})


const schema = yup.object().shape({
    name:
        yup.string().required(Formfields.logo_api_lite.name.errors.required),

    fonts:
        yup.mixed().required(Formfields.logo_api_lite.fonts.errors.required),

    style:
        yup.mixed().required(Formfields.logo_api_lite.style.errors.required)
})
