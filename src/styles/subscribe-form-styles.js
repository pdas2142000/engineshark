import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "../utils/constants";
import { hs, ms, vs } from "../utils/helpers/Metrics";
import { deviceType } from "../utils/helpers/Metrics";

export const subcsribeformstyles = StyleSheet.create({
    input_wrap: {
        marginTop: ms(7),
        width:"100%"
    },
    input_label: {
        fontFamily: Fonts.Font_600,
        color: Colors.tq_black,
        fontSize: ms(16),
        textTransform:'capitalize',
        marginLeft: ms(6)
    },
    input_field_wrap: {
        backgroundColor: Colors.es_white,
        borderRadius: hs(8),
        paddingLeft: hs(20),
        paddingRight: hs(10),
        height: Platform.OS == 'ios'? ms(45) : ms(45),
        overflow:'visible',
        flexDirection: "row",
        borderColor:Colors.tq_black + '80',
        borderWidth:ms(1),
        alignItems:"center",
    },
    input_field_wrap_lg: {
        height: ms(120),
    },
    input_field: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_5c00,
        color: Colors.es_black,
        flex: 1,
        height: '100%',
    },
    input_field_textarea: {
        paddingTop: ms(14),
        paddingBottom: ms(14),
        textAlignVertical:'top'
    },
    input_text: {
        color: Colors.tq_error,
        fontSize: ms(14),
        marginLeft: ms(6),
        marginTop: vs(6)
    },
})