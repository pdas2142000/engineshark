import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/home-screen";
import AboutScreen from "../screens/about-screen";
import ResellerScreen from "../screens/reseller-screen"
import BrandSearch from "../screens/brand-search";
import CommingSoon from "../screens/coming-soon";
import LlcScreen from "../screens/llc-screen";
import MenuScreen from "../screens/menu-screen";
import PersonalSocialMediaScreen from "../screens/psm-screen";
import SocialMediaManagementScreen from "../screens/smp-screen";
import BusinessCreationScreen from "../screens/business-creation";
import ReputationManagementScreen from "../screens/reputation-management-screen";
import ProductsScreen from "../screens/products-screen";
import PlansScreen from "../screens/plans-screen";
import LogoDesigner from "../screens/logo-designer";
import BusinessAiTools from "../screens/business-ai-tools";
import AddToolForm from "../screens/add-tool-form";
import BusinessQrCodeGenerator from "../screens/business-qr-code-generator";
import BusinessForm from "../screens/business-ein-form";
import WebView from "../../src/screens/web-view-screen";
import TestScreen from "../screens/test-screen";
import BusinessAiSearch from "../screens/business-ai-search";
import BusinessAiGenerator from "../screens/business-ai-generator";
import Logomaker from "../screens/logo-maker";
import LogoMakerCards from "../screens/logo-maker-output";
import ToolsSingleScreen from "../screens/tools-single-screen";

const MainStack = createNativeStackNavigator()

const MainStackComponent = () =>{
    return (
    <MainStack.Navigator  screenOptions={{headerShown:false}} initialRouteName="Home" >
        <MainStack.Screen   name="Menu" component={MenuScreen}/>
        <MainStack.Screen   name="Home" options={{ title: 'Home'}}  component={HomeScreen}   />
        <MainStack.Screen   name="Llc" options={{ title: 'Llc'}}  component={LlcScreen}   />
        <MainStack.Screen   name="About" options={{ title: 'About'}}  component={AboutScreen}/>
        <MainStack.Screen   name="Web" options={{ title: 'WebView'}}component={WebView} />
        <MainStack.Screen   name="CommingSoon" options={{ title: 'CommingSoon'}} component={CommingSoon}/>
        <MainStack.Screen   name='PersonalMedia'options={{ title: 'PersonalMedia'}}   component={PersonalSocialMediaScreen}/>
        <MainStack.Screen   name="SocialMediaPackages" options={{title:"SSM/Brand Development"}} component={SocialMediaManagementScreen}/>
        <MainStack.Screen   name="BusinessCreation" options={{title:"-Business Creation "}} component={BusinessCreationScreen}/>
        <MainStack.Screen   name="BrandSearch" options={{ title: 'BrandSearch'}} component={BrandSearch}/>
        <MainStack.Screen   name="ReSeller" options={{ title: '-New ES Products'}} component={ResellerScreen}/>
        <MainStack.Screen   name="ReputationManagement" component={ReputationManagementScreen}/>
        <MainStack.Screen   name="Product" component={ProductsScreen}/>
        <MainStack.Screen   name="Plans"  component={PlansScreen}/>
        <MainStack.Screen   name="LogoDesign" options={{ title: 'Logo Design'}} component={LogoDesigner}/>
        <MainStack.Screen   name="BusinessAiTools" component={BusinessAiTools}/>
        <MainStack.Screen   name="AddTool" component={AddToolForm}/>
        <MainStack.Screen   name="BusinessCodeGenerator" options={{title:"Business Qr Generator"}}  component={BusinessQrCodeGenerator}/>
        <MainStack.Screen   name="BusinessIdNumber"  component={BusinessForm}/>
        <MainStack.Screen   name="TestScreen" component={TestScreen}/>
        <MainStack.Screen   name="Aisearch"  component={BusinessAiSearch}/>
        <MainStack.Screen   name="AiGenerator"  component={BusinessAiGenerator}/>
        <MainStack.Screen   name ='LogoMaker'  component={Logomaker}/>
        <MainStack.Screen   name="LogoCards"  component={LogoMakerCards}/>
        <MainStack.Screen   name ='SingleTool'  component={ToolsSingleScreen}/>
    </MainStack.Navigator>)
}
const AppNavigation = () =>{
    return <MainStackComponent/>
}
export default AppNavigation