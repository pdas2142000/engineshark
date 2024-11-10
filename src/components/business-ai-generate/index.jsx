import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, TitleFont } from '../../utils/constants'
import { hs, ms } from '../../utils/helpers/Metrics'

const BusinessAiGenerates = ({ item, navigation }) => {

    return (
        <View>
            <Text style={styles.es_ai_title}>{item?.name}</Text>
            <View>
                <View style={styles.es_ai_img}>
                    <Image source={{ uri: item?.image }} style={styles.es_ai_imgs} />
                </View>
                <View>
                    <Text style={styles.es_ai_description_title}>Description:</Text>
                    <Text style={styles.es_ai_content}>{item?.description}</Text>
                </View>
                <View style={styles.es_ai_list}>
                    <View style={styles.es_ai_list_item}>
                        <Text style={styles.es_ai_list_title}>Pricing Model:</Text>
                        {
                            item?.pricing ? 
                            <TouchableOpacity style={styles.es_paid_btn}>
                                <Text style={styles.es_paid_btn_title}>{item?.pricing}</Text>
                            </TouchableOpacity> 
                            : null
                        }
                    </View>
                    <View style={styles.es_ai_list_item}>
                        <View style={styles.es_ai_list_img}>
                            <Image source={require('../../../assets/images/free.webp')} style={styles.es_ai_list_imgs} />
                        </View>
                        <Text style={styles.es_ai_list_title}>This tool offer a free trail</Text>
                    </View>
                    <View style={styles.es_ai_list_item}>
                        <Text style={styles.es_ai_list_title}>Tags</Text>
                        <TouchableOpacity style={styles.es_media_btn}>
                            <Text style={styles.es_media_btn_title}>{item?.type}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.es_btn_visit_link} onPress={() => navigation.navigate('Web',{ url: item?.website })}>
                    <Text style={styles.es_btn_title}>Visit {item.name}</Text>
                    <View style={styles.es_img}>
                        <Image source={require('../../../assets/images/best-ai-tools/expand-arrows.png')} style={styles.es_image} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.es_suggest_btn}>
                    <Text style={styles.es_btn_title}>Suggest Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BusinessAiGenerates

const styles = StyleSheet.create({
    es_ai_title: {
        color: Colors.black,
        fontFamily: Fonts.Font_700,
        fontSize: ms(20),
        alignSelf: "center",
        marginTop: hs(15)
    },
    es_ai_img: {
        height: hs(200),
        marginTop: hs(15),
        overflow: 'hidden',
        elevation: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderRadius: hs(20),
    },
    es_ai_imgs: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: hs(20),
        borderColor: 'black',
        shadowColor: 'black',

    },
    es_ai_description_title: {
        fontSize: ms(19),
        fontFamily: TitleFont.title_font_600,
        marginTop: hs(10),
        color: Colors.es_black
    },
    es_ai_content: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        marginTop: hs(10),
        fontWeight: "400",
        lineHeight: ms(20),
        color:Colors.es_black
    },
    es_ai_list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '101%',
        marginLeft: '-1%',
        marginTop: hs(15),
        marginBottom: hs(22),
        paddingVertical: hs(4),
    },
    es_ai_list_item: {
        flexDirection: 'row',
        alignItems: "center",
        width: '47%',
        margin: '1%',
    },
    es_ai_list_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(15),
        maxWidth: hs(130),
        color: Colors.es_black
    },
    es_paid_btn: {
        backgroundColor: Colors.es_purple,
        paddingHorizontal: hs(10),
        paddingVertical: hs(1),
        borderRadius: ms(15),
        marginLeft: hs(6)
    },
    es_paid_btn_title: {
        color: Colors.es_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12)
    },
    es_media_btn: {
        backgroundColor: "#f8f8f8",
        paddingHorizontal: hs(10),
        paddingVertical: hs(2),
        borderRadius: ms(20),
        marginLeft: hs(6)
    },
    es_media_btn_title: {
        color: Colors.es_black,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12)
    },
    es_ai_list_img: {
        height: hs(35),
        width: hs(35),
        marginRight: hs(7),
    },
    es_ai_list_imgs: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",

    },
    es_img: {
        height: hs(13),
        width: hs(13),
        marginLeft: hs(7)
    },
    es_image: {
        height: "100%",
        width: "100%"
    },
    es_btn_visit_link: {
        backgroundColor: Colors.es_dark_sky_blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hs(11),
        borderRadius: hs(6)
    },
    es_btn_title: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.es_black
    },
    es_suggest_btn: {
        borderColor: Colors.es_dark_sky_blue,
        borderWidth: hs(1.6),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hs(11),
        borderRadius: hs(6),
        marginTop: hs(15),
        marginBottom: hs(10)
    },

})