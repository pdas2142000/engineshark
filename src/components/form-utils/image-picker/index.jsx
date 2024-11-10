import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import Formfields from '../../../utils/models/Formfields.json'
import { Controller, useWatch } from 'react-hook-form'
import PictureIcon from '../../../../assets/icons/picture.svg'
import { launchImageLibrary } from 'react-native-image-picker'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/Metrics'
import { Colors } from '../../../utils/constants'

const ImagePicker = ({ name, parent, control, label, type, styles }) => {
    
    const Formfield = Formfields;
    const FieldName = parent ? Formfield[parent][name] : Formfield[name];

    const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
    };

    const handleChange = async () => {
        const { didCancel, assets } = await launchImageLibrary(options);

        if (!didCancel && assets.length > 0) {
               return assets[0].uri
        }
        return null
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                    <View style={styles.input_wrap}>
                        {label ? (
                            <Text style={styles.input_label}>{FieldName?.label}</Text>
                        ) : null}
                        <View
                            style={[
                                FieldName?.type === 'square'
                                    ? styles.input_image_block_square
                                    : styles.input_image_block,
                            ]}>
                            <Pressable
                                style={{ width: '100%' }}
                                onPress={async () => {
                                    const selectedImage = await handleChange();
                                    if (selectedImage) {
                                        onChange(selectedImage);
                                    }
                                }}>
                                {value ? (
                                    <View style={styles.input_image}>
                                        <Image  source={{uri:value}} style={styles.image} />
                                    </View>
                                ) : (
                                    <View style={styles.input_image_empty}>
                                        <PictureIcon {...IconProps(ms(60))} fill={Colors.es_blue} />
                                    </View>
                                )}
                            </Pressable>
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

export default ImagePicker;
