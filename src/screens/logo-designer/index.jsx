import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/header/AppHeader';
import { Colors, Fonts, TitleFont } from '../../utils/constants';
import { hs, ms } from '../../utils/helpers/Metrics';
import { IconProps } from '../../utils/helpers/Iconprops';
import TemplateIcon from '../../../assets/images/logo-designer/template.svg';
import AppIcon from '../../../assets/images/logo-designer/apps-add.svg';
import BookFontIcon from '../../../assets/images/logo-designer/book-font.svg';
import EditIcon from '../../../assets/images/logo-designer/edit-alt.svg';
import ShirtIocon from '../../../assets/images/logo-designer/tshirt.svg';
import ResizeIcon from '../../../assets/images/logo-designer/resize.svg';
import UserIcon from '../../../assets/images/logo-designer/users.svg';
import MessageIcon from '../../../assets/images/logo-designer/comment-dots.svg';
import MobileIcon from '../../../assets/images/logo-designer/smartphone.svg';

const LogoDesigner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AppHeader
                {...{
                    title: 'Logo Designer',
                    isBack: true,
                    navigation: navigation,
                }}
            />
            <ScrollView>
                <View>
                    {LogoData.map((item, index) => {
                        return (
                            <View
                                key={index+1}
                                style={[
                                    styles.es_logo_design_area,
                                    item.id === 1 ? styles.es_logo_active : null,
                                ]}>
                                <View style={styles.es_logo_block}>
                                    <View
                                        style={[
                                            item.id === 1
                                                ? styles.es_logo_design_imgs
                                                : styles.es_logo_active_img,
                                        ]}>
                                        <Image
                                            source={item.imgs}
                                            style={styles.es_logo_design_img}
                                        />
                                    </View>
                                    <Text style={styles.es_logo_title}>{item.title}</Text>
                                    {item.title ? (
                                        <Text style={styles.es_logo_text}>{item.text}</Text>
                                    ) : null}
                                    {item.list
                                        ? item.list.map((val, index) => {
                                            const Icon = val?.Icon;
                                            return (
                                                <View key={index + 1}>
                                                    <View style={styles.es_logo_list}>
                                                        <View style={styles.es_logo_icon}>
                                                            <Icon {...IconProps(25)} />
                                                        </View>
                                                        <View style={{ width: '70%' }}>
                                                            <Text style={styles.es_logo_list_title}>
                                                                {val?.title_text}
                                                            </Text>
                                                            <Text style={styles.es_logo_list_content}>
                                                                {val?.content_text}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        : null}
                                    <View style={styles.es_service_btn_area}>
                                        <TouchableOpacity style={styles.es_service_btn} onPress={()=>navigation.navigate('LogoMaker')}>
                                            <Text style={styles.es_service_btn_title}>
                                                {item.btn}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default LogoDesigner;
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.es_white,
        flex: 1,
    },

    es_logo_active: {
        backgroundColor: Colors.es_sky_blue,
        paddingVertical: hs(40),
    },
    es_logo_design_area: {
        marginBottom: hs(80),
    },
    es_logo_block: {
        marginHorizontal: hs(15),
    },
    es_logo_active_img: {
        height: hs(430),
    },
    es_logo_design_imgs: {
        height: hs(230),
    },
    es_logo_design_img: {
        height: '100%',
        width: '100%',
        borderRadius: hs(15),
        resizeMode: 'cover',
    },
    es_logo_title: {
        fontFamily: TitleFont.title_font_800,
        fontSize: ms(42),
        fontWeight: '700',
        color:Colors.black,
        marginTop: hs(18),
    },
    es_logo_text: {
        fontFamily: Fonts.Font_300,
        fontSize: ms(16),
        marginTop: hs(15),
        marginBottom: hs(10),
        lineHeight: hs(23),
        color: Colors.es_dark_blue,
    },
    es_logo_list: {
        flexDirection: 'row',
        marginBottom: hs(25),
        width: '100%',
    },
    es_logo_icon: {
        backgroundColor: '#f2f4f4',
        height: hs(65),
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hs(10),
        marginRight: hs(30),
    },
    es_logo_content: {
        marginLeft: hs(10),
    },
    es_logo_list_title: {
        fontFamily: TitleFont.title_font_800,
        fontWeight:"700",
        fontSize: hs(20),
        lineHeight:ms(26),
        color:Colors.black
    },
    es_logo_list_content: {
        fontFamily:Fonts.Font_400,
        fontWeight: '400',
        fontSize: ms(15),
        color: Colors.es_lite_blue,
        lineHeight: hs(24),
        marginTop: hs(8),
    },
    es_service_btn_area: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: hs(10),
        marginTop:hs(30)
    },
    es_service_btn: {
        borderRadius: hs(24),
        paddingVertical: hs(14),
        paddingHorizontal: hs(29),
        backgroundColor: Colors.es_blue,
    },
    es_service_btn_title: {
        fontFamily: Fonts.Font_600,
        color: 'white',
        fontSize: ms(15),
    },
});

const LogoData = [
    {
        id: 1,
        title: 'Design Professional Logos Instantly',
        text: 'Build a unique brand identity starting with custom logos you can esaily produce and use',
        imgs: require('../../../assets/images/logo-designer/designer-networking.jpg'),
        btn: 'Create A Logo',
    },
    {
        id: 2,
        title: 'Everything You Need For An On-Brand Logo',
        imgs: require('../../../assets/images/logo-designer/logo-designer-holding.jpg'),
        btn: 'Design A Logo',
        list: [
            {
                id: 1,
                title_text: 'Thousands of professionally designed templates',
                content_text:
                    'Bring your identity to life. Browse our customizable logo templates to find a match',
                Icon: TemplateIcon,
            },
            {
                id: 2,
                title_text: 'Millions of free icon and illustrations',
                content_text:
                    'Inject uniqueness into your logos with free graphic elements from our vast media librray',
                Icon: AppIcon,
            },
            {
                id: 3,
                title_text: 'Hundreds of eye-catching font combination',
                content_text:
                    'Finish off logo design by using the perfect font pairing',
                Icon: BookFontIcon,
            },
        ],
    },
    {
        id: 3,
        title: 'Craft Custom Logos In Minutes',
        imgs: require('../../../assets/images/logo-designer/art_craft.png'),
        btn: 'Design A Logo',
        list: [
            {
                id: 1,
                title_text:"Free and easy to use logo editor" ,
                content_text:
                'No advanced skills needed when designing your logo on your drag and drop dashboard',
                Icon: EditIcon,
            },
            {
                id: 2,
                title_text: 'Visualize your logo on any product',
                content_text:
                    'Create realistic product mockups usng your design with the smartmockups integrations',
                Icon: ShirtIocon,
            },
            {
                id: 3,
                title_text: 'Resize your logo for any use',
                content_text:
                    'Automatically tarnsform a single design for use on virtually any platform with magic switch (pro)',
                Icon: ResizeIcon,
            },
        ],
    },
    {
        id: 4,
        title: 'Work and Collaborate With Ease',
        imgs: require('../../../assets/images/logo-designer/team.jpg'),
        btn: 'Design A Logo',
        list: [
            {
                id: 1,
                title_text:"Share access to your design" ,
                content_text:
                'Get your teammates` input by sending them a to link  view and edit your design drafts',
                Icon: UserIcon,
            },
            {
                id: 2,
                title_text: 'Easily get everyones`s comments',
                content_text:
                    'Revise with ease. Get your teammate`s and clients`s feedback directly on your design',
                Icon: MessageIcon,
            },
            {
                id: 3,
                title_text: 'Design on the go',
                content_text:
                    'Work where inspiration strikes.Edit on canva on your mobile,tablet, and desktop devices',
                Icon: MobileIcon,
            },
        ],
    },
];
