
import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/Metrics";
import { Colors, Fonts } from "../../utils/constants";

export const styles = StyleSheet.create({
    es_ai_card:{
        backgroundColor:'#f6f6f6',
        borderRadius:ms(13),
        marginBottom:ms(15),
        padding:ms(20)
    },
    es_title:{
        textAlign:"center",
        fontFamily:Fonts.Font_700,
        fontSize:ms(25),
        paddingVertical:ms(20),
        color:Colors.es_black
    },
    es_ai_card_bg:{
      paddingHorizontal:ms(45),
    },
    es_img_wrap:{
        height:ms(130),
    },
    es_img:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        borderRadius:ms(10)
    },
    es_btn_wrap:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:ms(20),
    },
    es_btn:{
        backgroundColor:Colors.es_blue,
        marginRight:ms(10),
        marginBottom:ms(10),
        paddingHorizontal:ms(13),
        paddingVertical:ms(10),
        borderRadius:ms(10),
    },
    es_ai_card_content:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:ms(10),
        justifyContent:"center",
    },
    es_ai_title:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(16),
        color:Colors.es_black
    },
    es_ai_btn:{
        fontFamily:Fonts.Font_400,
        fontSize:ms(12),
        color:Colors.es_black
    },
    es_ai_premium_btn:{
        borderColor:'#888888',
        borderWidth:ms(0.9),
        paddingHorizontal:ms(5),
        paddingVertical:ms(3),
        borderRadius:ms(6),
        marginRight:ms(10),
        marginTop:ms(10)
    },
    es_btn_text:{
        color:Colors.es_white,
        fontFamily:Fonts.Font_500,
        fontSize:ms(13),
    },
    es_ai_content:{
        fontFamily:Fonts.Font_400,
        lineHeight:ms(20),
        color:'#1a1a1a',
        fontSize:ms(14),
        textAlign:"center",
    }
})