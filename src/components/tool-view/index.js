/** React Imports */
import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

/** Styles */
import { styles } from './tool-view-styles'

const ToolView = ({ item }) => {
    return (
        <View style={styles.es_ai_card}>
            <View style={styles.es_ai_card_bg}>
                <Text style={styles.es_title}>{item?.name}</Text>
                <View style={styles.es_img_wrap}>
                    <Image source={{ uri: item?.image }} style={styles.es_img} />
                </View>
                <View style={styles.es_btn_wrap}>
                    <TouchableOpacity style={styles.es_btn} onPress={() => Linking.openURL(item?.website)}>
                        <Text style={styles.es_btn_text}>Visit Tool Page</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.es_ai_content}>{item?.description?.trim()}</Text>
            <View style={styles.es_ai_card_content}>
                <TouchableOpacity style={styles.es_ai_premium_btn}>
                    <Text style={styles.es_ai_btn}>
                        {item?.type}
                    </Text>
                </TouchableOpacity>
                {
                    !item?.pricing ? null :
                    <TouchableOpacity style={styles.es_ai_premium_btn}>
                        <Text style={styles.es_ai_btn}>{item.pricing}</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default ToolView