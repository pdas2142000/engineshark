import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms, vs } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import RNFetchBlob from 'rn-fetch-blob';

const PersonalSocialMediaScreen = ({ navigation }) => {
    
    const [initialRequestLoading, setInitialRequestLoading] = useState(true);
    const [personalPackages, setPersonalPackages] = useState({
        personal: '',
    });

    const CardsData = [
        {
            imgs: require('../../../assets/images/personal-essential.webp'),
            title: 'Personal Essential',
            text_one: 'Plan Type : Personal Essential',
            text_two: 'Usernames : 1+alternate',
            text_four: 'Social Profiles : 25 profiles (complete signups)',
            link:"https://buy.stripe.com/aEU0326usfym8bS3cc"
        },
    ];

    const fetchData = async () =>{
        const response = await RNFetchBlob.fetch('GET','https://engineshark.com/welcome/paypal', {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
          })
          const responseData = JSON.stringify(response.data);
          setPersonalPackages({
            personal: responseData.personal ? responseData.personal : '',
          });
    }

    useEffect(()=>{
        fetchData()
    },[])
    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    navigation,
                    isBack: true,
                    title:"Personal social media"
                }}
            />
            <ScrollView decelerationRate={0.997}  style={styles.es_main}>
                <View style={styles.es_title_area}>
                    <View style={styles.es_space_block}>
                        <View style={styles.es_psm_img_block}>
                            <Image
                                source={require('../../../assets/images/social.webp')}
                                alt="Psm image"
                                style={styles.es_psm_img}
                            />
                        </View>
                        <Text style={styles.es_title_text}>
                            Personal Social Media Management Tool
                        </Text>
                        <Text style={styles.es_text}>
                            A business social media management tool is a comprehensive platform designed to assist businesses 
                            in managing their social media presence effectively. 
                        </Text>
                    </View>
                </View>
                <View style={styles.es_space_block_text}>
                    <Text style={styles.es_text}>
                        A personal social media management tool serves as a centralized platform for individuals to efficiently handle their various social media accounts. These tools offer a range of features, including content scheduling, real-time monitoring, audience engagement, 
                        and performance analytics. By consolidating multiple social media platforms into one dashboard, users can streamline their workflows, saving time and effort. Whether it's scheduling posts in advance, responding to messages and comments, or analyzing the effectiveness of their content, these tools empower 
                        individuals to effectively manage their online presence and engage with their audience across different social media channels.
                    </Text>
                </View>
                <View>
                    {CardsData.map((item, index) => {
                        return (
                            <View  key={index + 1} style={styles.es_priceCard}>
                                <View style={styles.es_psm_img_block}>
                                    <Image source={item.imgs} style={styles.es_psm_img} />
                                </View>
                                <Text style={styles.es_priceCardTitle}>{item.title}</Text>
                                <View style={styles.es_card_content_area}>
                                    <View style={styles.es_card_text_points}>
                                        <View style={styles.es_bullet_dot} />
                                        <Text style={styles.es_priceCardContent}>
                                            {item.text_one}
                                        </Text>
                                    </View>
                                    <View style={styles.es_card_text_points}>
                                        <View style={styles.es_bullet_dot} />
                                        <Text style={styles.es_priceCardContent}>
                                            {item.text_two}
                                        </Text>
                                    </View>
                                    <View style={styles.es_card_text_points}>
                                        <View style={styles.es_bullet_dot} />
                                        <Text style={styles.es_priceCardContent}>
                                            {item.text_four}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.es_priceCardPrice}>$60</Text>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <TouchableOpacity  onPress={()=>navigation.navigate('Web',{url:item.link})}>
                                        <View style={styles.es_add_cart_btn}>
                                            <Text style={styles.es_add_cart_btn_title}>
                                                Buy now
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
export default PersonalSocialMediaScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    es_main:{
        flex:1,
    },
    es_title_area: {
        backgroundColor: '#d4dbe8',
        paddingVertical: hs(40),
    },
    es_space_block: {
        marginHorizontal: hs(15),
    },
    es_space_block_text: {
        marginHorizontal: hs(15),
        marginTop: hs(35),
    },
    es_title_text: {
        fontFamily: TitleFont.Font_800,
        fontSize: ms(20),
        marginTop: hs(15),
        fontWeight: '600',
        marginBottom: hs(10),
        color:Colors.black,
    },
    es_psm_img_block: {
        height: hs(250),
        marginVertical: hs(15),
    },
    es_psm_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: hs(15),
    },
    es_text: {
        fontFamily: Fonts.Font_400,
        color: Colors.es_lite_blue,
        lineHeight: hs(29),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
    },
    es_priceCard: {
        backgroundColor: '#f8f8f8',
        zIndex: 1,
        paddingVertical: hs(40),
        paddingHorizontal: hs(20),
    },
    es_priceCardTitle: {
        color: 'black',
        fontSize: ms(40),
        fontFamily: Fonts.Font_600,
    },
    es_card_text_points: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_bullet_dot: {
        backgroundColor: Colors.es_blue,
        height: hs(7),
        width: hs(7),
    },
    es_card_content_area: {
        marginTop: hs(20),
    },
    es_priceCardContent: {
        fontFamily: Fonts.Font_400,
        color: Colors.es_lite_blue,
        lineHeight: hs(29),
        fontSize: ms(17),
        paddingVertical: vs(4),
        paddingLeft: hs(9),
    },
    es_priceCardPrice: {
        color: Colors.es_blue,
        fontSize: ms(26),
        fontFamily: Fonts.Font_600,
        marginBottom: hs(12),
        marginTop: hs(24),
    },
    es_add_cart_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(10),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
    },
    es_add_cart_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
});
