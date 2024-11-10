import { StyleSheet } from 'react-native'
import { ms, hs, vs } from '../../src/utils/helpers/Metrics'
import { Fonts, Colors } from '../../src/utils/constants'

const formStyles = StyleSheet.create({
    input_wrap: {
        marginVertical: ms(10)
    },
    input_label: {
        fontFamily: Fonts.Font_500,
        color: Colors.es_lite_blue,
        fontSize: ms(16),
        marginBottom: vs(10),
        textTransform: 'capitalize',
        marginLeft: ms(6)
    },
    input_field_wrap: {
        borderColor: "#dedede",
        borderWidth: hs(0.9),
        borderRadius: hs(10),
        paddingHorizontal: hs(20),
        height: ms(48),
        flexDirection: "row",
    },
    es_form_icon:{
        backgroundColor:Colors.es_blue,
        padding:hs(10),
    },
    input_field_wrap_lg: {
        height: ms(120),
    },
    input_field: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_400,
        flex: 1,
        height: '100%',
        color:Colors.es_black
    },
    input_field_textarea: {
        paddingTop: ms(14),
        paddingBottom: ms(14),
        textAlignVertical: 'top',
    },
    input_text: {
        color: Colors.es_red,
        fontSize: ms(14),
        marginLeft: ms(6),
        marginTop: vs(6)
    },
    input_image_block: {
        width: '100%',
        aspectRatio: 1 / 0.45,
        borderColor: "#dedede",
        borderWidth: hs(0.9),
        borderRadius: hs(12),
        padding: hs(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hs(10)
    },
    input_image_block_square: {
        width: ms(160),
        aspectRatio: 1 / 1,
        backgroundColor: Colors.es_lite_blue,
        borderRadius: hs(12),
        padding: hs(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    input_image_empty: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input_image: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    input_wrap: {
        marginVertical: ms(10),
        marginHorizontal:hs(5)
    },
    input_label: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        marginBottom: vs(10),
        textTransform: 'capitalize',
        marginLeft: ms(6),
        color:Colors.es_black
    },
    input_field_wrap: {
        overflow: 'hidden',
        borderRadius: hs(10),
        paddingLeft: hs(20),
        height: ms(45),
        flexDirection: "row",
        borderColor: "#dedede",
        borderWidth: hs(0.9),
    },
    input_field_wrap_lg: {
        height: ms(120),
    },
    input_field: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        flex: 1,
        height: '100%',
        color:Colors.es_black
    },
    input_field_textarea: {
        paddingTop: ms(14),
        paddingBottom: ms(14),
        textAlignVertical: 'top'
    },
    input_text: {
        fontSize: ms(14),
        marginLeft: ms(6),
        marginTop: vs(6)
    },
    input_btn: {
        backgroundColor: Colors.es_white,
        borderColor: "#dedede",
        borderWidth: hs(0.9),
        borderRadius: hs(7),
        paddingHorizontal: hs(20),
        height: ms(45),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input_text: {
        color: Colors.es_red,
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
    },
    input_btn_text:{
        fontSize:ms(15),
        fontFamily: Fonts.Font_600,
        color:"black",
    },
    input_btn_placeholder: {
        fontSize:ms(15),
        fontFamily: Fonts.Font_600,
        color:"#8f8f91"
    },
    es_bs_title_search_input_wrap: {
        backgroundColor:Colors.es_white,
        borderColor: "#dedede",
        borderWidth: hs(0.9),
        borderRadius: hs(6),
        padding: hs(15),
        backgroundColor: 'white',
        marginHorizontal: hs(15),
        flexDirection: "row",
        marginVertical: hs(15)
    },
    es_search_input: {
        fontSize: 16,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
    },
    es_bs_title_area: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: vs(14),
        paddingHorizontal: hs(14),
        marginHorizontal: hs(13)
    },
    es_bs_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(18),
        color: Colors.es_black,
        textTransform: 'capitalize',
        textAlign: "center",
        position: "relative",
        marginBottom: hs(10)
    },
    es_bs_close: {
        borderRadius: ms(8),
        width: ms(32),
        height: ms(32),
        position: "absolute",
        top: hs(15),
        right: 0
    },
    es_search_input_wrap: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.es_lite_blue,
        borderRadius: hs(12),
        height: ms(40),
        overflow: 'hidden',
        marginHorizontal: ms(20),
    },
    es_search_input: {
        paddingHorizontal: hs(14),
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.es_black,
        flex: 1,
        height: '100%',
    },
    es_search_icon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    select_item: {
        paddingRight: hs(20),
        paddingVertical: vs(10),
        paddingHorizontal: hs(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    select_text: {
        textTransform: 'capitalize',
        fontSize: ms(16),
        fontFamily: Fonts.Font_500,
        marginBottom: ms(3),
        color:Colors.es_black,
    },
    select_item_content: {
        flex: 1
    },

})

export default formStyles

