import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Formfields from '../../utils/models/Formfields.json';
import CustomInput from '../form-utils/custom-input';
import formStyles from '../../styles/form-styles';
import RightArrow from '../../../assets/icons/arrow-small-right.svg'
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts } from '../../utils/constants';
import RNFetchBlob from 'rn-fetch-blob';

const ReportIdPopup = ({ setPopup }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        const response = await RNFetchBlob.fetch("POST", `https://engineshark.com/welcome/verify_invoice?invoice=${data.invoice_number}`)

        const responseData = await response.json()

        if (responseData.date === false) {
            setPopup(false)
        }
        else {
            setPopup(true)
        }

        reset()
    };


    const FormBuilder = [
        {
            name: 'invoice_number',
            parent: 'invoice',
            control,
            label: true,
            type: 'text',
            placeholder: true,
            styles: formStyles,
            Icon: RightArrow
        },
    ]

    return (
        <View style={{ marginRight: hs(15) }}>
            {FormBuilder.map(item => {
                if (item.type === 'text') {
                    return (
                        <View style={styles.es_report_form}>
                            <CustomInput
                                {...item}
                                key={item.name}
                                onSubmit={handleSubmit(onSubmit)}
                            />
                        </View>
                    );
                }
            })}
            <View style={styles.es_business_report}>
                <Text style={styles.es_border_right}></Text>
                <Text style={{ marginHorizontal: hs(6) }}>OR</Text>
                <Text style={styles.es_border_left}></Text>
            </View>
            <Text style={styles.es_price_optional_text}>Buy Packages</Text>
            <View style={styles.es_report_pricing}>
                <View style={styles.es_report_price_detail}>
                    <TouchableOpacity style={styles.es_report_btn}>
                        <Text style={styles.es_price_text}>$20/month</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.es_report_price_detail}>
                    <TouchableOpacity style={styles.es_report_btn}>
                        <Text style={styles.es_price_text}>$150/month</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ReportIdPopup;

const schema = yup.object().shape({
    invoice_number: yup
        .string()
        .required(Formfields.invoice.invoice_number.errors.required),
});

const styles = StyleSheet.create({
    es_business_report: {
        marginHorizontal: hs(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hs(20)
    },
    es_report_btn: {
        borderRadius: hs(30),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        paddingHorizontal: hs(20),
        paddingVertical: hs(12)
    },
    es_border_right: {
        backgroundColor: Colors.es_black_lgt,
        height: hs(1.2),
        width: "45%",
    },
    es_border_left: {
        backgroundColor: Colors.es_black_lgt,
        height: hs(1.2),
        width: "45%",

    },
    es_report_pricing: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '102%',
        marginLeft: '-1%'
    },
    es_report_price_detail: {
        flexDirection: "column",
        alignItems: "center",
        width: '48%',
        margin: '1%',
        padding: hs(10),

    },
    es_price_text: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
    },
    es_price_optional_text: {
        marginBottom: hs(10),
        fontFamily: Fonts.Font_600,
        textAlign: "center",
        fontSize: ms(20),
        marginTop: hs(20)
    },
    es_business_aitool: {
        marginHorizontal: hs(15),
        fontSize: ms(14)
    },
})