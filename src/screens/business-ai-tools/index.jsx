import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, FlatList, Image,ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import AppHeader from '../../components/header/AppHeader';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { hs, ms, vs } from '../../utils/helpers/Metrics';
import AiSearchTools from '../../components/ai-search-tools';
import { useNavigation } from '@react-navigation/native';
import Banner from '../../components/banner';
import { BannerStyles } from '../../styles/banner-styles';


const BusinessAiTools = () => {


    const [tools, setTools] = useState([]);
    const [categories, setCategories] = useState([{ type: 'All' }]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [updatingDataLoading, setUpdatingDataLoading] = useState(false);
    const navigation = useNavigation();

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://new.engineshark.com/welcome/get_tool_Categories');
            const responseData = await response.json();
            setCategories([{ type: 'All' }, ...responseData.results]);
        } catch (error) {
            console.error('Error fetching Categories:', error);
        }
    };

    const fetchData = async (category, nextPage = 1) => {
        if (nextPage > totalPages) return;
        setLoading(nextPage === 1);
        setUpdatingDataLoading(nextPage !== 1);
        const url = `https://new.engineshark.com/welcome/Tools?limit=${9}&Page=${nextPage}${category !== 'All' ? `&category=${category}` : ''}`;
        const response = await fetch(url);
        const responseData = await response.json();
        setTools(prevTools => (nextPage === 1 ? responseData.results : [...prevTools, ...responseData.results]));
        setPage(nextPage);
        setTotalPages(responseData.totalPages);
        setLoading(false);
        setUpdatingDataLoading(false);
    };

    const HandleCategoryChange = (category) => {
        setSelectedCategory(category);
        fetchData(category);
    };

    const handleArrowClick = (item) => {
        navigation.navigate('AiGenerator', { data: item });
    };

      
    const HandleScroll = ({ nativeEvent } ) => {
        if (IsCloseToBottom(nativeEvent)  && !loading) {
            setLoading(true)
            fetchData(selectedCategory, page + 1);
            setLoading(false);
        }
    };

    const IsCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize })=> {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };


    useEffect(() => {
        const initializeData = async () => {
            await fetchCategories();
            fetchData(selectedCategory);
        };
        initializeData();
    }, []);

    const filteredTools = selectedCategory === 'All' ? tools : tools.filter(tool => tool?.type === selectedCategory);

    return (
        <View style={styles.conatiner}>
            <AppHeader
                {...{
                    title: 'Business Ai Tools',
                    isBack: true,
                    navigation: navigation,
                }}
            />
            <ScrollView
                onScroll={HandleScroll}
                scrollEventThrottle={16}
            >
                {
                    <>
                        {
                            <Banner
                                {
                                    ...{
                                        title: "TOOLQUE IS THE ULTIMATE AI TOOL MARKETPLACE!!!",
                                        content: "The AI landscape evolves, so does our collection.",
                                        type: "subscribe",
                                        text: "Receive newly released tools via email",
                                        img: require('../../../assets/images/show_01.jpg'),
                                        styles: BannerStyles
                                    }
                                }
                            />
                        }
                        <View style={styles.es_business_aitool}>
                            <Text style={styles.es_business_ai_title}>Best AI Tools</Text>
                            <View style={styles.tq_ai_tools}>
                                <View style={styles.tq_ai_tools_btn}>
                                    {
                                        categories.length < 2 ? null :
                                        <FlatList
                                            data={categories}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => HandleCategoryChange(item.type)}
                                                >
                                                    <LinearGradient
                                                        colors={[Colors.es_blue, '#5d57f5']}
                                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                                        style={[
                                                            styles.tq_ai_tool_select_btn,
                                                        ]}
                                                    >
                                                        <Text style={styles.es_active_btn}>{item.type}</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            )}
                                            style={styles.tq_ai_tools_btn}
                                        />
                                    }
                                </View>
                            </View>
                            {
                                loading ?
                                <View style={[styles.pp_load, { height: ms(200), alignItems: "center", justifyContent: "center" }]}>
                                    <ActivityIndicator
                                        color={Colors.es_blue}
                                        size={"large"}
                                    />
                                </View>
                                :
                                <View  style={styles.es_ai_cards}>
                                    {
                                        filteredTools?.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index + 1} >
                                                    <AiSearchTools {...{ item, handleArrowClick, type: item.type }} navigation={navigation} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            }
                        </View>
                        {
                            updatingDataLoading &&
                            <View style={styles.es_load}>
                                <ActivityIndicator color={Colors.es_blue} size={'large'} />
                            </View>
                        }
                    </>
                }
            </ScrollView>
        </View>
    );
};

