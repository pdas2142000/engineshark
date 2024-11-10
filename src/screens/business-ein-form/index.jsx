import { View, Text, StyleSheet, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Formfields from '../../../src/utils/models/Formfields.json'
import formStyles from '../../styles/form-styles';
import AppHeader from '../../components/header/AppHeader';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { hs, ms } from '../../utils/helpers/Metrics';
import CustomInput from '../../components/form-utils/custom-input'

const BusinessForm = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const FormBuilder = [
        {
            name: 'reason',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'name',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'social_secuirity',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'contact',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'business_name',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'state',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
        {
            name: 'date',
            parent: 'employeeidentification',
            styles: formStyles,
            control,
            type: 'text',
            label: true
        },
    ]

    const onSubmit = (data) =>{
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <AppHeader
                {
                    ...{
                        title: "Business EIN",
                        isBack: true,
                        navigation: navigation
                    }
                }
            />
                <ScrollView  style={styles.es_ein_form}>
                    <View style={styles.es_ein_form_area}>
                        <Text style={styles.es_ein_title}>Apply for EIN</Text>
                        <View>
                            {
                                FormBuilder.map((item, index) => {
                                    return (
                                        <CustomInput  key={index+1} {...item}/>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.es_submit_btn_area}>
                            <TouchableOpacity
                                style={styles.es_submit_btn}
                                onPress={handleSubmit(onSubmit)}>
                                <Text style={styles.es_submit_btn_title}>Submit</Text>
                            </TouchableOpacity>
                         </View>
                    </View>
                </ScrollView>
        </View>
    )
}

export default BusinessForm


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.es_white,
        flex: 1,
    },
    es_ein_form:{
        flex:1,
        flexGrow:1
    },
    es_ein_form_area: {
        marginHorizontal: hs(15)
    },
    es_ein_title: {
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(20),
        marginVertical: hs(15),
        color: Colors.es_black
    },
    es_submit_btn_area: {
        flexDirection: 'column',
        alignItems: "flex-end",
        paddingBottom:ms(10)
    },
    es_submit_btn: {
        marginHorizontal: hs(20),
        paddingVertical: hs(12),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        borderRadius: hs(20),
        marginTop: hs(15)
    },
    es_submit_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 20,
        alignSelf: 'center',
    },
})
const schema = yup.object().shape(({
    reason:
        yup.string()
        .required(Formfields.employeeidentification.reason.errors.required)
        .max(40,Formfields.employeeidentification.reason.errors.maxLength.message)
        .min(3,Formfields.employeeidentification.reason.errors.minLength.message),

    name:
        yup.string()
        .required(Formfields.employeeidentification.name.errors.required)
        .max(30,Formfields.employeeidentification.name.errors.maxLength.message)
        .min(3,Formfields.employeeidentification.name.errors.minLength.message),

    social_secuirity:
        yup.string()
        .required(Formfields.employeeidentification.social_secuirity.error.required)
        .max(30,Formfields.employeeidentification.social_secuirity.error.maxLength.message)
        .min(3,Formfields.employeeidentification.social_secuirity.error.minLength.message),

    contact:
        yup.string()
        .nullable()
        .required(Formfields.employeeidentification.contact.errors.required)
        .max(10,Formfields.employeeidentification.contact.errors.maxLength.message)
        .min(10,Formfields.employeeidentification.contact.errors.minLength.message),

    business_name:
        yup.string()
        .required(Formfields.employeeidentification.business_name.error.required)
        .max(30,Formfields.employeeidentification.business_name.error.maxLength.message)
        .min(3,Formfields.employeeidentification.business_name.error.minLength.message),

    state: yup
        .string()
        .required(Formfields.employeeidentification.state.errors.required)
        .max(30,Formfields.employeeidentification.state.errors.maxLength.message)
        .min(3,Formfields.employeeidentification.state.errors.minLength.message),

}))