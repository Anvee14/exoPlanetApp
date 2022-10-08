import React, { Component } from "react"; 
import { View, Text, FlatList, StyleSheet, Alert, SafeAreaView  } from "react-native"; 
import { ListItem } from "react-native-elements"; 
import { Card, Icon } from "react-native-elements";

import axios from "axios";

export default class DetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            details:{},
            imgPath:"",
            url:`http://127.0.0.1:5000/planet?name=${this.props.navigation.getParam(planet_name)}`,
        }

    }
    componentDidMount(){
        this.getDetails()
    }
    getDetails = () => {
        const { url } = this.state;
        axios.get(url).then(response => {
            return this.setState({
                listData: response.data.data
            })
        })
            .catch(error => {
                Alert.alert(error.message);
            })
    }
    setDetails= (planetDetail)=>{
        const planetType = planetDetail.planet_type
        imagePath = "";
        switch(planetType){
            case "Gas Giant":
                imagePath=require("../assets/gas_giant.png")
                break
            case "Terrestrial":
                imagePath=require("../assets/terrestrial.png")   
                break    
            case "Super Earth":
                imagePath=require("../assets/super_earth.png")   
                break     
            case "Neptune like":
                imagePath=require("../assets/neptune_like.png")   
                break      
            default:
                imagePath=require("../assets/gas_giant.png")
        }
        this.setState({
            details:planetDetail,
            imagePath:imagePath
        })
    }
    render(){
        const{ details,imagePath} = this.state
        if(details.specifications){
            return(
                <View>
                    <Card 
                    title={details.name}
                    image={imagePath}
                    imageProps={{resizeMode:"contain",width:"100%"}}
                    >
                        <View>
                            <Text style = {styles.cardItem}>
                            {`Distance from Earth : ${details.distance_from_earth}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {`Distance from Sun : ${details.distance_from_their_sun}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {`Gravity : ${details.gravity}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {`Orbital Period : ${details.orbital_period}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {`Orbital Speed : ${details.orbital_speed}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {`Planet Mass: ${details.planet_mass}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {` Planet Radius: ${details.planet_radius}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                            {` Planet Type : ${details.planet_type}`}
                            </Text>
                        </View>\
                        <View style ={[styles.cardItem,{flexDirection:"column"}]}>
                        <Text>{details.specifications ? `Specifications : ` : ""}</Text> 
                        {details.specifications.map((item, index) => ( 
                        <Text key={index.toString()} style={{ marginLeft: 50 }}> {item} 
                        </Text> ))}

                        </View>


                    </Card>
                </View>
            )
        }
    
        return null;

    }
}
const styles = StyleSheet.create(
    { container: { flex: 1 }, cardItem: { marginBottom: 10 } }
    );