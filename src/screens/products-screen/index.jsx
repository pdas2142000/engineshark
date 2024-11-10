import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppHeader from '../../components/header/AppHeader';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { hs, ms } from '../../utils/helpers/Metrics';
import CustomSelectInput from '../../components/form-utils/custom-select-input';
import { States } from '../../utils/models/States';
import FormFields from '../../utils/models/Formfields.json';
import { PortalHost } from '@gorhom/portal';
import formStyles from '../../styles/form-styles';
import RNFetchBlob from 'rn-fetch-blob';

const ProductsScreen = ({ navigation, route }) => {
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const [select, setSelect] = useState(ProductsData);
    const [filterList, setFilterList] = useState([
        {
            title: "QrCode",
        },
        {
            title: "AiTools",
        }
    ]);
    const [selectBg, setSelectBg] = useState([
        {
            title: "QrCode",
        },
        {
            title: "AiTools",
        }
    ]);
    const search = route.params.search;
    const [toggle, setToggle] = useState(false);
    const [responseData, setResponseData] = useState([])
    const [load, setLoad] = useState(false)
    const [searchValue, setSearchValue] = useState(search)

    const selectedData = title => {
        const isSelected = selectBg.includes(title);
        if (isSelected) {
            setSelectBg(selectBg.filter(item => item !== title));
            setFilterList(filterList.filter(item => item.title !== title));
        } else {
            setSelectBg([...selectBg, title]);
            const isMultiSelect = select.find(item => item.title === title);
            setFilterList([...filterList, isMultiSelect]);
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        const value = {
            state: searchValue,
            llc: data.state[0],
        }

        setLoad(true)
        const parameters = 'data=' + JSON.stringify(value);

        const response = await RNFetchBlob.fetch(
            'POST',
            'https://blog.engineshark.com/welcome/check_llc',
            {
                'Content-Type': 'application/json',
            },
            parameters
        );
        setLoad(false)
        const responseDataArray = await response.json()
        if (responseDataArray) {
            setToggle(!toggle);
            setResponseData(responseDataArray)
        }
    }
    const FormBuilder = [
        {
            name: 'state',
            parent: 'state',
            formStyles,
            control,
            type: 'select',
            label: false,
            data: States,
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
                    navigation: navigation,
                    title: 'Business Product',
                }}
            />
            {
                <ScrollView>
                    <View style={styles.es_drop_title_area}>
                        {
                            toggle ?
                                <Text style={styles.es_drop_title}>
                                    Business Development Services
                                </Text>
                                :
                                <Text style={styles.es_drop_title}>
                                    Select Your State
                                </Text>
                        }
                    </View>
                    {toggle ? (
                        <View >
                            <View style={styles.es_product_block}>
                                <>
                                    <View style={styles.es_product}>
                                        {select.map(item => (
                                            <TouchableOpacity
                                                style={[
                                                    styles.es_product_area,
                                                    selectBg.includes(item.title) ? styles.es_active : null,
                                                ]}
                                                key={item.id}
                                                onPress={() => selectedData(item.title)}>
                                                <View style={styles.es_product_block_imgs}>
                                                    <Image
                                                        source={item.imgs}
                                                        style={styles.es_product_imgs}
                                                    />
                                                </View>
                                                <View style={styles.es_product_text_container}>
                                                    <Text style={styles.es_product_title}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={styles.es_start_btn_area}>
                                        <TouchableOpacity
                                            style={styles.es_start_btn}
                                            onPress={() =>
                                                navigation.navigate('Plans', {
                                                    select: filterList,
                                                    search: search,
                                                    selectBg: selectBg,
                                                    availbaleLLC: responseData
                                                })
                                            }>
                                            <Text style={styles.es_start_btn_title}>submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.es_select_item}>
                            {FormBuilder.map((item, index) => {
                                return (
                                    <View key={index + 1}>
                                        <CustomSelectInput {...item} />
                                    </View>
                                );
                            })}
                            <View style={styles.es_start_btn_area}>
                                <TouchableOpacity
                                    style={styles.es_start_btn}
                                    onPress={handleSubmit(onSubmit)}>
                                    {load ? (
                                        <View style={styles.es_loader}>
                                            <ActivityIndicator size="small" color={Colors.es_white} />
                                        </View>
                                    ) : <Text style={styles.es_start_btn_title}>
                                        Submit
                                    </Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </ScrollView>
            }
            <PortalHost name="BottomSheetHost" />
        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    es_product_block: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: hs(15)
    },
    es_product_loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    es_product: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '102%',
        marginLeft: '-1%'
    },
    es_product_area: {
        alignItems: "center",
        borderColor: '#d2d2d2',
        backgroundColor: '#ffff',
        paddingHorizontal: hs(30),
        paddingVertical: hs(25),
        marginBottom: hs(20),
        borderRadius: hs(10),
        borderWidth: hs(1),
        width: '48%',
        margin: '1%',
    },
    es_active: {
        width: '48%',
        margin: '1%',
        alignItems: 'center',
        borderColor: '#d2d2d2',
        backgroundColor: Colors.es_sky_blue,
        paddingHorizontal: hs(30),
        paddingVertical: hs(25),
        marginBottom: hs(20),
        borderRadius: hs(6),
        borderWidth: hs(1),
    },
    es_product_block_imgs: {
        height: hs(80),
        width: hs(80),
    },
    es_product_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_product_title: {
        fontFamily: Fonts.Font_600,
        color: Colors.black,
        marginTop: hs(13)
    },
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hs(50),
    },
    es_select_item: {
        marginHorizontal: hs(15)
    },
    es_drop_title_area: {
        padding: hs(15),
        borderRadius: hs(10),
        margin: hs(15),
        marginVertical: hs(15)
    },
    es_drop_title: {
        color: Colors.es_blue,
        fontSize: ms(19),
        fontFamily: TitleFont.title_font_800,
    },
    es_loader: {
        paddingHorizontal: hs(15),
    },
    es_start_btn: {
        borderRadius: hs(50),
        paddingVertical: hs(12),
        paddingHorizontal: hs(39),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(16),
        zIndex: 20,
    },
});
const ProductsData = [
    {
        id: 1,
        title: 'Domain',
        imgs: require('../../../assets/images/products/productone.webp'),
    },
    {
        id: 2,
        title: 'Logo',
        imgs: require('../../../assets/images/products/producttwo.png'),
        link: "LogoDesign"
    },
    {
        id: 3,
        title: 'Website',
        imgs: require('../../../assets/images/products/productthree.webp'),
        link: "BusinessCreation"
    },
    {
        id: 4,
        title: 'Trademark',
        imgs: require('../../../assets/images/products/productfour.webp'),
    },
    {
        id: 5,
        title: 'Social Media',
        imgs: require('../../../assets/images/products/productfive.webp'),
    },
    {
        id: 6,
        title: 'Business Name',
        imgs: require('../../../assets/images/products/productsix.webp'),
    },
    {
        id: 7,
        title: "Start LLC",
        imgs: require('../../../assets/images/products/ico-1.png'),
    },
    {
        id: 8,
        title: "QrCode",
        imgs: require('../../../assets/images/products/qr.png'),
    },
    {
        id: 9,
        title: "AiTools",
        imgs: require('../../../assets/images/products/ai.png'),
    }
];

const schema = yup.object().shape({
    state: yup.mixed().required(FormFields.state.state.errors.required),
});
