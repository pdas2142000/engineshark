import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { hs, ms } from '../../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../../utils/constants';

const PersonalSocialBusiness = ({ item,navigation }) => {
    return (
        <View style={styles.es_priceCard}>
            <Text style={styles.es_priceCardTitle}>{item.title}</Text>
            <Text style={styles.es_priceCardContent}>{item.text_one}</Text>
            <View style={styles.es_add_card_price}>
                <Text style={styles.es_priceCardPrice}>{item.price}</Text>
                {item.btn ? (
                    <View style={{ alignItems: 'flex-start' }}>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Web',{url:item.link})}>
                            <View style={styles.es_add_cart_btn}>
                                <Text style={styles.es_add_cart_btn_title}>{item.btn}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default PersonalSocialBusiness

const styles = StyleSheet.create({
    es_priceCard: {
        zIndex: 1,
        shadowOffset: { width: 1, height: 1 },
        paddingHorizontal: hs(20),
        marginVertical: hs(29),
    },
    es_priceCardTitle: {
        color: 'black',
        fontSize: ms(36),
        fontFamily: TitleFont.title_font_800,
        fontWeight: '600',
    },
    es_priceCardContent: {
        fontFamily: Fonts.Font_400,
        color: Colors.es_lite_blue,
        lineHeight: hs(35),
        fontSize: ms(17),
        paddingVertical: hs(12),
        lineHeight: hs(25),
    },
    es_add_card_price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hs(20),
    },
    es_priceCardPrice: {
        color: Colors.es_blue,
        fontSize: ms(26),
        fontFamily: Fonts.Font_700,
        paddingVertical: hs(2),
        marginBottom: hs(13),
    },
    es_add_cart_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(7),
        paddingHorizontal: hs(25),
        backgroundColor: Colors.es_blue,
    },
    es_add_cart_btn_title: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_white,
        fontSize: ms(15),
    },
});
