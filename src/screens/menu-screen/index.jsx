import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AppHeader from '../../components/header/AppHeader';
import { hs, ms } from '../../utils/helpers/Metrics';
import { Colors, Fonts } from '../../utils/constants';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.es_container}>
            <AppHeader
                {...{
                    isBack: true,
                    navigation,
                    title: "Menu"
                }}
            />
            <ScrollView>
                <View style={styles.es_menu_block}>
                    {menuItems?.top?.map((items, index) => {
                        return (
                            <View key={index + 1}>
                                <TouchableOpacity
                                    style={[
                                        styles.es_menu_title,
                                        items.name === 'Brand Search' || " Reputation Management"
                                        ? { borderBottomWidth: 0 }
                                        : { borderBottomWidth: hs(1.6) },
                                    ]}
                                    onPress={() => {
                                        if (items.name === 'Brand Search') {
                                            navigation.navigate('BrandSearch');
                                        }
                                        else if (items.name === "Reputation Management") {
                                            navigation.navigate('ReputationManagement');
                                        }
                                    }} >
                                    <Text style={styles.es_menuItemTitle}>{items.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.es_subItemsContainer}>
                                    {items?.list?.map((subItem, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index+1}
                                                style={styles.es_subItem}
                                                onPress={() => {
                                                    if (subItem.navigation) {
                                                        navigation.navigate(subItem.navigation);
                                                    }
                                                    else {
                                                        navigation.navigate('Web', { url: subItem.link })
                                                    }
                                                }} 
                                            >
                                                <View style={styles.es_dot} />
                                                <Text style={[styles.es_menuItemSubTitle]}>
                                                    {subItem.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    es_container: {
        backgroundColor: "white",
        flex: 1,
    },
    es_menu_block: {
        marginHorizontal: hs(15),
        marginBottom: hs(20),
    },
    es_menuTitleText: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
        marginRight: hs(10),
        paddingBottom: hs(10),
    },
    es_menu_title: {
        borderTopWidth: hs(1.6),
        borderColor: '#e1e1e1',
        marginBottom: hs(2),
    },
    es_menuItemTitle: {
        fontSize: ms(16),
        marginRight: hs(10),
        fontFamily: Fonts.Font_600,
        paddingVertical: hs(10),
        color: Colors.black
    },
    es_dot: {
        width: hs(7),
        height: hs(7),
        borderRadius: hs(2),
        backgroundColor: Colors.es_blue,
        marginRight: hs(6),
    },
    es_subItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    es_subItemsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hs(5),
    },
    es_subItem: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: hs(10),
        marginRight: hs(16),
    },
    es_menuItemSubTitle: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        marginVertical: hs(8),
        color: Colors.black,
    },
});

export default MenuScreen;

const menuItems = {
    top: [
        {
            name: 'Products',
            type: 'dropdown',
            list: [
                {
                    name: 'New ES Products',
                    navigation: "ReSeller",
                    link: "https://mya.secureserver.net/products/accountlist.aspx?ci=14481&prog_id=528853"
                },
                {
                    name: 'Register a Domain',
                    link: 'https://www.secureserver.net/default.aspx?pl_id=528853',
                },
                {
                    name: 'My Hosting Accounts',
                    link: 'https://mya.secureserver.net/?ci=12819&prog_id=528853',
                },
                {
                    name: 'Hosting Plans',
                    link: 'https://www.secureserver.net/products/cpanel?plid=528853',
                },
                {
                    name: 'Wordpress Site/Blog',
                    link: 'https://www.secureserver.net/hosting/wordpress.aspx?ci=43232&amp;prog_id=528853',
                },
                {
                    name: 'VPS',
                    link: 'https://www.secureserver.net/hosting/vps-hosting.aspx?ci=1784&amp;prog_id=528853',
                },
                {
                    name: 'Dedicated Servers',
                    link: 'https://www.secureserver.net/hosting/dedicated-servers.aspx?ci=1785&amp;prog_id=528853',
                },
                {
                    name: 'Dedicated Hosting IP',
                    link: 'https://www.secureserver.net/ssl/static-ip2.aspx?ci=1786&amp;prog_id=528853',
                },
                {
                    name: 'SSL Certificates',
                    link: 'https://www.secureserver.net/ssl/ssl-certificate.aspx?ci=1790&amp;prog_id=528853',
                },
                {
                    name: 'Business Class Email',
                    link: 'https://www.secureserver.net/email/email-hosting.aspx?ci=12940&prog_id=528853',
                },
                {
                    name: 'Online Storage',
                    link: 'https://www.secureserver.net/email/online-storage.aspx?ci=1796&prog_id=528853',
                },
                {
                    name: 'Email Marketing',
                    link: 'https://www.secureserver.net/business/email-marketing.aspx?ci=42405&amp;prog_id=528853',
                },
                {
                    name: 'Online Calendar',
                    link: 'https://www.secureserver.net/calendar/online-calendar.aspx?ci=1798&prog_id=528853',
                },
                {
                    name: 'Website Builder',
                    link: 'https://www.secureserver.net/hosting/website-builder2.aspx?ci=1806&amp;prog_id=528853',
                },
            ],
        },
        {
            name: 'Services',
            type: 'dropdown',
            list: [
                {
                    name: 'Personal Social Media',
                    navigation: 'PersonalMedia',
                },
                {
                    name: 'SMM/Brand Development',
                    navigation: 'SocialMediaPackages',
                },
                {
                    name: 'Business Creation',
                    link: '/business-creation',
                    navigation: 'BusinessCreation',
                },
            ],
        },
        {
            name: 'Brand Creation',
            type: 'link',
            navigation: 'BrandSearch',
            list: [
                {
                    name: 'Logo Design',
                    navigation: "LogoDesign"
                },
                {
                    name: 'Reputation Management',
                    type: 'link',
                    navigation: 'ReputationManagement',
                },
                {
                    name: 'Business AI Tools',
                    navigation: "BusinessAiTools"
                },
                {
                    name: 'Business QR Code Generator',
                    navigation: "BusinessCodeGenerator"
                },
                {
                    name: "Brand Search",
                    navigation: "BrandSearch"
                },
                {
                    name: 'Personal Social Media',
                    navigation: 'PersonalMedia',
                },
                {
                    name: 'SMM/Brand Development',
                    navigation: 'SocialMediaPackages',
                },
                {
                    name: 'Business Creation',
                    link: '/business-creation',
                    navigation: 'BusinessCreation',
                },
            ]
        },

        {
            name: 'Domain Search',
            type: 'dropdown',
            list: [
                {
                    name: 'My Domain Names',
                    link: "https://dcc.secureserver.net/default.aspx?ci=1812&prog_id=528853",
                },
                {
                    name: 'Renew Domains',
                    link: "https://mya.secureserver.net/MyRenewals/MyRenewals.aspx?ci=8988&prog_id=528853",

                },
                {
                    name: 'Register Domains',
                    link: "https://www.secureserver.net/products/domain-registration?pl_id=528853"

                },
                {
                    name: 'Tranfer Domains',
                    link: "https://www.secureserver.net/domains/domain-transfer.aspx?ci=1776&prog_id=528853"

                },
                {
                    name: 'Bulk Registration',
                    link: "https://www.secureserver.net/domains/bulk-domain-search.aspx?ci=1777&prog_id=528853"
                },
                {
                    name: 'Domains Backordering',
                    link: "https://www.secureserver.net/domainaddon/domain-alert.aspx?ci=1780&prog_id=528853"
                },
            ],
        },
        {
            name: 'Web Hosting',
            type: 'dropdown',
            list: [
                {
                    name: 'My Hosting Accounts',
                    link: "https://mya.secureserver.net/hosting_ded/dedicatedhosting.aspx?ci=1815&prog_id=528853",

                },
                {
                    name: 'Hosting Plans',
                    link: "https://www.secureserver.net/products/cpanel?plid=528853"
                },
                {
                    name: 'Cpanel web Hosting',
                    link: "https://www.secureserver.net/products/cpanel?plid=528853"
                },
                {
                    name: 'WordPress Site/Blog',
                    link: "https://www.secureserver.net/hosting/wordpress.aspx?ci=43232&prog_id=528853"
                },
                {
                    name: 'VPS',
                    link: "https://www.secureserver.net/hosting/vps-hosting.aspx?ci=1784&prog_id=528853"
                },
                {
                    name: 'Dedicated Server',
                    link: "https://www.secureserver.net/products/seo?plid=528853"
                },
                {
                    name: 'Dedicated IP',
                    link: "https://www.secureserver.net/hosting/dedicated-servers.aspx?ci=1785&prog_id=528853"
                },
            ],
        },
        {
            name: 'SSL & Secuirity',
            type: 'dropdown',
            list: [
                {
                    name: 'My SSL Certificates',
                    link: "https://mya.secureserver.net/sslcert/ssl.aspx?ci=1819&prog_id=528853"
                },
                {
                    name: 'See All Certificates',
                    link: "https://www.secureserver.net/ssl/ssl-certificates.aspx?ci=1790&prog_id=528853"
                },
                {
                    name: 'Code Signing Certificates',
                    link:"https://www.secureserver.net/ssl/code-signing-certificate.aspx?ci=13343&prog_id=528853"
                },
                {
                    name: 'Web Secuirity',
                    link: "https://www.secureserver.net/web-security/website-security?ci=89298&prog_id=528853"
                },
            ],
        },
        {
            name: 'Email Accounts',
            type: 'dropdown',
            list: [
                {
                    name: 'My Mail Account',
                    link: "https://mya.secureserver.net/products/accountlist.aspx?ci=1817&prog_id=528853",
                },
                {
                    name: 'Check My Web Mail',
                    link: "https://login.secureserver.net/index.php?ci=9094&prog_id=528853"
                },
                {
                    name: 'Email Plans',
                    link: "https://www.secureserver.net/products/email?plid=528853",
                },
                {
                    name: 'Online Storage',
                    link: "https://www.secureserver.net/email/online-storage.aspx?ci=1796&prog_id=528853"
                },
                {
                    name: 'Email Marketing',
                    link: "https://www.secureserver.net/products/email-marketing?plid=528853"
                },
                {
                    name: 'Calender',
                    link: "https://www.secureserver.net/calendar/online-calendar.aspx?ci=1798&prog_id=528853"
                },
            ],
        },
        {
            name: 'Marketing Tool',
            type: 'dropdown',
            list: [
                {
                    name: 'My Ecommerce Products',
                    link: "https://mya.secureserver.net/products/accountlist.aspx?ci=14481&prog_id=528853"
                },
                {
                    name: 'Quick shopping Cart',
                    link: "https://www.secureserver.net/ecommerce/shopping-cart.aspx?ci=1802&prog_id=528853"
                },
                {
                    name: 'Email Marketing',
                    link: "https://www.secureserver.net/products/seo?plid=528853"
                },
            ],
        },
        {
            name: 'Build a Websites',
            type: 'dropdown',
            list: [
                {
                    name: 'My Websites',
                    link: 'https://mya.secureserver.net/sitebuilder/hostingaccountlist.aspx?ci=1814&prog_id=528853',
                },
                {
                    name: 'Websites Builder',
                    link: "https://www.secureserver.net/products/website-builder?plid=528853"
                },
                {
                    name: 'WordPress Site/Blog',
                    link: "https://www.secureserver.net/products/wordpress?plid=528853"
                },
                {
                    name: 'Quick Shooping Cart',
                    link: "https://www.secureserver.net/ecommerce/shopping-cart.aspx?ci=1807&prog_id=528853"
                },
                {
                    name: 'Search Engine Visibility',
                    link: "https://www.secureserver.net/products/seo?plid=528853"
                },
            ],
        },
    ],
}