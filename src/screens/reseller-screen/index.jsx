import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    SafeAreaView,
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import MenuIcon from '../../../assets/icons/menu-burger.svg';
import { IconProps } from '../../utils/helpers/Iconprops';
import SearchIcon from '../../../assets/icons/search.svg';
import { hs, ms } from '../../utils/helpers/Metrics';
import AppHeader from '../../components/header/AppHeader';
import { Colors, Fonts, TitleFont } from '../../utils/constants';


const ResellerScreen = ({ navigation }) => {
    const [Domain, setDomain] = useState(null);

    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    isBack: true,
                    title: 'Reseller',
                    navigation
                }}
            />
            <ScrollView>
                <View style={styles.es_reseller_block}>
                    <Text style={styles.es_reseller_title}>New.COM domains $9.99!*</Text>
                    <View  style={{marginHorizontal:hs(15)}}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Enter your business name'}
                            placeholderTextColor={'#757575'}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: height(3),
                                zIndex: 2,
                            }}></View>
                    </View>
                    <View style={styles.es_start_btn_area}>
                        <TouchableOpacity style={styles.es_start_btn}>
                            <Text style={styles.es_start_btn_title}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.es_reseller_business_area}>
                        {BusinessAmounts.map((item, index )=> {
                            return (
                                <View  key={index+1} style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={styles.es_reseller_ComLabel}>{item.title}</Text>
                                    <Text style={styles.es_reseller_ComText}>{item.amount}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_reseller_block: {
        flexDirection: 'column',
        backgroundColor: '#e9eef7',
        paddingVertical: hs(20),
    },
    es_reseller_title: {
        fontFamily:TitleFont.title_font_600,
        fontSize: ms(23),
        textAlign: 'center',
        color:Colors.es_black
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
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:hs(20),
        marginTop:hs(10)
    },
    es_start_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(12),
        paddingHorizontal: hs(25),
        backgroundColor: Colors.es_blue,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_reseller_business_area:{
        marginTop:hs(10),
        flexDirection:"row",
    },
    es_reseller_ComLabel:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(15),
        color:Colors.es_black
    },
    es_reseller_ComText:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(19),
        color:Colors.es_dark_green,
        marginTop:hs(5)
    }
});

export default ResellerScreen;

const BusinessAmounts = [
    {
        id: 1,
        title: '.co',
        amount: '$34.99',
    },
    {
        id: 2,
        title: '.org',
        amount: '$17.99',
    },
    {
        id: 3,
        title: '.net',
        amount: '$17.99',
    },
    {
        id: 1,
        title: '.info',
        amount: '$19.99',
    },
];
