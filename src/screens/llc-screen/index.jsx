import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { width, height, totalSize } from 'react-native-dimension';
import { hs, ms } from '../../utils/helpers/Metrics';
import { IconProps } from '../../utils/helpers/Iconprops';
import MenuIcon from '../../../assets/icons/menu-burger.svg';
import CheckIcon from '../../../assets/icons/check-circle.svg';
import CrossIcon from '../../../assets/icons/cross-circle.svg';
import { Colors, Fonts } from '../../utils/constants';
import AppHeader from '../../components/header/AppHeader';

const LlcScreen = ({ navigation }) => {
    const [Select, SetSelect] = useState(1);
    const [Toggle, SetToggle] = useState(false);
    const AssetsButtons = [
        {
            id: 1,
            btn: 'Domain',
        },
        {
            id: 2,
            btn: 'Logo',
        },
        {
            id: 3,
            btn: 'Website',
        },
        {
            id: 4,
            btn: 'LLC',
        },
        {
            id: 5,
            btn: 'Trademark',
        },
        {
            id: 6,
            btn: 'Social Media',
        },
        {
            id: 7,
            btn: 'Branding',
        },
    ];
    const BusinessEnhanceData = [
        {
            id: 1,
            title: 'Domain',
            name_one: '.info',
            name_two: '.com',
            name_three: '.org',
            btn: 'Get Started',
        },
        {
            id: 2,
            title: 'Website',
            btn: 'Get Started',
        },
        {
            id: 3,
            title: 'Social Media',
            name_one: 'Facebook',
            name_four: 'Youtube',
            name_two: 'Linkedin',
            name_three: 'Instagram',
            btn: 'Get Started',
        },
        {
            id: 4,
            title: 'Branding',
            btn: 'Get Started',
        },
    ];
    const handlePress = () => {
        navigation.navigate('Llc');
        SetToggle(!Toggle);
    };
    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    navigation,
                    isBack: true,
                }}
            />
            <ScrollView>
                <View style={[styles.es_searchblock]}>
                    {Toggle ? (
                        <View>
                            <Text style={styles.es_searchblock_title}>
                                Tailored plans to enhance your business
                            </Text>
                            <Text style={styles.es_searchblock_text}>
                                Customized Business Solutions for Engine Shark
                            </Text>
                            <View>
                                <View style={styles.es_services_wrap}>
                                    {BusinessEnhanceData.map(item => {

                                        return (
                                            <View style={styles.es_services_block} key={item.id}>
                                                <View style={styles.es_services_title_area}>
                                                    <View>
                                                        <Text style={styles.es_service_title}>
                                                            {item.id}. {item.title}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={styles.es_services_btn}>
                                                            <Text style={styles.es_services_btn_text}>
                                                                {item.btn}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={styles.es_services_links}>
                                                    {item.name_one ? (
                                                        <View style={styles.es_services_icon}>
                                                            <CheckIcon
                                                                {...IconProps(11)}
                                                                fill={'rgb(200, 207, 180)'}
                                                            />
                                                            <Text style={styles.es_services_text}>
                                                                {item.name_one}
                                                            </Text>
                                                        </View>
                                                    ) : null}
                                                    {item.name_two ? (
                                                        <View style={styles.es_services_icon}>
                                                            {item.name_two === 'Linkedin' ? (
                                                                <CrossIcon
                                                                    {...IconProps(11)}
                                                                    fill={'#ff716a'}
                                                                />
                                                            ) : (
                                                                <CheckIcon
                                                                    {...IconProps(11)}
                                                                    fill={'rgb(200, 207, 180)'}
                                                                />
                                                            )}
                                                            <Text style={styles.es_services_text}>
                                                                {item.name_two}
                                                            </Text>
                                                        </View>
                                                    ) : null}

                                                    {item.name_four ? (
                                                        <View style={styles.es_services_icon}>
                                                            <CheckIcon
                                                                {...IconProps(11)}
                                                                fill={'rgb(200, 207, 180)'}
                                                            />
                                                            <Text style={styles.es_services_text}>
                                                                {item.name_four}
                                                            </Text>
                                                        </View>
                                                    ) : null}
                                                    {item.name_three ? (
                                                        <View style={styles.es_services_icon}>
                                                            {item.name_three === 'Instagram' ? (
                                                                <CrossIcon
                                                                    {...IconProps(11)}
                                                                    fill={'#ff716a'}
                                                                />
                                                            ) : (
                                                                <CheckIcon
                                                                    {...IconProps(11)}
                                                                    fill={'rgb(200, 207, 180)'}
                                                                />
                                                            )}
                                                            <Text style={styles.es_services_text}>
                                                                {item.name_three}
                                                            </Text>
                                                        </View>
                                                    ) : null}
                                                </View>
                                                <View style={[styles.es_services_underline]}></View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    ) : null}
                    {Toggle ? null : (
                        <View style={styles.es_service_container}>
                            <Text style={styles.es_searchblock_title}>Start LLC</Text>
                            <Text style={styles.es_searchblock_text}>
                                Access your current business assets for Engine Shark
                            </Text>
                            <View style={styles.es_llcBtn_area}>
                                {AssetsButtons.map(item => {
                                    return (
                                        <View key={item.id}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.es_btn_block,
                                                    Select === item.id ? styles.es_active_btn : null,
                                                ]}
                                                onPress={() => SetSelect(item.id)}>
                                                <Text style={styles.es_llcbtn_text}>{item.btn}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                            {Toggle ? null : (
                                <View style={styles.es_btn_area}>
                                    <TouchableOpacity
                                        style={styles.es_start_btn}
                                        onPress={() => handlePress()}>
                                        <Text style={styles.es_submit_btn_text}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default LlcScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        margin: hs(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    es_searchblock: {
        backgroundColor: '#d7efef',
        padding: hs(20),
        marginTop: hs(25),
    },
    es_searchblock_title: {
        fontSize: ms(30),
        color: '#030a1c',
        marginBottom: hs(10),
        fontFamily: Fonts.Font_800,
        marginBottom: hs(9),
        lineHeight: hs(30),
    },
    es_searchblock_text: {
        fontSize: ms(15),
        color: '#33494d',
        marginBottom: hs(17),
        fontFamily: Fonts.Font_600,
    },
    input: {
        height: height(6),
        fontFamily: Fonts.Font_700,
        backgroundColor: 'white',
        elevation: 2,
        width: width(84),
        borderRadius: height(7) / 5,
        paddingLeft: hs(35),
        paddingRight: width(15),
        fontSize: totalSize(1.6),
        zIndex: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        color: 'black',
        marginBottom: hs(15),
    },
    searchButton: {
        justifyContent: 'center',
        height: hs(40),
    },
    searchButtonText: {
        fontFamily: Fonts.Font_400,
        textAlign: 'center',
        color: 'white',
        fontSize: ms(1),
        marginTop: hs(6),
        marginHorizontal: hs(10),
    },
    ComText: {
        color: '#2d4373',
        fontFamily: Fonts.Font_700,
        paddingVertical: height(0.5),
        fontSize: totalSize(1.8),
    },
    ComLabel: {
        color: 'black',
        fontFamily: Fonts.Font_700,
        paddingVertical: height(0.5),
        fontSize: totalSize(1.8),
    },
    es_btn_area: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_start_btn: {
        backgroundColor: Colors.es_blue,
        borderRadius: hs(12),
        borderWidth: 1,
        paddingHorizontal: hs(22),
        paddingVertical: hs(14),
        borderColor: '#e1e1e1',
        borderColor: '#e1e1e1',
        borderBottomWidth: 0,
        shadowColor: '#e1e1e1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
    },
    es_register_btn: {
        backgroundColor: '#fff',
        padding: hs(8),
        marginLeft: hs(12),
        borderRadius: hs(10),
    },
    es_submit_btn_text: {
        fontSize: hs(15),
        fontFamily: Fonts.Font_600,
        color: 'white',
    },
    es_reg_btn_text: {
        fontSize: hs(13),
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    es_llcBtn_area: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '102%',
        marginLeft: '-1%',
        marginBottom: hs(15),
    },
    es_btn_block: {
        backgroundColor: '#fff',
        paddingVertical: hs(8),
        paddingHorizontal: hs(13),
        borderRadius: hs(16),
        borderWidth: 1,
        borderColor: '#a0d9d9',
        borderBottomWidth: 0,
        shadowColor: '#a0d9d9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
        margin: '1%',
        marginBottom: hs(10),
    },
    es_active_btn: {
        backgroundColor: '#bfcff8',
        paddingVertical: hs(8),
        paddingHorizontal: hs(13),
        borderRadius: hs(16),
        borderWidth: 0.7,
        borderColor: '#a0d9d9',
        borderBottomWidth: 0,
        shadowColor: '#a0d9d9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
        margin: '1%',
        marginBottom: hs(10),
    },
    es_llcbtn_text: {
        color: '#000000',
        fontSize: hs(13),
        fontFamily: Fonts.Font_600,
    },
 
    es_services_wrap: {
        backgroundColor: 'white',
        padding: hs(8),
        borderRadius: hs(15),
    },
    es_services_links: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    es_service_container: {
        marginHorizontal: hs(13),
    },
    es_services_block: {
        paddingHorizontal: hs(15),
        width: '100%',
        paddingVertical: hs(10),
        borderBottomColor: '#f2f2f3',
        borderBottomWidth: 1,
    },
    es_services_title_area: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    es_service_title: {
        color: Colors.black,
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        fontWeight: '700',
    },

    es_services_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hs(6),
        marginRight: hs(6),
    },
    es_services_text: {
        marginLeft: hs(2),
        color: '#33494d',
        fontFamily: Fonts.Font_500,
        fontWeight: '600',
        fontSize: ms(12),
    },
    es_services_btn: {
        backgroundColor: Colors.es_blue,
        padding: hs(5),
        paddingHorizontal: hs(10),
        borderRadius: hs(6),
        paddingHorizontal: hs(5),
    },
    es_services_btn_text: {
        color: 'white',
        fontSize: ms(10),
        fontFamily: Fonts.Font_600,
    },

    es_active: {
        marginBottom: hs(10),
    },
});
