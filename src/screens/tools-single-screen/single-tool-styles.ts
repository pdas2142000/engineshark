
import {StyleSheet} from 'react-native'
import { ms } from '../../utils/helpers/Metrics'
import { Colors, Fonts } from '../../utils/constants'

export const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.es_white,
        flex:1
    },
    main:{  
        padding:ms(15)

    },
    es_ai_title:{
        textAlign: "center",
        fontFamily: Fonts.Font_600,
        fontSize: ms(22),
        marginVertical: ms(20),
        color: Colors.es_black,
    },
    loader:{
        alignItems: "center", 
        justifyContent: "center", 
        flex: 0.5,
        flexGrow: 1
    } 
})