import React, { Children } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Formfields from '../../../utils/models/Formfields.json';
import { Controller } from 'react-hook-form';
import { IconProps } from '../../../utils/helpers/Iconprops';
import { Colors } from '../../../utils/constants';


const CustomInput = ({ name, parent, control, type, label, styles, Icon,  onSubmit, children }) => {

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <View style={styles.input_wrap}>
                        {label ? (
                            <Text style={styles.input_label}>{FieldName?.label}</Text>
                        ) : null}
                        <View
                            style={[
                                styles.input_field_wrap,
                                type == 'textarea' ? styles.input_field_wrap_lg : null,
                            ]}>
                            <TextInput
                                placeholder={FieldName?.placeholder}
                                value={value || ''}
                                style={[styles.input_field]}
                                onBlur={onBlur}
                                onFocus={onBlur}
                                onChangeText={onChange}
                                placeholderTextColor="#8f8f91"
                                autoCapitalize='none'
                                multiline={type == "textarea" ? true : false}
                            />
                            {
                               Icon && <TouchableOpacity style={styles.es_form_icon} onPress={()=>onSubmit()}>
                                    {
                                        Icon ? <Icon {...IconProps(25)} fill={Colors.es_white} /> : null
                                    }
                                </TouchableOpacity>
                            }
                            {children ? <View>{children}</View> : null}
                        </View>
                        {error ? (
                            <Text
                                style={styles.input_text}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {error.message}
                            </Text>
                        ) : null}
                    </View>
                );
            }}
        />
    );
};



export default CustomInput;
