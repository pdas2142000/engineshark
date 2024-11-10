import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Formfields from '../../../src/utils/models/Formfields.json';
import CustomInput from '../../components/form-utils/custom-input';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';

import ImagePicker from '../../components/form-utils/image-picker';
import formStyles from '../../styles/form-styles';

const AddToolForm = ({ navigation }) => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        console.log(data);
        reset();
    };
    const FormBuilder = [
        {
            name: 'avatar',
            parent: 'tools',
            control,
            label: true,
            type: 'ImagePicker',
            placeholder: true,
            styles: formStyles,
        },
        {
            name: 'toolname',
            parent: 'tools',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: "text"
        },
        {
            name: 'description',
            parent: 'tools',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: "text"
        },
        {
            name: 'username',
            parent: 'tools',
            label: true,
            control,
            placeholder: true,
            styles: formStyles,
            type: "text"
        },
    ];

    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    title: 'Add AI Tools',
                    isBack: true,
                    navigation: navigation
                }}
            />
            <ScrollView>
                <View style={styles.input_filed_area}>
                    <Text style={styles.es_ai_toolform_title}>Submit Tool to Ai Experts</Text>
                    {FormBuilder.map(item => {
                        if (item.type === 'text') {
                            return (
                                <CustomInput
                                    {...item}
                                    key={item.name}
                                />
                            )
                        } else if (item.type === 'ImagePicker') {
                            return (
                                <ImagePicker
                                    {...item}
                                    key={item.name}
                                />
                            )
                        }
                    })}
                </View>
                <View style={styles.es_submit_btn_area}>
                    <TouchableOpacity
                        style={styles.es_submit_btn}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.es_submit_btn_title}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
export default AddToolForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.es_white
    },
    es_ai_toolform_title: {
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(20),

        marginVertical: hs(15),
        color: Colors.es_black
    },
    es_submit_btn_area: {
        flexDirection: 'column',
        alignItems: "flex-end",
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
    input_filed_area: {
        marginHorizontal: hs(15),
    },
});
const schema = yup.object().shape({

    avatar: yup.mixed(),

    toolname: yup.string().required(Formfields.tools.toolname.errors.required),

    description: yup
        .string()
        .required(Formfields.tools.description.errors.required)
        .max(40, Formfields.tools.description.errors.maxLength.message)
        .min(3, Formfields.tools.description.errors.minLength.message),

    username: yup
        .string()
        .required(Formfields.tools.username.errors.required)
        .email(Formfields.tools.username.errors.pattern.message),
});
