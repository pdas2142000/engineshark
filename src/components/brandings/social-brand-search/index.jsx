import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import BrandingLabel from '../../project-components/branding-label';
import { hs, ms } from '../../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../../utils/constants';
import PersonalSocialBusiness from '../../project-components/social-media-packages';
import RNFetchBlob from 'rn-fetch-blob';

const SocialBrandSearch = ({ search }) => {

    const [brands, setBrands] = useState(Blogging)
    const [searchValue, setSearchValue] = useState(search)
    const [loader, setLoader] = useState(false)

    const fetchData = async (searchTerm, index = 0) => {
        if (searchTerm) {
            const data = Blogging[index].images.map((item) => ({
                link: searchTerm,
                name: item.name,
            }))
       
           const parameters ='data=' + JSON.stringify(data)
            setLoader(true)
            const response = await RNFetchBlob.fetch(
                'POST',
                'https://new.engineshark.com/welcome/check_availability_bulk',
                {
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                parameters
            )
            
            const responseData = response?.data ? JSON.parse(response.data) : null;
                
            let brandData = Blogging.map((item, i) => {
                if (i != index) return item
                item.images.forEach((brand,index) => {
                    brand.result = true
                    brand.availability = responseData?.find((responseItem) => responseItem[brand.name])
                    if (brand.availability) {
                        brand.availability = brand.availability[brand.name] === "true";
                    }

                })
                return item
            })
            setBrands(brandData)
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchData(search)
    }, [search])

    const handleChangeText = (text) => {
        setBrands(Blogging)
        setSearchValue(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.es_tm_bg}>
                <View style={styles.es_brand_text_field}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#757575"
                        value={searchValue}
                        onChangeText={handleChangeText}
                    />
                </View>
                <View style={styles.es_start_btn_area}>
                    <TouchableOpacity style={styles.es_start_btn} onPress={() => fetchData(searchValue)}>
                        {loader ? (
                            <ActivityIndicator size="small" color={Colors.es_white} />
                        ) : <Text style={styles.es_start_btn_title}>
                             SEARCH BRAND
                        </Text>}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.es_content_area}>
                <Text style={styles.es_content_title}>
                    Are you tired of going to multiple sites and wasting hours of time to see if your name is available 
                    whether it be for business or pleasure? Do you want an easier way to claim your name or your company 
                    brand name by going to one site only?
                </Text>
                <Text style={styles.es_content_text}>
                    ENGINE SHARK IS THE ANSWER!!!  We search all the murky waters of the internet so you do not have to. We simplify 
                    the process turning hours into seconds. Whether it is domain names, blogs, trademarks, bookmark COM businesses, 
                    communities, entertainment, microblogging, music, news, photos, technology, travel, videos, or trademarks, we will 
                    have the answer waiting for you in seconds. Engine Shark has the cutting-edge technology that other search engines 
                    envy and a world-class team to facilitate all of your needs.
                </Text>
                <Text style={styles.es_content_text}>
                    We help protect you from trademark infringement, cybersquatting, and misrepresentation of yourself or your brand.
                </Text>
            </View>
            <View style={styles.es_book_marking_block}>
                {brands?.map((item, index) => {
                    return (
                        <View key={index+1} style={[{ backgroundColor: item.backgroundColor }, styles.es_brand_data]}  >
                            <BrandingLabel {...{ item }}  fetchData={fetchData} i={index} searchValue={searchValue} loader={loader}/>
                        </View>
                    )
                })}
            </View>
            <View style={styles.es_cards_title_area}>
                <View style={styles.es_cards_content_area}>
                    <Text style={styles.es_cards_title}>Create a Free Profile</Text>
                    <Text style={styles.es_card_block_text}>
                        Now that you've checked a few sites to see where your profiles are
                        available, why not create a profile on EngineShark to keep track
                        of them all? Register on EngineShark to get started.
                    </Text>
                </View>
                <View>
                    {CardsData?.map((item, index )=> {
                        return <PersonalSocialBusiness  key={index+1} {...{ item }}  />;
                    })}
                </View>
            </View>
            <View style={styles.es_marketing_block}>
                {MarketingData?.map((item, index) => {
                    return (
                        <View  key={index + 1}>
                            <Text style={styles.es_marketing_title}>{item.title}</Text>
                            <View style={styles.es_marketing_cards}>
                                {item?.data?.map((item, index) => {
                                    return (
                                        <View  key={index + 1} style={styles.es_marketing_cards_data}>
                                            <Text style={styles.es_marketing_card_title}>
                                                {item.title}
                                            </Text>
                                            <Text style={styles.es_marketing_card_content}>
                                                {item.content}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default SocialBrandSearch
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },
    es_tm_bg: {
        backgroundColor: '#e9eef7',
        paddingVertical: hs(15),
    },
    es_brand_block: {
        backgroundColor: '#e9eef7',
        paddingVertical: hs(20),
        paddingHorizontal: hs(10),
    },
    es_brand_main_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(45),
        textAlign: 'center',
        marginTop: hs(15),
    },
    es_brand_text: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(20),
        fontSize: ms(16),
        width: '100%',
        marginVertical: hs(12),
        textAlign: 'center',
    },
    es_brand_text_field: {
        marginHorizontal: hs(15),
    },
    input: {
        height: hs(55),
        fontFamily: Fonts.Font_600,
        backgroundColor: 'white',
        borderColor: '#d1d5db',
        borderWidth: hs(1),
        elevation: 2,
        width: '100%',
        borderRadius: hs(4),
        paddingLeft: hs(15),
        paddingRight: hs(15),
        fontSize: ms(16),
        zIndex: 1,
        color: 'black',
        marginBottom: hs(15),
        marginTop: hs(20),
    },
    es_start_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hs(20),
        marginTop: hs(10),
    },
    es_start_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(12),
        width: "35%",
        backgroundColor: Colors.es_blue,
        alignItems: "center"
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_search_input_block: {
        marginHorizontal: hs(15),
        marginVertical: hs(16),
    },
    es_search_icon_block: {
        position: 'absolute',
        left: hs(7),
        zIndex: 2,
        top: hs(9),
    },
    es_input: {
        height: hs(57),
        fontFamily: Fonts.Font_500,
        backgroundColor: '#d7efef',
        elevation: 2,
        borderRadius: hs(10),
        paddingLeft: hs(56),
        paddingRight: hs(15),
        fontSize: ms(16),
        zIndex: 1,
        color: 'black',
    },
    es_searchButton: {
        justifyContent: 'center',
        height: hs(40),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: hs(60),
        width: hs(40),
    },
    es_content_area: {
        margin: hs(15),
    },
    es_content_title: {
        color: 'black',
        fontSize: ms(17),
        fontFamily: Fonts.Font_700,
        marginBottom: hs(10),
        lineHeight: hs(24),
    },
    es_content_text: {
        color: Colors.es_lite_blue,
        fontSize: ms(16),
        fontFamily: Fonts.Font_500,
        paddingVertical: hs(8),
        lineHeight: hs(30),
    },
    es_brand_title: {
        fontSize: ms(28),
        fontFamily: Fonts.Font_600,
        marginVertical: hs(10),
        textAlign: 'center',
    },

    es_book_marking_block: {
        paddingVertical: hs(55),

    },
    es_brand_data: {
        paddingVertical: hs(25),
    },
    es_brand_bookmarketing: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    es_bookmarketing_img_border: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '31%',
        margin: '1%',
        borderRadius: hs(4),
        borderColor: '#e7e7e7',
        borderWidth: hs(2),
        backgroundColor: 'white',
        height: hs(50),
    },
    es_bookmarketing_logo: {
        height: hs(70),
        width: hs(90),
    },
    es_bookmarketing_imgs: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    es_cards_content_area: {
        marginHorizontal: hs(15),
        marginBottom: hs(30),
    },
    es_cards_title_area: {
        backgroundColor: '#f2f2f2',
        paddingVertical: hs(80),
        marginTop: hs(20),
    },
    es_cards_title: {
        color: 'black',
        fontSize: ms(20),
        fontFamily: Fonts.Font_700,
    },
    es_card_block_text: {
        color: Colors.es_lite_blue,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        paddingVertical: hs(15),
        lineHeight: hs(26),
    },
    es_marketing_block: {
        marginVertical: hs(45),
        marginHorizontal: hs(15),
    },
    es_marketing_title: {
        color: 'black',
        fontSize: ms(18),
        fontFamily: TitleFont.title_font_600,
        fontWeight: '600',
        textAlign: 'center',
    },
    es_marketing_cards: {
        marginHorizontal: hs(10),
    },
    es_marketing_card_title: {
        color: 'black',
        fontSize: ms(19),
        fontFamily: Fonts.Font_700,
        marginBottom: hs(11),
    },
    es_marketing_cards_data: {
        backgroundColor: '#f8f8f8',
        marginTop: hs(35),
        marginVertical: hs(20),
        padding: hs(25),
    },
    es_marketing_card_content: {
        fontFamily: Fonts.Font_600,
        color: Colors.es_lite_blue,
        lineHeight: hs(24),
        fontSize: ms(15),
    },
});



const Blogging = [
    {
        id: 1,
        title: 'Blogging',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/BlogCatalog.jpg",
                name: "blogCatalog",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/BlogDrive.jpg",
                name: "blogdrive",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Blogher.jpg",
                name: "blogher",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Blogger.jpg",
                name: "blogger",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Blogigo.jpg",
                name: "blogigo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/blogster.jpg",
                name: "blogster",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/blogtalkradio.jpg",
                name: "blogtalkradio",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Bloopist.jpg",
                name: "bloopist",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Carbonmade.jpg",
                name: "carbonmade",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Disqus.jpg",
                name: "disqus",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/hatena.jpg",
                name: "hatena",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/InsaneJournal.jpg",
                name: "insaneJournal",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/IntenseDebate.jpg",
                name: "intenseDebate",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Blogging/Issuu.jpg",
                name: "issuu",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Blogging/Jigsy.jpg",
                name: "jigsy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/LiveJournal.jpg",
                name: "livejournal",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Medium.jpg",
                name: "medium",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/moonfruit.jpg",
                name: "moonfruit",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/MyBlogU.jpg",
                name: "myblogu",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Blogging/Notey.jpg",
                name: "notey",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Blogging/Pen.jpg",
                name: "pen",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Postagon.jpg",
                name: "postagon",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/SailBlogs.jpg",
                name: "sailblogs",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Blogging/Soup.jpg",
                name: "soup",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Thoughts.jpg",
                name: "thoughts",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Typepad.jpg",
                name: "typepad",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/Wordpress.jpg",
                name: "wordpress",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/weebly.jpg",
                name: "weebly",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 2,
        title: 'Bookmarketing',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/BlogMarks.jpg",
                name: "blogmarks",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Blogger.jpg",
                name: "blogger",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/CloudyTags.jpg",
                name: "cloudytags",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Delicious.jpg",
                name: "delicious",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Designfloat.jpg",
                name: "designfloat",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Diigo.jpg",
                name: "diigo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Folkd.jpg",
                name: "folkd",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/FollowUs.jpg",
                name: "followus",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/FortyThreeMarks.jpg",
                name: "marks",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/GimmeBar.jpg",
                name: "gimmeBar",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/LibraryThing.jpg",
                name: "librarything",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Netvouz.jpg",
                name: "netvouz",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Papaly.jpg",
                name: "papaly",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Pinterest.jpg",
                name: "pinterest",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Posteet.jpg",
                name: "Posteet",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Segnalo.jpg",
                name: "segnalo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Trendhunter.jpg",
                name: "trendhunter",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Wanelo.jpg",
                name: "wanelo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Weheartit.jpg",
                name: "weheartit",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Wishlistr.jpg",
                name: "wishlistr",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Wookmark.jpg",
                name: "wookmark",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Xerpi.jpg",
                name: "xerpi",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/bookmarking/Xmarks.jpg",
                name: "xmarks",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 3,
        title: 'Business',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/APSense.jpg",
                name: "apsense",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/ActiveRain.jpg",
                name: "activerain",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Adsoftheworld.jpg",
                name: "adsoftheworld",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Authorstream.jpg",
                name: "authorstream",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/BiggerPlate.jpg",
                name: "biggerplate",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/BiggerPockets.jpg",
                name: "biggerpockets",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/BizSugar.jpg",
                name: "bizsugar",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Coroflot.jpg",
                name: "coroflot",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Ebay.jpg",
                name: "ebay",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/edocr.jpg",
                name: "edocr",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Etsy.jpg",
                name: "etsy",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Fool.jpg",
                name: "fool",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Getsatisfaction.jpg",
                name: "getsatisfaction",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Kiva.jpg",
                name: "kkva",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/ProfNet.jpg",
                name: "profnetconnect",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/ReferralKey.jpg",
                name: "referralkey",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Slack.jpg",
                name: "slack",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Slideserve.jpg",
                name: "slideserve",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Smarterer.jpg",
                name: "smarterer",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Stocktwits.jpg",
                name: "stocktwits",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Storeboard.jpg",
                name: "storeboard",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/TestQ.jpg",
                name: "testQ",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/ThisNext.jpg",
                name: "thisnext",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/TradingView.jpg",
                name: "tradingview",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/TrepUp.jpg",
                name: "trepup",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/uservoice.jpg",
                name: "uservoice",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Viadeo.jpg",
                name: "viadeo",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Business/Xmind.jpg",
                name: "xmind",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Business/Yatedo.jpg",
                name: "yatedo",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 4,
        title: 'Community',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/AcademiaEDU.jpg",
                name: "academia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/BlackPlanet.jpg",
                name: "blackplanet",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/blurb.jpg",
                name: "blurb",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Blurtopia.jpg",
                name: "blurtopia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/bookcrossing.jpg",
                name: "bookcrossing",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Boonex.jpg",
                name: "boonex",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/CafeMom.jpg",
                name: "cafemom",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/DirtyUS.jpg",
                name: "dirtyus",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Community/Duno.jpg",
                name: "duno",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/EmpireAvenue.jpg",
                name: "empirekred",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/facebook.jpg",
                name: "facebook",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Community/FML.jpg",
                name: "fmylife",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/FaceParty.jpg",
                name: "faceparty",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Fixya.jpg",
                name: "fixya",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Fluther.jpg",
                name: "fluther",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/friendsite.jpg",
                name: "friendsite",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/goodreads.jpg",
                name: "goodreads",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Groups.jpg",
                name: "groups",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Community/hi5.jpg",
                name: "hi",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Hubpages.jpg",
                name: "hubpages",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Hubski.jpg",
                name: "hubski",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Instructables.jpg",
                name: "instructables",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Kickstarter.jpg",
                name: "kickstarter",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/KiwiBox.jpg",
                name: "kiwibox",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Lafango.jpg",
                name: "lafango",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Lefora.jpg",
                name: "lefora",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/lifeknot.jpg",
                name: "lifeknot",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/MadWhips.jpg",
                name: "madWhips",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/MeasuredUp.jpg",
                name: "measuredUp",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Minds.jpg",
                name: "minds",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/MiGente.jpg",
                name: "migente",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/MySpace.jpg",
                name: "myspace",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Community/Ning.jpg",
                name: "ning",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/PinkBike.jpg",
                name: "pinkbike",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/postcrossing.jpg",
                name: "postcrossing",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Proboards.jpg",
                name: "proboards",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/qmpeople.jpg",
                name: "qmpeople",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/RealTown.jpg",
                name: "realtown",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/RealitySandwich.jpg",
                name: "realitysandwich",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Sitepoint.jpg",
                name: "sitepoint",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Skyrock.jpg",
                name: "skyrock",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/SlideShare.jpg",
                name: "slideshare",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Slidepoint.jpg",
                name: "slidepoint",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Spruz.jpg",
                name: "spruz",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/steam.jpg",
                name: "steamcommunity",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Tagged.jpg",
                name: "tagged",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/takingitglobal.jpg",
                name: "takingitglobal",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/ToastTime.jpg",
                name: "timetoast",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/TodaysMeet.jpg",
                name: "todaysmeet",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Toluna.jpg",
                name: "toluna",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/UnitedCats.jpg",
                name: "unitedcats",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/uniteddogs.jpg",
                name: "uniteddogs",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Untappd.jpg",
                name: "untappd",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Community/Voat.jpg",
                name: "voat",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Wireclub.jpg",
                name: "wireclub",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/WittyProfiles.jpg",
                name: "wittyprofiles",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Community/Yuuby.jpg",
                name: "yuuby",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 5,
        title: 'Design',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/design/ArtFire.jpg",
                name: "artfire",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/Behance.jpg",
                name: "behance",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/Canva.jpg",
                name: "canva",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/Chicktopia.jpg",
                name: "chictopia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/ColourLovers.jpg",
                name: "colourlovers",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/Crokes.jpg",
                name: "crokes",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/DeviantArt.jpg",
                name: "deviantart",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/Fancy.jpg",
                name: "fancy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/HomeTalk.jpg",
                name: "hometalk",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/Jimdo.jpg",
                name: "jimdo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/MindMeister.jpg",
                name: "mindmeister",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/design/QBN.jpg",
                name: "qbn",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/society6.jpg",
                name: "society",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/design/WittyGraphy.jpg",
                name: "wittygraphy",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 6,
        title: 'Entertainment',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/BecomeGorgeous.jpg",
                name: "becomegorgeous",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/BoxedUp.jpg",
                name: "boxedup",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/CarDomain.jpg",
                name: "cardomain",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Chess.jpg",
                name: "chess",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Coolspotters.jpg",
                name: "coolspotters",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Cracked.jpg",
                name: "cracked",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/CrunchyRoll.jpg",
                name: "crunchyroll",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Curse.jpg",
                name: "curse",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Docur.jpg",
                name: "docur",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/FanPop.jpg",
                name: "fanpop",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/FashionFreax.jpg",
                name: "fashionfreax",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/GaiaOnline.jpg",
                name: "gaiaonline",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Gamespot.jpg",
                name: "gamespot",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/KnowYourMeme.jpg",
                name: "knowyourmeme",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Koinup.jpg",
                name: "koinup",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Kongregate.jpg",
                name: "kongregate",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Letterboxd.jpg",
                name: "letterboxd",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Librarious.jpg",
                name: "librario",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/ModDB.jpg",
                name: "moddb",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/motortopia.jpg",
                name: "motortopia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/n4g.jpg",
                name: "n4g",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Newgrounds.jpg",
                name: "newgrounds",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Ranker.jpg",
                name: "ranker",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/raptr.jpg",
                name: "raptr",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/redbubble.jpg",
                name: "redbubble",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Shockwave.jpg",
                name: "shockwave",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Singsnap.jpg",
                name: "singsnap",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/SnapZu.jpg",
                name: "snapzu",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/stage32.jpg",
                name: "stage32",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Storify.jpg",
                name: "storify",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Storybird.jpg",
                name: "storybird",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/StyleHive.jpg",
                name: "stylehive",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Patreon.jpg",
                name: "patreon",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/playerme.jpg",
                name: "player",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Tickld.jpg",
                name: "tickld",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Trakt.jpg",
                name: "trakt",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/TMZ.jpg",
                name: "tmz",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/VoiceOfTV.jpg",
                name: "voiceoftv",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Entertainment/Wattpad.jpg",
                name: "wattpad",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 7,
        title: 'Health',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/health/adegga.jpg",
                name: "adegga",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/Athlinks.jpg",
                name: "athlinks",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/dailymile.jpg",
                name: "dailymile",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/EmpowHER.jpg",
                name: "empowher",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/Families.jpg",
                name: "families",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/FatSecret.jpg",
                name: "fatsecret",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/health/Fitday.jpg",
                name: "fitday",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/health/Inspire.jpg",
                name: "inspire",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/health/Leafly.jpg",
                name: "leafly",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/Livestrong.jpg",
                name: "livestrong",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/mycyclinglog.jpg",
                name: "mycyclinglog",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/myfitnesspal.jpg",
                name: "myfitnesspal",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/health/snooth.jpg",
                name: "snooth",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/sparkpeople.jpg",
                name: "sparkpeople",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/health/Steepster.jpg",
                name: "steepster",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/health/WithFit.jpg",
                name: "withfit",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 8,
        title: 'information',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/AboutMe.jpg",
                name: "aboutme",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/AboutTo.jpg",
                name: "abouto",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/AllMyFaves.jpg",
                name: "allmyfaves",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Answers.jpg",
                name: "answers",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/appearoo.jpg",
                name: "appearoo",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Arrisweb.jpg",
                name: "arrisweb",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/askfm.jpg",
                name: "askfm",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/bloglovin.jpg",
                name: "bloglovin",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Calendly.jpg",
                name: "calendly",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/CiteULike.jpg",
                name: "citeulike",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Copytaste.jpg",
                name: "copytaste",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/DojoPress.jpg",
                name: "dojopress",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/FlavorsMe.jpg",
                name: "flavors",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/FlightAware.jpg",
                name: "flightaware",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Gibbon.jpg",
                name: "gibbon",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Gravatar.jpg",
                name: "gravatar",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/GrowthHackers.jpg",
                name: "growthhackers",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/HuffDuffer.jpg",
                name: "huffduffer",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/IFTTT.jpg",
                name: "ifttt",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Itsmyurls.jpg",
                name: "itsmyurls",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/KhanAcademy.jpg",
                name: "khanacademy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/LinkGum.jpg",
                name: "linkgum",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/listography.jpg",
                name: "listography",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/mouthshut.jpg",
                name: "mouthshut",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Netvibes.jpg",
                name: "netvibes",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/OpenStudy.jpg",
                name: "openstudy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Padlet.jpg",
                name: "padlet",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Pressfolios.jpg",
                name: "pressfolios",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Qhub.jpg",
                name: "qhub",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Quora.jpg",
                name: "quora",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Rrrather.jpg",
                name: "rrrather",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/scribd.jpg",
                name: "scribd",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Storeboard.jpg",
                name: "storeboard",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Tacked.jpg",
                name: "tacked",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/VisualCV.jpg",
                name: "visualcv",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/webs.jpg",
                name: "webs",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Wikia.jpg",
                name: "wikia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/WikiHow.jpg",
                name: "wikihow",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Wikipedia.jpg",
                name: "wikipedia",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Information/Zotero.jpg",
                name: "zotero",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 9,
        title: 'Microblogging',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Alpha.jpg",
                name: "alpha",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/AlternativeTo.jpg",
                name: "alternativeto",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/ello.jpg",
                name: "ello",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Flattr.jpg",
                name: "flattr",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/foursquare.jpg",
                name: "foursquare",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Impossible.jpg",
                name: "impossible",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Kiwi.jpg",
                name: "kiwi",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/LittleLogs.jpg",
                name: "littlelogs",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Mastodon.jpg",
                name: "mastodon",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/plinky.jpg",
                name: "plinky",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Plurk.jpg",
                name: "plurk",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Posteezy.jpg",
                name: "posteezy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Microblogging/Twitter.jpg",
                name: "twitter",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 10,
        title: 'Music',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/music/8tracks.jpg",
                name: "eighttracks",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/Allihoopa.jpg",
                name: "allihoopa",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/AudioBoom.jpg",
                name: "audioboom",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/BandMix.jpg",
                name: "bandmix",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/Bandsintown.jpg",
                name: "bandsintown",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/blipFM.jpg",
                name: "blip",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/ConcertWindow.jpg",
                name: "concertwindow",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/Datpiff.jpg",
                name: "datpiff",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/Genius.jpg",
                name: "genius",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/Hypemachine.jpg",
                name: "hypem",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/JamBase.jpg",
                name: "jambase",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/LastFM.jpg",
                name: "lastfm",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/Mixcloud.jpg",
                name: "mixcloud",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/purevolume.jpg",
                name: "purevolume",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/ReverbNation.jpg",
                name: "reeverbnation",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/SongKick.jpg",
                name: "songkick",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/music/spreaker.jpg",
                name: "spreaker",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/music/Stereogum.jpg",
                name: "stereogum",
                result: false,
                availability: false,
            },

        ]
    },
    {
        title: 'News',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/News/BuzzFeed.jpg",
                name: "buzzfeed",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/EzySpot.jpg",
                name: "ezyspot",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/fark.jpg",
                name: "fark",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/Gawker.jpg",
                name: "gawker",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/myalltop.jpg",
                name: "alltop",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/Newsmix.jpg",
                name: "newsmix",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/Newsvine.jpg",
                name: "newsvine",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/Panjury.jpg",
                name: "panjury",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/PopSugar.jpg",
                name: "popsugar",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/reddit.jpg",
                name: "reddit",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/News/SportLobster.jpg",
                name: "sportlobster",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/News/SportsRants.jpg",
                name: "sportsrants",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/News/Wikidot.jpg",
                name: "wikidot",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/News/wunderground.jpg",
                name: "wunderground",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 12,
        title: 'Photo',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/23HQ.jpg",
                name: "hq",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/500px.jpg",
                name: "px",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/ClipArtMe.jpg",
                name: "clipart",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Dreamstime.jpg",
                name: "dreamstime",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/expono.jpg",
                name: "expono",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Flickr.jpg",
                name: "flickr",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Fotki.jpg",
                name: "fotki",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/fotobabble.jpg",
                name: "fotobabble",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/FotoChatter.jpg",
                name: "fotochatter",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Fotolog.jpg",
                name: "fotolog",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/freepik.jpg",
                name: "freepik",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Giphy.jpg",
                name: "giphy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/ImageShack.jpg",
                name: "imageshack",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/imgfave.jpg",
                name: "imgfave",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Imgur.jpg",
                name: "imgur",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Instagram.jpg",
                name: "instagram",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Jalbum.jpg",
                name: "jalbum",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Marqueed.jpg",
                name: "marqueed",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Mobypicture.jpg",
                name: "mobypicture",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/morgueFile.jpg",
                name: "morguefile",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Photobucket.jpg",
                name: "photobucket",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Photodune.jpg",
                name: "photodune",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Photopeach.jpg",
                name: "photopeach",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Piccsy.jpg",
                name: "piccsy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/PicturePush.jpg",
                name: "picturepush",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/Picturetrail.jpg",
                name: "picturetrail",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/PostImg.jpg",
                name: "postimage",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/purephoto.jpg",
                name: "purephoto",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Photo/RoxioPhotoShow.jpg",
                name: "photoshow",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/smugmug.jpg",
                name: "smugmug",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Thefancy.jpg",
                name: "thefancy",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Twitxr.jpg",
                name: "twitxr",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/Tabulas.jpg",
                name: "tabulas",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Photo/zenfolio.jpg",
                name: "zenfolio",
                result: false,
                availability: false,
            },

        ]
    },
    {
        id: 13,
        title: 'Tech',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/AlternativeTo.jpg",
                name: "alternativeto",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Betanews.jpg",
                name: "betanews",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/Codecademy.jpg",
                name: "codecademy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/CreativeLive.jpg",
                name: "creativelive",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Curious.jpg",
                name: "curious",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Customize.jpg",
                name: "customize",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/DataCamp.jpg",
                name: "datacamp",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/F6S.jpg",
                name: "f6s",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/github.jpg",
                name: "github",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Hackaday.jpg",
                name: "hackaday",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Hackster.jpg",
                name: "hackster",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Ipernity.jpg",
                name: "ipernity",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/lijit.jpg",
                name: "lijit",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/MyTechlogy.jpg",
                name: "mytechlogy",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/PlayFire.jpg",
                name: "playfire",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Scrim.jpg",
                name: "scrim",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Silk.jpg",
                name: "silk",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/Skillshare.jpg",
                name: "skillshare",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Slashdot.jpg",
                name: "slashdot",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Snipplr.jpg",
                name: "snipplr",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/Sourceforge.jpg",
                name: "sourceforge",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/techdirt.jpg",
                name: "techdirt",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Tech/Techsupportalert.jpg",
                name: "techsupportalert",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Tech/Toolbox.jpg",
                name: "toolbox",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 14,
        title: 'Travel',
        btn: "Search Brand",
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/BeWelcome.jpg",
                name: "bewelcome",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Travel/Fodors.jpg",
                name: "fodors",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Travel/gapyear.jpg",
                name: "gapyear",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/Travel/GoGoBot.jpg",
                name: "gogobot",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/LonelyPlanet.jpg",
                name: "lonelyplanet",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/RoadTrippers.jpg",
                name: "roadtrippers",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/TravBuddy.jpg",
                name: "travbuddy",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/Travellerspoint.jpg",
                name: "travellerspoint",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/Travelpod.jpg",
                name: "travelpod",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Travel/TripAdvisor.jpg",
                name: "tripadvisor",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 15,
        title: 'Video',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Bambuser.jpg",
                name: "bambuser",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Break.jpg",
                name: "break",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Clipmoon.jpg",
                name: "clipmoon",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Coub.jpg",
                name: "coub",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/video/DailyMotion.jpg",
                name: "dailymotion",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/video/FunnyOrDie.jpg",
                name: "funnyordie",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Godtube.jpg",
                name: "godtube",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Houzz.jpg",
                name: "houzz",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Kaotic.jpg",
                name: "kaotic",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Liveleak.jpg",
                name: "liveleak",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/MetaCafe.jpg",
                name: "metacafe",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/OVGuide.jpg",
                name: "ovguide",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/video/Periscope.jpg",
                name: "periscope",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/TOUT.jpg",
                name: "tout",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/TwitchTV.jpg",
                name: "twitch",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Veoh.jpg",
                name: "veoh",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/video/Videobash.jpg",
                name: "videobash",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/Videojug.jpg",
                name: "videojug",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/video/Videosift.jpg",
                name: "videosift",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/VidMe.jpg",
                name: "vidme",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/vimeo.jpg",
                name: "vimeo",
                result: false,
                availability: false,
            },
            {
                link: "https://new.engineshark.com/assets/images/brands/video/YouTube.jpg",
                name: "youtube",
                result: false,
                availability: false,
            },
        ]
    },
    {
        id: 15,
        title: 'Application',
        btn: "Search Brand",
        images: [
            {
                link: "https://new.engineshark.com/assets/images/brands/application/android.png",
                name: "android",
                result: false,
                availability: false,
            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/application/ios.png",
                name: "ios",
                result: false,
                availability: false,
            },
        ]
    }
]

