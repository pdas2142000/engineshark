import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { hs, ms } from '../../../utils/helpers/Metrics';
import { Colors, Fonts } from '../../../utils/constants';

const BrandingLabel = ({ item, fetchData, i, searchValue, loader }) => {

    return (
        <View style={{ marginBottom: hs(60) }}>
            <View style={{ marginHorizontal: hs(10) }}>
                <View style={styles.es_brand_title_area}>
                    <TouchableOpacity style={styles.es_brand_btn}>
                        <Text style={styles.es_brand_title}>{item.title}</Text>
                    </TouchableOpacity>
                    {
                        item.btn ? <View style={styles.es_search_btn_area}>
                            <TouchableOpacity
                                style={styles.es_search_btn}
                                onPressIn={() => fetchData(searchValue, i)}>
                                <Text style={styles.es_search_btn_title}>
                                    {item.btn}
                                </Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
                <View style={styles.es_brand_bookmarketing}>
                    {item?.images?.map((val, imgIndex) => {
                        const imageUrl = val?.link

                        return (
                            <View style={styles.es_bookmarketing_img_border} key={imgIndex + 1}>
                                <View style={styles.es_brand_box}>
                                    <View style={styles.es_border} >
                                        <View
                                            style={styles.es_bookmarketing_logo}
                                        >
                                            <Image
                                                style={styles.es_bookmarketing_imgs}
                                                source={{uri:imageUrl }}
                                            
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.es_brand_status}>
                                        {!loader && val.result ? (
                                            val.availability ? (
                                                <Text style={styles.es_true_title}>
                                                    Available
                                                </Text>
                                            ) : (
                                                <Text style={styles.es_false_title}>
                                                    Not Available
                                                </Text>
                                            )
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    )
}

export default BrandingLabel
const styles = StyleSheet.create({
    es_brand_title_area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hs(20),
        alignItems: 'center',
    },
    es_brand_title: {
        fontSize: ms(28),
        fontFamily: Fonts.Font_600,
        marginVertical: hs(10),
        marginBottom: hs(15),
        width: hs(250),
        color:Colors.black,
    },
    es_search_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    es_search_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(6),
        paddingHorizontal: hs(8),
        backgroundColor: Colors.es_blue,
    },
    es_search_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(10),
    },
    es_brand_bookmarketing: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: hs(15)
    },
    es_bookmarketing_img_border: {
        width: '31%',
        margin: '1%',
    },
    es_brand_box: {
        borderRadius: hs(4),
        borderColor: '#e7e7e7',
        borderWidth: hs(1.7),
        backgroundColor: 'white',
        height: hs(85),
        alignItems: "center",
        justifyContent: "center",
    },
    es_bookmarketing_logo: {
        height: hs(65),
        width: hs(65),
    },
    es_bookmarketing_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    es_true_title: {
        color: '#27ad61',
        fontFamily: Fonts.Font_400,
        fontSize: ms(10),
        alignSelf: 'center',
        textAlign: "center",
        marginVertical: hs(7)
    },
    es_false_title: {
        color: "red",
        fontFamily: Fonts.Font_400,
        fontSize: ms(10),
        alignSelf: 'center',
        textAlign: "center",
        marginVertical: hs(7)
    }
})