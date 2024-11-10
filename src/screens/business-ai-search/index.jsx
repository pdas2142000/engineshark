import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
    SafeAreaView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppHeader from '../../components/header/AppHeader';
import SearchIcon from '../../../assets/icons/search.svg';
import { IconProps } from '../../utils/helpers/Iconprops';
import { hs, ms } from '../../utils/helpers/Metrics';
import AiSearchTools from '../../components/ai-search-tools';
import Formfields from '../../utils/models/Formfields.json';
import RNFetchBlob from 'rn-fetch-blob';
import { v4 as uuidv4 } from 'uuid';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import DownArrow from '../../../assets/icons/angle-small-down.svg';
import CorrectIcon from '../../../assets/icons/check.svg';
import formStyles from '../../styles/form-styles';
import CustomSelectInput from '../../components/form-utils/custom-select-input';
import { PortalHost } from '@gorhom/portal';


const BusinessAiSearch = ({ navigation, route }) => {
    const {
        handleSubmit,
        control,
        formState: { error },
        watch,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { type } = route.params
    const [search, setSearch] = useState('');
    const [futureData, setFutureData] = useState([]);
    const [filteredData, setFilterData] = useState([]);
    const [load, setLoad] = useState(false);
    const [index, setIndex] = useState(1);
    const [popup, setPopup] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [Data, setData] = useState([])

    var watchFormData = watch();
    const categories = watchFormData?.tools?.[0] || null

    const handleOptionSelect = option => {
        setSelectedOption(option)
        setShowOptions(false);
    };

    const handlePress = () => {
        setShowOptions(!showOptions);
    };

    const [Pages, SetPages] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const handleChangeText = text => {
        setSearch(text);
    };

    const fetchCategories = async () => {
        const response = await RNFetchBlob.fetch(
            "GET",
            "https://new.engineshark.com/welcome/tools",
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        );
        const responseData = await response.json()
        setData(responseData.results.map((item, index) => ({ id: index + 1, title: item.type })))
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchData = async (page) => {
        if (Pages.currentPage > Pages.totalPages) {
            return;
        }
        setLoad(true);
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://new.engineshark.com/welcome/tools?page=${page}&limit=6&category=${categories?categories:""}&search=${search}`,
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        );
        const responseData = await response.json();
        SetPages({ ...Pages, totalPages: responseData.total });
        const newResults = responseData.results;
        setFutureData({ results: newResults });
        setLoad(false);
    };

    useEffect(() => {
        const filteredItems = futureData?.results?.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
        );
        setFilterData(filteredItems );
    }, [search, futureData]);

    const loadMoreData = () => {
        if (!load && Pages.currentPage < Pages.totalPages) {
            const nextPage = Pages.currentPage + 1;
            setLoad(true);
            fetchData(nextPage).finally(() => {
                setLoad(false);
                SetPages(prevPages => ({ ...prevPages, currentPage: nextPage }));
            });
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            SetPages({
                currentPage: 1,
                totalPages: 1,
            });
            await fetchData(1);
        };
        initializeData();
    }, [search]);


    useEffect(() => {
        const fetchDataForCategory = async () => {
            await fetchData(1);
        };
        fetchDataForCategory();
    }, [categories]);

    const handleArrowClick = item => {
        const aiNewData = futureData?.results?.find(val => val.name === item.name);
        setFilterData([aiNewData]);
        navigation.navigate('AiGenerator', { data: [aiNewData] });
    }

    useEffect(() => {
        setPopup(!popup);
    }, []);

    const FormBuilder = [
        {
            name: 'tools',
            parent: 'ai_tools',
            formStyles,
            control,
            type: 'select',
            label: false,
            data: Data,
            searchable: true,
            multi: false,
            show: false,
            setValue,
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AppHeader
                {...{
                    title: 'Business Ai Search',
                    isBack: true,
                    navigation,
                }}
            />
              <ScrollView style={styles.es_container}>
                <View style={{ zIndex: 9999 }}>
                    <View style={styles.es_search}>
                        <TextInput
                            value={search}
                            style={styles.input}
                            placeholder="Search AI Data..."
                            onChangeText={handleChangeText}
                        />
                        <SearchIcon {...IconProps(20)} fill="black" />
                    </View>
                    {FormBuilder?.map((item, index) => {
                        if (item.type === 'select') {
                            return <CustomSelectInput  key={index+1} {...item} />
                        }
                    })}
                    <View>
                        <Text style={styles.es_title}>Best Ai Tools</Text>
                    </View>
                    <View style={styles.es_dropdown}>
                        <TouchableOpacity onPress={handlePress} style={styles.es_button}>
                            <View>
                                <Text style={styles.es_slected_title}>
                                    {selectedOption
                                    ? selectedOption.label
                                    : 'Sort(Default - Newest)'}
                                </Text>
                            </View>
                            <View>
                                <DownArrow {...IconProps(ms(15))} />
                            </View>
                        </TouchableOpacity>
                        {showOptions && (
                            <View style={styles.es_optionsContainer}>
                                {optionsData.map((option , index)=> (
                                    <Pressable
                                        key={index+1}
                                        style={styles.es_option}
                                        onPress={() => handleOptionSelect(option)}>
                                        <View>
                                            <CorrectIcon
                                                {...IconProps(ms(15))}
                                                fill={
                                                    option.value === selectedOption?.value
                                                        ? Colors.es_blue
                                                        : Colors.es_white
                                                }
                                            />
                                        </View>
                                        <Text style={styles.es_drop_title}>{option.label}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <FlatList
                   data={filteredData?.length > 0 ? filteredData : futureData?.results || []}
                    renderItem={({ item, index }) => (
                        <AiSearchTools
                            key={index + 1}
                            {...{ item, navigation, handleArrowClick, load, setLoad }}
                        />
                    )}
                    keyExtractor={item => (item.id ? item.id.toString() : uuidv4())}
                />
               {Pages.currentPage <= Pages.totalPages ? (
                    <View style={styles.es_submit_btn_area}>
                        {load ? (
                            <TouchableOpacity style={styles.es_loader_btn}>
                                <ActivityIndicator size={'small'} color={Colors.es_white} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.es_load_btn}
                                onPress={() => loadMoreData()}>
                                <Text style={styles.es_load_text}>Load more</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : null}
                {/* <Modal animationType="slide" transparent={true} visible={popup}>
                    <View style={styles.es_modalBackdrop}>
                        <View style={styles.es_modalContainer}>
                            <View style={styles.es_modalContent}>
                                <ReportIdPopup styles={styles} popup={popup} setPopup={setPopup} />
                            </View>
                        </View>
                    </View>
                </Modal> */}
              </ScrollView>
            <PortalHost name="BottomSheetHost" />
        </View>
    );
};

export default BusinessAiSearch;

const styles = StyleSheet.create({
    es_container: {
        paddingHorizontal:ms(15),
        flex: 1,
        flexGrow: 1,
        position: 'relative',
    },
    es_search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#c9c6c6',
        borderWidth: 1,
        marginVertical: hs(20),
        borderRadius: hs(7),
        paddingHorizontal: hs(10),
    },
    input: {
        flex: 1,
        paddingVertical: hs(15),
        paddingHorizontal: hs(10),
        fontSize: 16,
        color: '#333',
    },
    es_es_tabs: {},
    es_select_item: {
        flexDirection: 'row',
        width: '48%',
        margin: '1%',
        padding: hs(15),
        backgroundColor: Colors.es_ash,
        justifyContent: 'center',
        marginBottom: 10,
    },
    active: {
        backgroundColor: Colors.es_blue,
    },
    es_item_name: {
        alignSelf: 'center',
        fontFamily: Fonts.Font_500,
        fontSize: ms(14),
    },
    active_text: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(14),
        color: 'white',
    },
    es_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(20),
        marginTop: hs(10),
    },
    es_dropdown: {
        position: 'relative',

        marginTop: hs(15),
    },
    es_button: {
        padding: hs(10),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: hs(10),
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        marginHorizontal: hs(8),
    },
    es_optionsContainer: {
        position: 'absolute',
        top: hs(40),
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#dedede',
        borderWidth: hs(0.9),
        borderRadius: hs(10),
        backgroundColor: '#282828',
    },
    es_option: {
        padding: hs(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#282828',
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_drop_title: {
        fontFamily: Fonts.Font_400,
        fontSize: ms(15),
        paddingLeft: hs(7),
        color: Colors.es_white,
    },
    es_slected_title: {
        fontFamily: Fonts.Font_400,
        fontSize: ms(15),
        paddingLeft: hs(7),
        color: Colors.es_black,
    },
    es_loader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    es_load_btn: {
        marginHorizontal: hs(20),
        paddingVertical: hs(12),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
        borderRadius: hs(20),
        marginTop: hs(15),
    },
    es_load_text: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 20,
        alignSelf: 'center',
    },
    es_submit_btn_area: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    es_loader_btn: {
        marginHorizontal: hs(20),
        paddingVertical: hs(12),
        paddingHorizontal: hs(55),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
        borderRadius: hs(20),
        marginTop: hs(15),
    },
    es_modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    es_modalContainer: {
        marginHorizontal: hs(6),
    },
    es_modalContent: {
        backgroundColor: 'white',
        borderRadius: hs(6),
        position: 'relative',
        padding: hs(20),
    },
    es_popup_title: {
        marginHorizontal: hs(15),
        textAlign: 'center',
        color: Colors.es_black,
        fontSize: ms(26),
        fontWeight: '700',
        fontFamily: TitleFont.title_font_600,
    },
    es_popup_btn: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
});

const schema = yup.object().shape({
    tools: yup.mixed().required(Formfields.ai_tools.tools.errors.required),
});

const optionsData = [
    { value: 'upvoted', label: 'Most Upvoted' },
    { value: 'name-asc', label: 'Sort By Name (A-Z)' },
    { value: 'name-desc', label: 'Sort By Name (Z-A)' },
    { value: 'date-newest', label: 'Date Added (Newest-Oldest)' },
    { value: 'date-oldest', label: 'Date Added (Oldest-Newest)' },
];
