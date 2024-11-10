import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Colors, Fonts } from '../../../utils/constants';
import { hs, ms } from '../../../utils/helpers/Metrics';

const Domain = ({ search }) => {

    const [domains, setDomains] = useState(Domains);
    const [searchValue, setSearchValue] = useState(search);
    const [loader, setLoader] = useState(false);
    const [SelectedId, setSelectedId] = useState(null)

    const fetchData = async (searchTerm, index = 0) => {
        setSelectedId(index + 1)
        if (searchTerm) {
            const data = Domains[index].images.map((item) => ({
                link: searchTerm,
                name: item.name,
            }));

            const parameters = 'data=' + JSON.stringify(data);
            setLoader(true)

            const response = await RNFetchBlob.fetch(
                'POST',
                'https://new.engineshark.com/welcome/check_availability_bulk',
                {
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                parameters
            );

            const responseData = response?.data ? JSON.parse(response.data) : null;

            let domainData = Domains.map((item, i) => {
                if (i !== index) return item
                item.images.forEach(domain => {
                    domain.result = true;
                    domain.availability = responseData?.find(responseItem => responseItem[domain.name])
                    if (domain.availability) {
                        domain.availability = domain.availability[domain.name] === "true";
                    }
                });

                return item
            })
            
            setDomains(domainData)
            setLoader(false);
            
        }
    }

    useEffect(() => {
        fetchData(search)
    }, [search])

    const handleChangeText = text => {
        setSearchValue(text);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                decelerationRate={0.997}
                keyboardShouldPersistTaps={'always'}>
                <View>
                    {
                        <View>
                            <View style={styles.es_brand_block}>
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
                                    <TouchableOpacity
                                        style={styles.es_start_btn}
                                        onPressIn={() => fetchData(searchValue)}>
                                        {loader ? (
                                            <ActivityIndicator size="small" color={Colors.es_white} />
                                        ) : <Text style={styles.es_start_btn_title}>
                                            SEARCH DOMAIN
                                        </Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.es_domain_links_new_bg]}>
                                {
                                    <View style={styles.es_domain_links}>
                                        {domains.map((val, i) => {
                                            return (
                                                <View
                                                    key={i + 1} 
                                                    style={[
                                                        {
                                                            backgroundColor: val?.backgroundColor,
                                                            paddingVertical: hs(60),
                                                        },
                                                    ]} >
                                                    <View style={{ marginHorizontal: hs(15) }}>
                                                        <View style={styles.es_barnd_title_area}>
                                                            <Text style={styles.es_domain_title}>
                                                                {val?.title}
                                                            </Text>
                                                            <View style={styles.es_search_btn_area}>
                                                                <TouchableOpacity
                                                                    style={styles.es_search_btn}
                                                                    onPressIn={() => fetchData(searchValue, i)}>
                                                                    <Text style={styles.es_search_btn_title}>
                                                                        Search Brand
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={styles.es_domains_flex_block}>

                                                            {val?.images?.map((item, index) => {
                                                                return (
                                                                    <View key={index + 1} style={styles.es_domain_data} >
                                                                        <View
                                                                            style={styles.es_domain_link_sub}
                                                                            key={index + 'i'}>
                                                                            <View
                                                                                style={styles.es_domian_link_logo}>
                                                                                <Image
                                                                                    style={styles.es_domain_imgs}
                                                                                    source={{ uri: item?.link }}
                                                                                />
                                                                            </View>
                                                                            <Text
                                                                                style={styles.es_domain_link_title}>
                                                                                {item.title}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={styles.es_brand_status}>
                                                                            {
                                                                                loader && val.id === SelectedId ? <Text style={styles.es_loading}>Loading...</Text>
                                                                                    :
                                                                                    <>
                                                                                        {!loader && item.result ? (
                                                                                            item.availability ? (
                                                                                                <Text style={styles.es_true_title}>
                                                                                                    Available
                                                                                                </Text>
                                                                                            ) : (
                                                                                                <Text style={styles.es_false_title}>
                                                                                                    Not Available
                                                                                                </Text>
                                                                                            )
                                                                                        ) : null}
                                                                                    </>
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })}
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                }
                            </View>
                        </View>

                    }
                </View>
            </ScrollView>

        </View>
    );
};

export default Domain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    es_brand_loader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    es_brand_btn_area: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
    },
    es_brand_block: {
        backgroundColor: '#e9eef7',
        paddingHorizontal: hs(10),
    },
    es_barnd_title_area: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    es_search_btn_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    es_search_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(6),
        paddingHorizontal: hs(8),
        backgroundColor: Colors.es_blue,
    },
    es_search_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(10),
    },
    es_brand_main_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(40),
        textAlign: 'center',
        marginTop: hs(15),
        lineHeight: hs(46),
    },
    es_brand_text: {
        fontFamily: Fonts.Font_600,
        color: '#34494d',
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
        paddingVertical: hs(15),
        backgroundColor: Colors.es_blue,
        width: "50%"
    },
    es_start_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
        textAlign: "center",
    },
    es_domain_links_new_bg: {
        marginBottom: hs(30),
    },
    es_domains_flex_block: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginLeft: '-1%',
        marginTop: hs(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    es_domain_data: {
        alignItems: 'flex-start',
        width: '30%',
        margin: '1%',
        marginVertical: hs(16),
    },
    es_brand_status: {
        marginLeft: hs(15)
    },
    es_domains: {
        marginHorizontal: hs(10),
    },

    es_domain_links: {
        marginVertical: hs(4),
    },
    es_domain_link_title_area: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: hs(25),
    },
    es_domain_title: {
        color: 'black',
        fontSize: ms(19),
        fontFamily: Fonts.Font_600,
        maxWidth: hs(200)
    },
    es_domian_link_logo: {
        width: hs(20),
        height: hs(12),
    },
    es_domain_imgs: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    es_domain_link_data: {
        width: hs(120),
        paddingVertical: hs(19),
        paddingHorizontal: hs(15),
        alignItems: 'center',
    },
    es_domain_link_sub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    es_domain_link_title: {
        fontFamily: Fonts.Font_600,
        color: '#34494d',
        fontSize: ms(18),
        paddingLeft: hs(1),
    },
    es_loading: {
        fontFamily: Fonts.Font_400,
        color: Colors.es_black,
        fontSize: ms(10),
    },
    es_true_title: {
        color: '#27ad61',
        fontFamily: Fonts.Font_400,
        fontSize: ms(10),
        alignSelf: 'center',
        textAlign: "center",
    },
    es_false_title: {
        color: Colors.es_red,
        fontFamily: Fonts.Font_400,
        fontSize: ms(10),
        paddingTop: hs(3),
        alignSelf: 'center',
        textAlign: "center",
    },
});

