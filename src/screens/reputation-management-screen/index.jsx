import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms, vs } from '../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import BusinessPackages from '../../components/project-components/business-packages';

const ReputationManagementScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    isBack: true,
                    navigation,
                    title: 'RM Details',
                }}
            />
            <View>
                <ScrollView>
                    <View style={styles.es_rm_block}>
                        {RMdata.map((item, index) => {
                            return (
                                <View
                                    key={index + 1}
                                    style={[
                                        styles.es_rm_data_area,
                                        { backgroundColor: item.backgroundColor },
                                    ]}
                                   >
                                    <View style={styles.es_space_bar}>
                                        <View style={styles.es_rm_img_block}>
                                            <Image source={item.imgs} style={styles.es_rm_img} />
                                        </View>
                                        {
                                            item.title ? <Text style={styles.es_rm_title}>{item?.title}</Text> : null
                                        }
                                        {
                                            item.text ? <Text style={styles.es_rm_text}>{item?.text}</Text> : null
                                        }
                                        {
                                            item?.list?.map((val, index) => {
                                                return (
                                                    <View key={index + 1} style={styles.es_rm_list_area} >
                                                        <View style={styles.es_rm_bullet_dot} />
                                                        <Text style={styles.es_rm_text_list}>{val?.text}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    {/* <View style={styles.es_pricing_cards}>
                        {CardsData.map(item => {
                            return <PersonalSocialBusiness {...{ item, navigation }} key={item.title} />
                        })}
                    </View> */}
                    <View >
                        <Text  style={styles.es_packages_title}>Business Packages</Text>
                        {
                            BusinessPacakge.map((item, index) => {
                                return <BusinessPackages key={index+1} {...{ item, navigation }} />
                            })
                        }
                    </View>
                    <View style={{ marginBottom: hs(120) }}>
                        <Text  style={styles.es_packages_title}>Personal Packages</Text>
                        {
                            PersonalPackage.map((item, index) => {
                                return <BusinessPackages  key={index + 1} {...{ item, navigation }} />
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ReputationManagementScreen;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    es_space_bar: {
        marginHorizontal: hs(15),
        marginVertical: hs(70),
    },
    es_rm_img_block: {
        height: hs(200),
    },
    es_rm_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: hs(20),
    },
    es_rm_text: {
        fontFamily: Fonts.Font_600,
        fontWeight: "500",
        color: Colors.es_lite_blue,
        lineHeight: hs(27),
        fontSize: ms(16),
        width: '100%',
    },
    es_rm_title: {
        fontFamily: TitleFont.Font_800,
        fontSize: ms(40),
        marginTop: hs(15),
        fontWeight: '500',
        marginBottom: hs(10),
        color: Colors.black
    },
    es_rm_list_area: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hs(7),
    },
    es_rm_bullet_dot: {
        backgroundColor: Colors.es_blue,
        height: hs(7),
        width: hs(7),
    },
    es_rm_text_list: {
        color: Colors.es_lite_blue,
        fontSize: ms(16),
        fontFamily: Fonts.Font_500,
        paddingVertical: vs(4),
        paddingLeft: hs(9),
    },
    es_pricing_cards: {
        backgroundColor: "#f8f8f8",
        paddingVertical: hs(38),
    },
    es_packages_title:{
        marginHorizontal:hs(15),
        fontSize:ms(29),
        fontFamily:TitleFont.title_font_600,
        textAlign:"center",
        marginTop:hs(20),
        
    }
});
const RMdata = [
    {
        id: 1,
        title: 'Reputation Management',
        text: 'In todays digital age, your online reputation can make or break your personal brand or business. Our mission is to help you take control of your online image, boost your credibility, and thrive in the digital world.',
        imgs: require('../../../assets/images/reputation.webp'),
        backgroundColor: '#e9eef7',
    },
    {
        id: 2,
        title: 'Why Reputation Management Matters',
        text: 'Your online reputation is a valuable asset that influences peoples perceptions of you or your brand. Potential customers, partners, and employers often turn to the internet to learn about you. Negative comments, reviews, or content can harm your reputation and affect your success. Our reputation management services are designed to ensure you put your best foot forward online.',
        imgs: require('../../../assets/images/business-cooperation.webp'),
    },
    {
        id: 3,
        title: 'Our Approach',
        text: 'At Engine Shark, we employ cutting-edge technology and strategies to monitor, repair, and enhance your online reputation. Our team of experts is dedicated to crafting a positive online image for you or your business.',
        imgs: require('../../../assets/images/hands-holding-puzzle.webp'),
    },
    {
        id: 4,
        title: 'Services We Offer',
        imgs: require('../../../assets/images/modern-equipped.webp'),
        backgroundColor: '#e9eef7',
        list: [
            {
                text: "Social Media Monitoring and Engagement"
            },
            {
                text: "Online Review Management"
            },
            {
                text: "Content Creation and Promotion"
            },
            {
                text: "Search Engine Optimization (SEO) for Positive Content"
            },
            {
                text: "Crisis Management and Reputation Repair"
            }
        ]
    },
];

const BusinessPacakge = [
    {
        id: 1,
        title: 'SILVER',
        ID: '3P5HDETANUUL8',
        link: "https://buy.stripe.com/9AQ9DC8CA2LAcs8aES",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Text'
            },
            {
                id: 3,
                points: 'Audit'
            },

        ],
        price: '$1500',
        btn: 'Buy now',
    },
    {
        id: 2,
        title: 'GOLD',
        ID: "WPGJB9AKWZ9W4",
        link: "https://buy.stripe.com/9AQ6rq064bi61Nu3cr",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Video'
            },
            {
                id: 3,
                points: 'Search Engine Submission (250)'
            },
            {
                id: 4,
                points: ' Monitoring'
            },
            {
                id: 5,
                points: 'Social Media Account'
            },
            {
                id: 6,
                points: 'Content'
            },

            {
                id: 7,
                points: 'Domain Purchases'
            },
            {
                id: 8,
                points: 'Real-Time Updates'
            },
            {
                id: 9,
                points: 'Increase Name Ranking'
            },

        ],
        price: '$3000',
        btn: 'Buy now',
    },
    {
        id: 2,
        title: 'PLATINUM',
        ID: "WPGJB9AKWZ9W4",
        link: "https://buy.stripe.com/28o1767yw5XMeAgdR6",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Video'
            },
            {
                id: 3,
                points: 'Search Engine Submission (250)'
            },
            {
                id: 4,
                points: "Website",

            },
            {
                id: 5,
                points: ' Monitoring'
            },
            {
                id: 6,
                points: 'Social Media Optimizations'
            },
            {
                id: 7,
                points: 'Full Web Optimization'
            },

            {
                id: 8,
                points: 'Content'
            },
            {
                id: 9,
                points: 'Domain Purchasing'
            },
            {
                id: 10,
                points: 'Real-Time Updates'
            },
            {
                id: 11,
                points: "Increase Name Ranking"
            },
            {
                id: 12,
                points: "Press Releases"
            }

        ],
        price: '$5000',
        btn: 'Buy now',
    },
]
const PersonalPackage = [
    {
        id: 1,
        title: 'SILVER',
        link: "https://buy.stripe.com/dR68zybOM99Y4ZGcMX",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Text'
            },
            {
                id: 3,
                points: 'Audit'
            },

        ],
        price: '$500',
        btn: 'Buy now',
    },
    {
        id: 2,
        title: 'GOLD',
        link: "https://buy.stripe.com/dR6aHG6us5XM2Ry00c",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Video'
            },
            {
                id: 3,
                points: 'Search Engine Submission (250)'
            },
            {
                id: 4,
                points: ' Monitoring'
            },
            {
                id: 5,
                points: 'Social Media Account'
            },
            {
                id: 6,
                points: 'Content'
            },

            {
                id: 7,
                points: 'Domain Purchases'
            },
            {
                id: 8,
                points: 'Real-Time Updates'
            },
            {
                id: 9,
                points: 'Increase Name Ranking'
            },

        ],
        price: '$1500',
        btn: 'Buy now',
    },
    {
        id: 2,
        title: 'PLATINUM',
        link: "https://buy.stripe.com/bIY2ba2ecgCqcs8eV7",
        lists: [
            {
                id: 1,
                points: 'Profile'
            },
            {
                id: 2,
                points: 'Video'
            },
            {
                id: 3,
                points: 'Search Engine Submission (250)'
            },
            {
                id: 4,
                points: "Website",

            },
            {
                id: 5,
                points: ' Monitoring'
            },
            {
                id: 6,
                points: 'Social Media Optimizations'
            },
            {
                id: 7,
                points: 'Full Web Optimization'
            },

            {
                id: 8,
                points: 'Content'
            },
            {
                id: 9,
                points: 'Domain Purchasing'
            },
            {
                id: 10,
                points: 'Real-Time Updates'
            },
            {
                id: 11,
                points: "Increase Name Ranking"
            },
            {
                id: 12,
                points: "Press Releases"
            }

        ],
        price: '$5000',
        btn: 'Buy now',
    },
]