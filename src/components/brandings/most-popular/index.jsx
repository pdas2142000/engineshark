import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import BrandingLabel from '../../project-components/branding-label';
import { hs, ms, vs } from '../../../utils/helpers/Metrics';
import { Colors, Fonts, TitleFont } from '../../../utils/constants';
import RNFetchBlob from 'rn-fetch-blob';

const MostPopular = ({ search }) => {
    const [brands, setBrands] = useState(Blogging)
    const [searchValue, setSearchValue] = useState(search)
    const [loader, setLoader] = useState(false)

    const fetchData = async (searchTerm, index = 0) => {
        if (searchTerm) {
            const data = Blogging[index].images.map((item) => ({
                link: searchTerm,
                name: item.name,
            }))

            const parameters = 'data=' + JSON.stringify(data)
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
   
            const responseData = response?.data ? JSON.parse(response.data) : null

            let brandData = Blogging.map((item, i) => {
                if (i != index) return item
                item.images.forEach((brand) => {
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
    useEffect(()=>{
        fetchData(search)
    },[search])

    const handleChangeText = (text) => {
        setSearchValue(text)
    }

    return (
        <View style={styles.container}>
            <ScrollView decelerationRate={0.997} keyboardShouldPersistTaps={'always'}>
                <View style={styles.es_brand_block}>
                    <View style={styles.es_space_block}>
                        <View style={styles.es_brand_text_field}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Search for a new brand'}
                                placeholderTextColor={'#757575'}
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
                </View>
                <View style={styles.es_book_marking_block}>
                    {brands?.map((item, index) => {
                        return <BrandingLabel {...{ item }} key={index+1} fetchData={fetchData} i={index} searchValue={searchValue} loader={loader}/>
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default MostPopular;

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
    es_brand_block: {
        backgroundColor: Colors.es_sky_blue,
        paddingVertical: vs(15),
    },
    es_space_block: {
        marginHorizontal: hs(15),
    },
    es_brand_main_title: {
        fontFamily: TitleFont.title_font_600,
        fontWeight: '600',
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
        width:"45%",
        alignItems:"center",
        backgroundColor: Colors.es_blue,
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
    es_book_marking_block: {
        marginTop: hs(50)
    }
});


const Blogging = [
    {
        id: 1,
        btn: "Search Brand",
        title: 'Quick Search of the Most Popular Social Networks',
        images: [
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/BlogCatalog.jpg",
                name: "blogcatalog",
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
                name: "insanejournal",
                result: false,
                availability: false,

            },
            {
                link:
                    "https://new.engineshark.com/assets/images/brands/Blogging/IntenseDebate.jpg",
                name: "intensedebate",
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
        ],
    },
];