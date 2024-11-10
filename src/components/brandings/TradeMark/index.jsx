import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast'
import { hs, ms } from '../../../utils/helpers/Metrics'
import { Colors, Fonts } from '../../../utils/constants'
import { useNavigation } from '@react-navigation/native';

const TradeMark = ({ search, setSearch }) => {

    const [resultFetched, setResultFetched] = useState(false);
    const [trademarkAvailable, setTrademarkAvailable] = useState(false);
    const [searchedFor, setSearchedFor] = useState('');
    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()
      
    const handleChange = (text) =>{
        setSearch(text)
    }

    const checkTrademark = async search => {
        if (search == null) {
            return Toast.showWithGravity(
                'Enter your personal username or business brand name',
                Toast.LONG,
                Toast.BOTTOM,
            )
        }
        setResultFetched(true);
        setLoader(true)
        const parameters = 'username=' + search;
        const response = await fetch('https://new.engineshark.com/check_trademark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: parameters
        });

        const data = await response.json()
        if (data?.count === 0 ) {
            setSearchedFor(search);
            setTrademarkAvailable(true);
        }
        else if(data.count === 2){
            setSearchedFor(search);
            setTrademarkAvailable(false);
        }
        else {
            setTrademarkAvailable(false);
        }
        setLoader(false)
    }

    useEffect(() => {
        if (!search) {
            setResultFetched(false);
            setTrademarkAvailable(false);
            setSearchedFor('');
            setLoader(false);
        } else {
            setSearchedFor(search);
            checkTrademark(search);
        }
    }, []);

 
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.es_trade_content_area}>
                    <View style={styles.es_tm_bg}>
                        <View style={styles.es_search_input_block}>
                            <View style={styles.es_brand_text_field}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Search Trademark"
                                    placeholderTextColor="#757575"
                                    value={search}
                                    defaultValue={search}
                                    onChangeText={text => handleChange(text)}
                                />
                            </View>
                            <View style={styles.es_start_btn_area}>
                                <TouchableOpacity
                                    style={styles.es_start_btn}
                                    onPress={() => {
                                        checkTrademark(search)
                                    }}>
                                    {loader ?(
                                        <ActivityIndicator size="small" color={Colors.es_white} />
                                    ) : <Text style={styles.es_start_btn_title}>
                                        SEARCH TRADEMARK
                                    </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {searchedFor === '' ? (
                    <View style={styles.es_message_alert_area}>
                        <Text style={styles.es_alert_msg_text}>
                            Please enter a keyword to search in the USPTO trademark database
                        </Text>
                    </View>
                ) : (
                    <View>
                        {
                            resultFetched && (trademarkAvailable )  ? (
                                <View style={styles.es_message_alert_area}>
                                    <Text style={styles.es_alert_msg_text}>
                                        The name you searched for,
                                        <Text style={styles.es_toast_text}>{searchedFor}</Text>, is
                                        not located in the USPTO database! This means that no one else
                                        has trademarked the term {searchedFor}... yet! You can
                                        <TouchableOpacity onPress={() => navigation.navigate('Web', { url: "https://www.uspto.gov/" })}><Text style={styles.es_web_link}>Register</Text></TouchableOpacity>
                                        it now for only $158 + the standard $325 USPTO Filing Fee.
                                    </Text>
                                </View>
                            ) : loader ? null : (
                                <View style={styles.es_message_alert_area}>
                                    <Text style={styles.es_alert_msg_text}>
                                        Sorry, your Trademark is Not Available!
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default TradeMark;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_search_input_block: {
        marginHorizontal: hs(15),
    },
    es_tm_bg: {
        backgroundColor: '#e9eef7',
        paddingVertical: hs(15),
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },
    es_brand_text_field: {
        marginHorizontal: hs(15),
    },
    input: {
        height: hs(55),
        fontFamily: Fonts.Font_600,
        backgroundColor: 'white',
        borderColor: '#d1d5db',
        borderWidth: hs(1),
        elevation: 2,
        width: '100%',
        borderRadius: hs(4),
        paddingLeft: hs(15),
        paddingRight: hs(15),
        fontSize: ms(16),
        zIndex: 1,
        color: 'black',
        marginBottom: hs(15),
        marginTop: hs(20),
    },
    es_trade_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(40),
        textAlign: 'center',
        marginTop: hs(15),
        fontWeight: '600',
    },

    es_bottom_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(20),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
        textAlign: 'center',
    },
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hs(20),
        marginTop: hs(10),
    },
    es_start_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(12),
        width: '50%',
        alignItems: "center",
        backgroundColor: Colors.es_blue,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_message_alert_area: {
        backgroundColor: Colors.es_blue,
        borderRadius: 5,
        marginHorizontal: hs(15),
        padding: hs(15),
        marginVertical: hs(20)
    },
    es_alert_msg_text: {
        lineHeight: ms(23),
        color: Colors.es_white,
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
    },
    es_web_link: {
        fontFamily: Fonts.Font_700,
        color: '#007bff',
        fontSize: ms(15),
        textAlign: "center",
        paddingHorizontal: hs(6),
        borderBottomWidth: hs(1.8),
        borderColor: "#007bff",
    },

});
