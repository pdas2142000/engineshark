/** React Imports */
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

/** Libraies */
import { useIsFocused } from '@react-navigation/native';

/** Local Imports */
import { Colors } from '../../utils/constants';

/** styles */
import { styles } from './single-tool-styles'
import AppHeader from '../../components/header/AppHeader';
import ToolView from '../../components/tool-view';
import AiSearchTools from '../../components/ai-search-tools';

const ToolsSingleScreen = ({ navigation, route }) => {
    const { id, type, select } = route.params;
    const IsFocused = useIsFocused()
    const [Data, SetData] = useState([])
    const [FilteredCards, SetFilteredCards] = useState([]);
    const [Load, SetLoad] = useState(false)
    const [Page, SetPage] = useState(1)

    const FetchData = async (slug) => {
        const Response = await fetch(`https://new.engineshark.com/welcome/get_tool?id=${slug}`);
        const ResponseData = await Response.json()
        SetData([ResponseData?.results])
    }

    const FetchOtherTools = async (Page) => {
        SetLoad(true);
        const Response = await fetch(`https://new.engineshark.com/welcome/tools?limit=${9}&page=${Page}&category=${select ? select : type}`)
        const ResponseData = await Response.json();
        SetFilteredCards(prevData => [...prevData, ...ResponseData?.results]);
        SetPage(prevPage => prevPage + 1);
        SetLoad(false);
    };

    const HandleScroll = ({ nativeEvent }) => {
        if (IsCloseToBottom(nativeEvent) && !Load) {
            if (!Load) {
                SetLoad(true)
                FetchOtherTools(Page + 1)
                SetLoad(false)
            }
        }
    };

    const IsCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 10;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    useEffect(() => {
        IsFocused && FetchData(id)
        IsFocused && FetchOtherTools(Page + 1)
    }, [id]);

    return (
        <>
            <AppHeader
                {
                    ...{
                        title: type,
                        navigation,
                        isBack: true
                    }
                }
            />
            {
                Load ?
                <View style={styles.loader}>
                    <ActivityIndicator color={Colors.es_blue} size={'large'} />
                </View>
                :
                <ScrollView
                    style={styles.container}
                    onScroll={HandleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.main}>
                        <View>
                            {Data?.map((item, index) => (
                                <ToolView {...{ item }} key={index + 1} />
                            ))}
                        </View>
                        <View>
                            <Text style={styles.es_ai_title}>More AI Tools</Text>
                        </View>
                        <View style={styles.es_ai_tool_cards}>
                            {FilteredCards?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SingleTool', { id: item?.id, type: item?.name, select: type })}
                                        key={index + 1}
                                    >
                                        <AiSearchTools  {...{ item }} key={index + 1} navigation={navigation} type={item?.type} />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            }
        </>
    );
};

export default ToolsSingleScreen;

