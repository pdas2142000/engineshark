import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { hs, ms } from '../../utils/helpers/Metrics'
import { Colors, Fonts, TitleFont } from '../../utils/constants'

const AiSearchTools = ({item,navigation,handleArrowClick,type}) => {

    return (
        <TouchableOpacity  style={styles.es_business_area}   onPress={() => navigation.navigate('SingleTool', { id: item?.id, type: item?.name, select: type })}>
                <View style={styles.es_business_imgs}>
                    <Image source={{uri:item?.image}} style={styles.es_business_image} />
                </View>
            <View style={styles.es_business_content_area}>
                <View style={styles.es_business_tile_area}>
                    <Text style={styles.es_title}>{item.name}</Text>
                </View>
                <Text style={styles.es_content}  numberOfLines={3} ellipsizeMode='tail'>{item.description.trim()}</Text>
                <View style={styles.es_business_btn_area}>
                    <TouchableOpacity style={styles.es_business_btn} >
                        <Text style={styles.es_button_title}>{item.type}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AiSearchTools

const styles = StyleSheet.create({
    es_business_area: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: hs(30),
        backgroundColor: Colors.es_sky_blue,
        borderColor: "#e1e1e1",
        borderWidth: hs(0.8),
        borderRadius: hs(8),
        zIndex:-9999,
    },
    es_business_imgs: {
        height:ms(170),
        width:"100%",
        padding:ms(20)
    },
    es_business_image: {
        height: "100%",
        width: "100%",
        borderRadius:ms(10),
        resizeMode: "cover"
    },
    es_business_content_area: {
        padding:hs(10)
     },
     es_business_tile_area: {
         flexDirection: 'row',
         alignItems: "center",
         marginBottom: hs(6),
         color: Colors.es_black
     },
    es_title: {
        color: "#2d6fc3",
        fontFamily:TitleFont.title_font_600,
        fontSize: ms(17),
    },
    es_business_arrow_imgs: {
        height: hs(18),
        width: hs(18),
        marginLeft: hs(10),
    },
    es_business_arrow_image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover"
    },
    es_content: {
        fontSize: ms(13),
        fontFamily: Fonts.Font_400,
        lineHeight: hs(22),
        marginBottom: hs(4),
        color: Colors.es_black,
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
        paddingVertical: hs(6),
        paddingHorizontal: hs(12),
        backgroundColor: "#d5ddeb",
    },
    es_button_title: {
        fontFamily: Fonts.Font_600,
        color: 'black',
        fontSize: ms(12),
    },
    es_load_btn_area: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 20,
        marginTop: hs(8)
    },
    es_load_btn: {
        borderRadius: hs(30),
        paddingVertical: hs(10),
        paddingHorizontal: hs(27),
        backgroundColor: Colors.es_blue,
        zIndex: 20,
    },
    es_load_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
})