import {StyleSheet} from 'react-native'
import { Colors, Fonts } from '../utils/constants'
import { ms } from '../utils/helpers/Metrics'

export const BannerStyles = StyleSheet.create({
    es_banner_img:{
        width: "100%",
        resizeMode:"cover",
        paddingVertical:ms(35),
    },
    es_banner_content:{
        paddingHorizontal:ms(15),
    },
    es_banner_title:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(21),
        color:Colors.es_white,
        textAlign:"center",
        marginBottom:ms(15)
    },
    es_banner_text:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(13),
        color:Colors.es_white,
        textAlign:"center",
        marginBottom:ms(15),
        lineHeight:ms(18)
    },
    es_banner_txt:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(13),
        color:Colors.es_white,
        textAlign:"center",
        lineHeight:ms(18)
    },
    es_banner_input:{
        textAlign:"center",
        width:"80%",
        marginBottom:ms(10)
    },
    es_banner_bottom_text:{
        textAlign:"center",
        fontFamily:Fonts.Font_600,
        color:'#ffffffbf',
        fontSize:ms(11)
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)', 
    },
})