export default BusinessAiTools;

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: Colors.es_white,
        flex: 1,
    },
    es_arrow_icon: {
        position: "absolute",
        right: 0,
        bottom: hs(27),
        backgroundColor: Colors.es_blue,
        padding: hs(10),
        borderBottomRightRadius: hs(10),
        borderTopRightRadius: hs(10),
    },
    es_business_report: {
        marginHorizontal: hs(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hs(20)
    },
    es_report_btn: {
        borderRadius: hs(30),
        paddingVertical: hs(10),
        paddingHorizontal: hs(27),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
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
       
        fontSize: ms(14),
    },
    es_business_ai_title: {
        fontSize: ms(23),
        color: Colors.es_black,
        fontFamily: Fonts.Font_700,
        marginTop: hs(20),
        paddingHorizontal: hs(15),
    },
    es_business_area: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: hs(30),
        backgroundColor: Colors.es_sky_blue,
        borderColor: "#e1e1e1",
        borderWidth: hs(0.8),
        borderRadius: hs(8),
    },
    es_business_imgs: {
        height: hs(200),
        width: "100%"
    },
    es_business_image: {
        height: "100%",
        width: "100%",
        borderTopLeftRadius: hs(6),
        borderBottomLeftRadius: hs(6),
        resizeMode: "cover"
    },
    es_business_content_area: {
        padding: hs(10)
    },
    es_business_tile_area: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: hs(6),
        color: Colors.es_black
    },
    es_title: {
        color: "#2d6fc3",
        fontFamily: TitleFont.title_font_600,
        fontSize: ms(17),

    },
    es_start_btn: {
        borderRadius: hs(10),
        paddingVertical: hs(12),
        paddingHorizontal: hs(27),
        backgroundColor: "#96c15c",
        zIndex: 99999,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        zIndex: 9999,
    },
    es_qr_btn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        zIndex: 20,
        marginHorizontal: hs(15)
    },
    es_business_arrow_imgs: {
        height: hs(13),
        width: hs(13),
        marginLeft: hs(10)
    },
    es_business_arrow_image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover"
    },
    es_content: {
        fontSize: ms(10),
        fontFamily: Fonts.Font_400,
        lineHeight: hs(15),
        marginBottom: hs(4),
        color: Colors.es_black
    },
    es_business_btn_area: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 20,
        marginTop: hs(8)
    },
    es_business_btn: {
        borderRadius: hs(6),
        paddingVertical: hs(5),
        paddingHorizontal: hs(10),
        backgroundColor: "#d5ddeb",
        zIndex: 20,
    },
    es_button_title: {
        fontFamily: Fonts.Font_600,
        color: 'black',
        fontSize: ms(10),
    },
    es_ai_spacer: {
        marginHorizontal: hs(15),
        marginVertical: hs(30),
    },
    linearGradient: {
        paddingHorizontal: hs(15),
        paddingVertical: hs(15)
    },
    es_ai_ex_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(40),
        fontWeight: '700',
        marginTop: hs(15),
        color: Colors.es_white
    },
    es_ai_cards:{
        paddingHorizontal:ms(15)
    },
    es_ai_ex_content: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(18),
        color: "#868787",
        fontWeight: '300',
        marginTop: hs(14),
    },
    es_ai_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(40),
        fontWeight: '700',
        marginTop: hs(15),
        color: Colors.black
    },
    es_ai_content: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(18),
        color: Colors.es_lite_blue,
        fontWeight: '300',
        marginTop: hs(14),
    },
    es_bs_ai_title: {
        textAlign: 'center',
        marginTop: hs(30),
        fontSize: ms(26),
        fontFamily: TitleFont.title_font_800,
        fontWeight: '800',
        marginVertical: hs(30),
        color: Colors.black
    },
    es_ai_card_block: {
        paddingVertical: hs(20),

    },
    es_bs_ai_cards: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hs(20),
        borderColor: '#dedede',
        borderWidth: hs(0.5),
        padding: hs(25),
        borderRadius: hs(10),
        elevation: 0.4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    es_ai_cards_bg: {
        backgroundColor: '#f8f8f8',
        alignItems: "center",
        justifyContent: "center"
    },
    es_bs_ai_bottom_cards: {
        backgroundColor: 'white',
        marginBottom: hs(20),
        borderColor: '#dedede',
        borderWidth: hs(0.5),
        alignItems: "center",
        justifyContent: "center",
        padding: hs(25),
        borderRadius: hs(10),
        elevation: 0.4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1,

    },
    es_bs_card_ai_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(18),
        fontWeight: '700',
        color: Colors.black
    },
    es_bs_Card_ai_content: {
        lineHeight: hs(23),
        marginTop: hs(14),
        fontFamily: Fonts.Font_600,
        fontWeight: '500',
        fontSize: ms(15),
        textAlign: 'center',
        color: Colors.es_lite_blue,
    },
    es_ai_icon: {
        backgroundColor: '#f2f4f4',
        height: hs(75),
        width: hs(75),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hs(10),
        marginBottom: hs(20),
    },
    es_bs_ai_tools: {
        fontFamily: Fonts.Font_400,
        fontWeight: '300',
        color: Colors.es_white,
        textAlign: 'center',
        width: '100%',
    },
    es_ai_tool: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '102%',
        marginLeft: '-1%',
        marginTop: hs(35),
    },
    es_baner_img: {
        height: hs(600),
    },
    es_bg_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    es_banner_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(50),
        color: Colors.es_white,
        marginHorizontal: hs(10),
        textAlign: 'center',

    },
    es_banner_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_white,
        lineHeight: hs(20),
        fontSize: ms(18),
        marginVertical: hs(16),
        marginHorizontal: hs(10),
        textAlign: 'center',
    },
    es_text_block: {
        marginVertical: hs(15),
        marginHorizontal: hs(10),
    },
    tq_ai_tools: {
        backgroundColor: Colors.tq_white,
        marginTop: ms(15),
        paddingTop: ms(15),
    },
    tq_ai_tools_btn: {
        flexDirection: "row",
    },
    tq_ai_tool_select_btn: {
        backgroundColor: '#f6f6f6',
        marginBottom: ms(10),
        paddingHorizontal: ms(13),
        paddingVertical: ms(10),
        borderRadius: ms(10),
        marginLeft: ms(10),
    },
    tq_active_btn: {
        backgroundColor: Colors.es_blue
    },
    es_active_btn: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(12),
        color: Colors.es_white
    },
    tq_ai_tool_select_btn_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(12),
        color: Colors.es_black
    },
    es_load: {
        marginVertical: ms(20)
    }
});
