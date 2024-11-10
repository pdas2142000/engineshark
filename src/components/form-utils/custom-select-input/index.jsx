import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { Colors } from '../../../utils/constants';
import { ms } from '../../../utils/helpers/Metrics';
import { Controller, useWatch } from 'react-hook-form';
import { IconProps } from '../../../utils/helpers/Iconprops';
import Formfields from '../../../utils/models/Formfields.json';
import CloseIcon from '../../../../assets/icons/cross-circle.svg';
import SelectIcon from '../../../../assets/icons/angle-small-down.svg';
import SearchIcon from '../../../../assets/icons/search.svg';
import UnCheckedIcon from '../../../../assets/icons/check-circle.svg';
import CheckedIcon from '../../../../assets/icons/uncheck-circle.svg';

const CustomSelectInput = ({
    name,
    parent,
    control,
    type,
    label,
    formStyles,
    searchable,
    multi,
    disabled,
    data,
}) => {
    const [Search, setSearch] = useState('');
    const [filterData, setFilterData] = useState(data);
    const [list, setList] = useState(data);
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        setList(data), setFilterData(data)
    }, [data])

    const handleChange = val => {
        setSearch(val);
        const filterItems = list.filter(item =>
            item.title.toLowerCase().includes(val.toLowerCase()),
        );
        setFilterData(filterItems);
    };
    const handleButtonPress = () => {
        bottomSheetRef?.current?.snapToIndex(0);
    };

    const handleCloseBottomsheet = () => {
        bottomSheetRef?.current?.close();
    };

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];
    const snapPoints = useMemo(() => [ms(600)], []);
    const watch = useWatch({ control });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {

                return (
                    <>
                        <View style={formStyles.input_wrap}>
                            {label ? (
                                <Text style={formStyles.input_label}>{FieldName?.label}</Text>
                            ) : null}
                            <TouchableOpacity
                                onPress={handleButtonPress}
                                style={formStyles.input_btn}
                                disabled={disabled}>
                                <Text style={formStyles.input_btn_placeholder}>
                                    {!watch[name]?.length ? (
                                        FieldName?.placeholder
                                    ) : (
                                        <Text style={formStyles.input_btn_text}>
                                            {filterData?.find((val) => val.title === value[0])?.title}
                                        </Text>
                                    )}
                                </Text>
                                <SelectIcon {...IconProps(24)} fill="black" />
                            </TouchableOpacity>
                            {error ? (
                                <Text
                                    style={formStyles.input_text}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {error.message}
                                </Text>
                            ) : null}
                        </View>
                        <Portal hostName="BottomSheetHost">
                            <BottomSheet
                                index={-1}
                                snapPoints={snapPoints}
                                backdropComponent={renderBackdrop}
                                enablePanDownToClose
                                ref={bottomSheetRef}>
                                <SafeAreaView style={{ flex: 1 }}>
                                    <View style={formStyles.es_bs_title_area}>
                                        <Text style={formStyles.es_bs_title}>Select State</Text>
                                        <Pressable
                                            style={formStyles.es_bs_close}
                                            onPress={handleCloseBottomsheet}>
                                            <CloseIcon {...IconProps(ms(18))} />
                                        </Pressable>
                                    </View>
                                    <BottomSheetScrollView style={formStyles.es_list_block}>
                                        {searchable ? (
                                            <View style={formStyles.es_bs_title_search_input_wrap}>
                                                <View style={formStyles.es_search_icon}>
                                                    <SearchIcon
                                                        {...IconProps(ms(16))}
                                                        fill={Colors.es_black}
                                                    />
                                                </View>
                                                <TextInput
                                                    style={formStyles.es_search_input}
                                                    placeholder="search..."
                                                    onChangeText={val => handleChange(val)}
                                                />
                                            </View>
                                        ) : null}
                                        {filterData?.map(item => {
                                            const active =
                                                (watch[name]?.length &&
                                                    watch[name]?.find(val => val == item.title)) ||
                                                ''
                                            return (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={formStyles.select_item}
                                                    onPress={() => {
                                                        let inputIds = watch[name] || [];
                                                        if (multi) {
                                                            if (inputIds.find(val => val == item.id)) {
                                                                inputIds = inputIds.filter(val => val != item.title);

                                                            } else {
                                                                inputIds.push(item.id) && bottomSheetRef?.current?.snapToIndex(0);
                                                            }
                                                        } else {
                                                            inputIds = [];
                                                            inputIds.push(item.title);

                                                        }
                                                        onChange(inputIds);
                                                        handleCloseBottomsheet();
                                                    }}>
                                                    <View style={formStyles.select_item_content}>
                                                        <Text style={formStyles.select_text}>
                                                            {item.title}
                                                        </Text>
                                                    </View>
                                                    {active ? (
                                                        <CheckedIcon
                                                            {...IconProps(ms(18))}
                                                            fill={Colors.es_blue}
                                                        />
                                                    ) : (
                                                        <UnCheckedIcon
                                                            {...IconProps(ms(18))}
                                                            fill={Colors.es_black}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </BottomSheetScrollView>
                                </SafeAreaView>
                            </BottomSheet>
                        </Portal>
                    </>
                )
            }

            }
        />
    );
};

export default CustomSelectInput;

const renderBackdrop = props => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);