const CardsData = [
    {
        title: 'Bronze',
        text_one:
            'Complete Signup of all profile info: photos,bio, URL and description on the top 25 most essential and popular social media websites.',
        price: '$60',
    },
    {
        title: 'Silver',
        text_one:
            'Complete Signup of all profile info: photos, bio, URL and description on 100 social media websites. We do it all for you, soup to nuts!',
        price: '$199',
    },
    {
        title: 'Gold',
        text_one:
            'Complete Signup of all profile info: photos, bio, URL and description on 150 social media websites. Same as Business, but for 150 sites.',
        price: '$299',
    },
    {
        title: 'Platinum',
        text_one:
            'Complete Signup of all profile info: photos, bio, URL and description on 300 social media websites. Same as Business and Corporate, but for 300 sites',
        price: '$599',
    },
];
const MarketingData = [
    {
        title: 'Additional Brand and Marketing Services',
        data: [
            {
                id: 1,
                title: 'Register Your Trademark',
                content:
                    'Brand protection in the United States is only $158 + the standard $325 USPTO Filing Fee, register yours now!',
            },
            {
                id: 2,
                title: 'Register Your Domain Name',
                content:
                    'Our trusted domain registration partner offers over a hundred top level domains for prices starting at around $9/year, register yours now!',
            },
        ],
    },
];

