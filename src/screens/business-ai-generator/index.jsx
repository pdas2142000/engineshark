import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import AppHeader from '../../components/header/AppHeader'
import BusinessAiGenerates from '../../components/business-ai-generate'
import { Colors } from '../../utils/constants'
import { hs } from '../../utils/helpers/Metrics'


const BusinessAiGenerator = ({navigation,route}) => {
    
    const data =  route?.params?.data

  return (
    <View   style={styles.container}>
        <AppHeader
           {
             ...{
                  title:"Ai Generator",
                  navigation,
                  isBack:true
             }
           }
        />
        <ScrollView>
            <View  style={styles.es_ai_generator_area}>
                {
                    data?.map((item,index)=>{
                        return <BusinessAiGenerates  key={index+1} {...{item,navigation}}/>
                    })
                }
            </View>
        </ScrollView>
    </View>
  )
}

export default BusinessAiGenerator

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.es_white,
        flex: 1,
    },
    es_ai_generator_area:{
        marginHorizontal:hs(15)
    }
})
const CommentData=[{
    title:"Comment Generator",
    commentsData:[{
        imgs:require('../../../assets/images/cardimg.png'),
        image:require('../../../assets/images/free.webp'),
        subtitle:"Description :",
        content:"Comment Generator is a Chrome extension that helps to increase engagement on Instagram by generating unique and meaningful comments with just a click of a button. It allows users to choose from four different commenting styles such as genuinely agree, politely disagree, act surprised or be funny. It supports multiple languages and provides a free trial and a subscription option of $4.99 per month. It is trusted by 1000+ active users and has been rated 5 stars out of 5 on Product Hunt.",
        title_one:"Pricing Model:",
        title_two:'This tool offer a free trail',
        title_three:"Tags:",
        btn_one:"Visit Comment GeneratorNew Tab",
        btn_two:"Suggest Changes"
    }]
}]