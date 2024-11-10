import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { hs, ms } from '../../../utils/helpers/Metrics'
import { Colors, Fonts } from '../../../utils/constants'

const BusinessPackages = ({ item,navigation}) => {
    return (
        <View style={styles.es_priceCard}>
            <Text style={styles.es_priceCardTitle}>{item.title}</Text>
            <Text style={styles.es_priceCardContent}>{item.text_one}</Text>
            {
                item.lists.map((val, index) => {
                    return (
                        <View  key={index+1} style={styles.es_price_card_content}>
                            <View style={styles.es_priceCard_dot} />
                            <View>
                                <Text style={styles.es_priceCardContent}>{val.points}</Text>
                            </View>
                        </View>
                    )
                })
            }
            <View style={styles.es_btn_area}>
                <Text style={styles.es_priceCardPrice}>{item.price}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Web',{ url: item.link })}>
                    <View style={styles.es_add_cart_btn}>
                        <Text style={styles.es_add_cart_btn_title}>
                            {item.btn}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BusinessPackages
const styles = StyleSheet.create({
    es_priceCard: {
        backgroundColor: Colors.es_white,
        zIndex: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        elevation: 2,
        borderRadius: hs(14),
        paddingVertical: hs(27),
        paddingHorizontal: hs(27),
        marginHorizontal: hs(15),
        marginVertical: hs(20),
    },
    es_priceCardTitle: {
        color: 'black',
        fontSize: ms(27),
        fontFamily: Fonts.Font_700,
        fontWeight: "600",
    },
    es_price_card_content: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: hs(20),
    },
    es_priceCardContent: {
        color: Colors.es_black,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        lineHeight: hs(26),
        paddingLeft: hs(17),
    },
    es_priceCard_dot: {
        backgroundColor: Colors.es_blue,
        height: hs(6),
        width: hs(6),
        position: "absolute",
        top: hs(7),
    },
    es_btn_area: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        paddingVertical: hs(10),
        paddingHorizontal: hs(24),
        backgroundColor: Colors.es_blue,
    },
    es_add_cart_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
})