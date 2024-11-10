import { StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms, vs } from '../../utils/helpers/Metrics';
import { Colors, Fonts } from '../../utils/constants';
import PersonalSocialBusiness from '../../components/project-components/social-media-packages';

const SocialMediaManagementScreen = ({ navigation }) => {
    const CardsData = [
        {
            title: 'Business Starter',
            text_one:'We secure your Business, Brand or reputation by claiming profile for you on 100 of the most popular Social Networks.Your logo,description,website URL, etc-Very effectve for SEO and brand awareness',
            price: '$249',
            btn:"Buy now",
            link:"https://buy.stripe.com/5kA9DCdWU2LA63K14m",
            ID:"8M94W3ZTLG7JA",
        },
        {
            title: 'Personal Essential',
            text_one:'Complete Signup of all profile info:photos,bio,URL,and description on the top 25 most essential and popular social media website for personal branding',
            price: '$84.95',
            btn:"Buy now",
            link:"https://buy.stripe.com/9AQcPOcSQbi6eAgfZf",
            ID:'RVVLE8HVWQKAS',
        },
        {
            title: 'Corporate Starter',
            text_one:`Complete Signup of all profile info:photos,bio,URL,and description on 150 social media websites. Same s above, but for more sites - 150'em`,
            price: '$349',
            btn:"Buy now",
            link:"https://buy.stripe.com/4gw6rqg5271QdwcfZh",
            ID:"22FJ4KPJFRPKA",
        },
        {
            title: 'Corporate Complete',
            text_one:'Complete Signup of all profile info: photos, bio, URL and description on 300 social media websites. Same as Business and Corporate, but for 300 sites',
            price: '$649',
            btn:"Buy now",
            link:'https://buy.stripe.com/4gw3fe6us3PEdwcbIM',
            ID:"82JHN78UJL6EJ",
        },
    ];
    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    navigation,
                    isBack: true,
                    title:"Social Media"
                }}
            />
            <ScrollView>
                <View style={styles.es_title_area}>
                    <View  style={styles.es_space_block}>
                          <View style={styles.es_psm_img_block}>
                        <Image
                            source={require('../../../assets/images/social2.webp')}
                            alt="Psm image"
                            style={styles.es_psm_img}
                        />
                    </View>
                    <Text style={styles.es_title_text}>
                        Business Social Media Management Tool
                    </Text>
                    <Text  style={styles.es_text}>
                        A tool designed to help businesses optimize their social media presence.
                    </Text>
                    </View>
                </View>
                 <View style={styles.es_space_block_text}>
                    <Text style={styles.es_text}>
                        A business social media management tool is a comprehensive platform designed to assist businesses in managing their social media presence effectively. These tools typically offer a wide range of features tailored to meet the needs of businesses, including content scheduling, analytics, social listening, team collaboration, and customer engagement tools. Business social media management tools enable companies to streamline their social media activities, maintain a consistent brand voice across platforms, track key performance metrics, and engage with their audience in meaningful ways. They often support integration with multiple social media platforms such as Facebook, Twitter, LinkedIn, Instagram, and more, allowing businesses to manage all their accounts from a single dashboard. Additionally, these tools may offer advanced features like ad management, audience segmentation, and competitive analysis to help businesses optimize their social media strategies and achieve their marketing objectives.
                    </Text>
                    </View>
                 <View  style={styles.es_pricing_cards}>
                    {CardsData.map((item, index) => {
                        return<PersonalSocialBusiness {...{item,navigation}}  key={index+1}/>
                    })}
                 </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
       
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
        fontFamily: Fonts.Font_700,
        fontSize: ms(20),
        marginTop: hs(10),
        color:Colors.es_black
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
    es_pricing_cards:{
        backgroundColor:"#f8f8f8",
        paddingVertical:hs(50),
    }
   
});

export default SocialMediaManagementScreen;
