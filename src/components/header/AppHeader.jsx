import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image} from 'react-native';
import { Colors, Fonts } from '../../utils/constants/index';
import { hs, ms } from '../../utils/helpers/Metrics';
import MenuIcon from '../../../assets/icons/menu-burger.svg';
import BackIcon from '../../../assets/icons/angle-small-left.svg';
import { IconProps } from '../../utils/helpers/Iconprops';

const AppHeader = ({ isBack, navigation, title, isMenu }) => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors.es_blue }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.es_blue} />
            </SafeAreaView>
            <View style={styles.header}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: "flex-end"
                    }}>
                    {isMenu ? (
                        <TouchableOpacity
                            style={styles.es_menu_icon}
                            onPress={() => navigation.navigate('Menu')}
                        >
                            <MenuIcon {...IconProps(16)} fill={Colors.es_black}/>
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={styles.es_header_title}>
                    {
                        isBack ? (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.es_back_button}>
                                <BackIcon {...IconProps(24)} fill={'white'} />
                            </TouchableOpacity>
                        ) : <View style={styles.es_logo_img_block}>
                            <Image
                                source={require('../../../assets/images/logo.png')}
                                style={styles.es_logo_img}
                            />
                        </View>
                    }
                    {title ? <Text style={styles.es_title}>{title}</Text> : null}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingVertical: hs(13),
        paddingHorizontal: hs(12),
        flexDirection:"row-reverse",
        justifyContent:"space-between"

    },
    es_menu_icon: {
        backgroundColor: '#e1e3e7',
        padding: hs(11),
        borderRadius: hs(8),
    },
    es_back_title: {
        color: 'black',
        fontSize: ms(16),
        marginLeft: hs(5),
    },
    es_logo_img_block: {
        height: hs(40),
        width: hs(160),
        resizeMode: "contain"
    },
    es_logo_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_menu_icon: {
        backgroundColor: '#e2e3e7',
        padding: hs(13),
        borderRadius: hs(10),
    },
    es_header_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_back_button: {
        height: ms(32),
        width: ms(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ms(8),
        backgroundColor: '#c9cdd3',
        marginRight: hs(14),
    },
    es_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(18),
        color: 'black',
        textAlign: 'center',
    },

});

export default AppHeader;
