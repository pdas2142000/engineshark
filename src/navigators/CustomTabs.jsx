import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { hs, ms } from '../utils/helpers/Metrics';
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Fonts } from '../utils/constants';
import CrossIcon from "../../assets/icons/cross-circle.svg"
import { IconProps } from '../utils/helpers/Iconprops';

const CustomTabs = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.main}>
            <StatusBar backgroundColor="#385591" barStyle="dark-content" />
            <View>
                <SafeAreaView />
                 <View  style={styles.es_menu_border}>
                    <Text style={styles.es_drawer_title}>Menu</Text>
                    <TouchableOpacity style={styles.es_cross_icon} onPress={()=>navigation.closeDrawer()}>
                        <CrossIcon {...IconProps(16)} fill={"#ff0000a6"}/>
                    </TouchableOpacity>
                 </View>
                <View>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label = options.drawerlabel !== undefined
                            ? options.drawerlabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;
                        const icon = options.drawerIcon ? options.drawerIcon : null;
                        const isFocused = state.index === index;
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.name,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({ name: route.name, merge: true });
                            }
                        };
                        return (
                            <View key={route.key} style={[styles.drawer_list]}>
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={[styles.navigation_list]}>
                                    <View>
                                        {
                                            icon ?
                                                <options.drawerIcon
                                                isFocused={isFocused}
                                                color={isFocused ? Colors.white : '#a9a5a5'}
                                            /> : null
                                        }
                                    </View>
                                    {
                                        label ? <Text style={[styles.title_text]}>{label}</Text> : null
                                    }
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: "column",
        backgroundColor:"white",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
    },
    drawer_list: {
        marginTop: hs(17)
    },
    es_drawer_title: {
        color: "black",
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        marginVertical: hs(16),
        marginHorizontal:hs(10)
    },
    es_menu_border:{
        borderBottomWidth:1,
        borderBottomColor:"#e5e6e8",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    es_cross_icon:{
        marginRight:hs(10),
    },
    es_menutitle_block: {
        paddingLeft: hs(8),
    },
    title_text: {
        color: "black",
        fontSize: ms(11),
        fontFamily: "Montserrat-Regular"
    },
    active_text: {
        color: "white",
        fontSize: ms(14),
        paddingLeft: hs(15),
    },
    navigation_list: {
        flexDirection: "column",
        marginHorizontal: hs(10),
    }

})

export default CustomTabs