const Domains = [
    {
        id: 1,
        title: "Common Domains",
        btn: "Search Brand",
        images: [{
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'com',
            title: '.com',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'net',
            title: '.net',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'org',
            title: '.org',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'info',
            title: '.info',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'biz',
            title: '.biz',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'tel',
            title: '.tel',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'mobi',
            title: '.mobi',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'name',
            title: '.name',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'co',
            title: '.co',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'ag',
            title: '.ag',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'tv',
            title: '.tv',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'me',
            title: '.me',
            result: false,
            availability: false,
        },
        {
            link: 'https://new.engineshark.com/assets/images/flags/flag-global.png',
            name: 'travel',
            title: '.travel',
            result: false,
            availability: false,
        },]
    },
    {
        id: 2,
        title: 'Domains from North America',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ca.png',
                name: 'ca',
                title: '.ca',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-mx.png',
                name: 'mx',
                title: '.mx',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-mx.png',
                name: 'commx',
                title: '.com.mx',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ca.png',
                name: 'qccom',
                title: '.qc.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-us.png',
                name: 'us',
                title: '.us',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-us.png',
                name: 'uscom',
                title: '.us.com',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 3,
        title: 'Domain from South America',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ar.png',
                name: 'arcom',
                title: '.ar.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-br.png',
                name: 'brcom',
                title: '.br.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cl.png',
                name: 'cl',
                title: '.cl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-gs.png',
                name: 'gs',
                title: '.gs',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pe.png',
                name: 'pe',
                title: '.pe',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uy.png',
                name: 'uycom',
                title: '.uy.com',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 4,
        title: 'Domains from Central America and Carribean',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ag.png',
                name: 'agcom',
                title: '.ag.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ag.png',
                name: 'netag',
                title: '.net.ag',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ag.png',
                name: 'orgag',
                title: '.org.ag',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-bz.png',
                name: 'bz',
                title: '.bz',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cr.png',
                name: 'cr',
                title: '.cr',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-gd.png',
                name: 'gd',
                title: '.gd',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-hn.png',
                name: 'hn',
                title: '.hn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ht.png',
                name: 'ht',
                title: '.ht',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-lc.png',
                name: 'lc',
                title: '.lc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ms.png',
                name: 'ms',
                title: '.ms',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-tc.png',
                name: 'tc',
                title: '.tc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-vc.png',
                name: 'vc',
                title: '.vc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-vc.png',
                name: 'nettc',
                title: '.net.tc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-vg.png',
                name: 'vgcom',
                title: '.vg.com',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 5,
        title: 'Domains from Asia',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-asia.png',
                name: 'asia',
                title: '.asia',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ae.png',
                name: 'ae',
                title: '.ae',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ae.png',
                name: 'aeorg',
                title: '.aeorg',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-af.png',
                name: 'af',
                title: '.af',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-am.png',
                name: 'am',
                title: '.am',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cn.png',
                name: 'cn',
                title: '.cn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cn.png',
                name: 'comcn',
                title: '.com.cn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cn.png',
                name: 'netcn',
                title: '.net.cn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cn.png',
                name: 'orgcn',
                title: '.org.cn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cn.png',
                name: 'cncom',
                title: '.cn.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-hk.png',
                name: 'hk',
                title: '.hk',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'in',
                title: '.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'coin',
                title: '.co.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'firmin',
                title: '.firm.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'genin',
                title: '.gen.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'indin',
                title: '.ind.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'netin',
                title: '.net.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-in.png',
                name: 'orgin',
                title: '.org.in',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-io.png',
                name: 'io',
                title: '.io',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-jp.png',
                name: 'jp',
                title: '.jp',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-jp.png',
                name: 'jpcom',
                title: '.jp.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-kr.png',
                name: 'krcom',
                title: '.kr.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-la.png',
                name: 'la',
                title: '.la',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-mn.png',
                name: 'mn',
                title: '.mn',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sa.png',
                name: 'sacom',
                title: '.sa.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sg.png',
                name: 'sg',
                title: '.sg',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sg.png',
                name: 'comsg',
                title: '.com.sg',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ws.png',
                name: 'ws',
                title: '.ws',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-tl.png',
                name: 'tl',
                title: '.tl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-tw.png',
                name: 'tw',
                title: '.tw',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-tw.png',
                name: 'comtw',
                title: '.com.tw',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 6,
        title: 'Domains from Africa',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ac.png',
                name: 'ac',
                title: '.ac',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cm.png',
                name: 'cm',
                title: '.cm',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-mu.png',
                name: 'mu',
                title: '.mu',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sc.png',
                name: 'sc',
                title: '.sc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sc.png',
                name: 'comsc',
                title: '.com.sc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sh.png',
                name: 'sh',
                title: '.sh',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-za.png',
                name: 'zacom',
                title: '.za.com',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 7,
        title: 'Domains from Australia and Oceania',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-as.png',
                name: 'as',
                title: '.as',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-au.png',
                name: 'comau',
                title: '.com.au',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cc.png',
                name: 'cc',
                title: '.cc',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cx.png',
                name: 'cx',
                title: '.cx',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-fm.png',
                name: 'fm',
                title: '.fm',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nf.png',
                name: 'nf',
                title: '.nf',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nu.png',
                name: 'nu',
                title: '.nu',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nz.png',
                name: 'conz',
                title: '.co.nz',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nz.png',
                name: 'netnz',
                title: '.net.nz',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nz.png',
                name: 'orgnz',
                title: '.org.nz',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-sb.png',
                name: 'comsb',
                title: '.com.sb',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-tk.png',
                name: 'tk',
                title: '.tk',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-to.png',
                name: 'to',
                title: '.to',
                result: false,
                availability: false,
            },
        ],
    },
    {
        id: 8,
        title: 'Domains from Europe',
        btn: "Search Brand",
        images: [
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-at.png',
                name: 'at',
                title: '.at',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-at.png',
                name: 'coat',
                title: '.co.at',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-at.png',
                name: 'orat',
                title: '.or.at',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-be.png',
                name: 'be',
                title: '.be',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-bg.png',
                name: 'bg',
                title: '.bg',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-by.png',
                name: 'by',
                title: '.by',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ch.png',
                name: 'ch',
                title: '.ch',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-cz.png',
                name: 'cz',
                title: '.cz',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-de.png',
                name: 'de',
                title: '.de',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-de.png',
                name: 'decom',
                title: '.de.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-dk.png',
                name: 'dk',
                title: '.dk',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-es.png',
                name: 'es',
                title: '.es',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-es.png',
                name: 'comes',
                title: '.com.es',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-es.png',
                name: 'nomto',
                title: '.nom.to',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-es.png',
                name: 'orges',
                title: '.org.es',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-eu.png',
                name: 'eu',
                title: '.eu',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-eu.png',
                name: 'eucom',
                title: '.eu.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-fr.png',
                name: 'fr',
                title: '.fr',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-hu.png',
                name: 'hucom',
                title: '.hu.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-im.png',
                name: 'im',
                title: '.im',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-it.png',
                name: 'it',
                title: '.it',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-li.png',
                name: 'licom',
                title: '.li.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-li.png',
                name: 'li',
                title: '.li',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-lt.png',
                name: 'lt',
                title: '.lt',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-lu.png',
                name: 'lu',
                title: '.lu',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-md.png',
                name: 'md',
                title: '.md',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-nl.png',
                name: 'nl',
                title: '.nl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-no.png',
                name: 'nocom',
                title: '.no.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'pl',
                title: '.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'bizpl',
                title: '.biz.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'compl',
                title: '.com.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'infopl',
                title: '.info.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'netpl',
                title: '.net.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pl.png',
                name: 'orgpl',
                title: '.org.pl',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pt.png',
                name: 'pt',
                title: 'pt',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-pt.png',
                name: 'compt',
                title: '.com.pt',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ru.png',
                name: 'ru',
                title: '.ru',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ru.png',
                name: 'rucom',
                title: '.ru.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-se.png',
                name: 'se',
                title: '.se',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-se.png',
                name: 'secom',
                title: '.se.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-se.png',
                name: 'senet',
                title: '.se.net',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-se.png',
                name: 'comtr',
                title: '.com.tr',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-ua.png',
                name: 'comua',
                title: '.com.ua',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'ceuk',
                title: '.ce.uk',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'gbcom',
                title: '.gb.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'gbnet',
                title: '.gb.net',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'senet',
                title: '.se.net',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'ukcom',
                title: '.uk.com',
                result: false,
                availability: false,
            },
            {
                link: 'https://new.engineshark.com/assets/images/flags/flag-uk.png',
                name: 'uknet',
                title: '.uk.net',
                result: false,
                availability: false,
            },
        ],
    },
];