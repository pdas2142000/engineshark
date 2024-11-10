import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {  useForm } from 'react-hook-form'
import LeftArrowIcon from '../../../assets/icons/arrow-small-right.svg'
import { subcsribeformstyles } from '../../styles/subscribe-form-styles'
import CustomInput from '../form-utils/custom-input'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms, toast } from '../../utils/helpers/Metrics'
import { Colors } from '../../utils/constants'

const Banner = ({ title, content, type, text, img, styles }) => {

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(Schema)
    })

    const OnSubmit = async (data) => {
        if (data?.email && data.email.includes('@')) {
            try {
                const Response = await fetch('https://toolque-website.vercel.app/api/news-letter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                const ResponseData = await Response.json()

                if (ResponseData.error === 1) {
                    toast('success', {
                        title: ResponseData?.msg
                    })
                }
                reset()
            }
            catch (error) {

            }
        } else toast('error', { title: 'please enter valid email' })
    };

    return (
        <View>
            <ImageBackground source={img} style={styles.es_banner_img}>
                <View style={styles.overlay} />
                <View style={styles.es_banner_content}>
                    <Text style={styles.es_banner_title}>{title}</Text>
                    <Text style={[type === "subscribe" ? styles.es_banner_text : styles.es_banner_txt]}>{content}</Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    {
                        type === "subscribe" &&
                        <View style={styles.es_banner_input}>
                            {
                                FormBuilder(control).map((item, index) => {
                                    return (
                                        <CustomInput
                                            {
                                            ...item
                                            }
                                            key={index + 1}
                                        >
                                            <TouchableOpacity onPress={handleSubmit(OnSubmit)}>
                                                <LeftArrowIcon  {...IconProps(ms(25))} fill={Colors.es_black} />
                                            </TouchableOpacity>
                                        </CustomInput>
                                    )
                                })
                            }
                        </View>
                    }
                </View>
                <Text style={styles.es_banner_bottom_text}>{text}</Text>
            </ImageBackground>
        </View>
    )
}

export default Banner


export const FormBuilder = (control) => {
    return [
        {
            name: 'email',
            parent: 'user',
            control,
            label: false,
            type: 'text',
            styles: subcsribeformstyles
        },
    ]
}

export const Schema = yup.object().shape({
    email: yup
        .string()
});