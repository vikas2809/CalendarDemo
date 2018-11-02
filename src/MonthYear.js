import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import moment from 'moment';

export default class MonthYear extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedMonth: '',
            selectedYear: '',
            monthList : [],
            selectedColor: 'blue',
        }
    }

      componentDidMount(){
          var currentDate=moment();
          this.setState({
              selectedMonth: currentDate.format('MMM'),
              selectedYear: currentDate.format('YYYY'),
              monthList: moment.monthsShort()
          })
         console.warn('MomentMont', moment().format('MMMM'))
        }

        getPreviousYear = (year) => {
            this.setState({
                selectedMonth: '',
                selectedYear : moment(year).subtract(1, 'years').format('YYYY')
            })    
        }
        getNextYear = (year) => {
            let nextYear = moment(year).add(1, 'years').format('YYYY');
            this.setState({
                selectedMonth: '',
                selectedYear : nextYear
            })
        }

        setSelectedMonth = (month) => {
            console.warn('Month', month)
            this.setState({
                selectedMonth: month
            })
        }
       
    render(){
        const { monthList } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.topNavBarContainer}>
                    {
                        (parseInt(this.state.selectedYear)>2004)?
                        <TouchableWithoutFeedback
                            onPress={()=> this.getPreviousYear(this.state.selectedYear)}
                        >
                            <Image style={styles.previousNextButtonStyle} source={require('./left.png')} />
                        </TouchableWithoutFeedback> : 
                            <Image style={[styles.previousNextButtonStyle,{ opacity: 0.3 }]} source={require('./left.png')} />
                    }                    
                    <Text style={{ fontSize: 20}}>{this.state.selectedYear}</Text>
                    {
                       (parseInt(this.state.selectedYear)<parseInt(moment().format('YYYY')))?
                        <TouchableWithoutFeedback
                        onPress={()=> this.getNextYear(this.state.selectedYear)}
                      >
                        <Image style={styles.previousNextButtonStyle} source={require('./right.png')} />
                      </TouchableWithoutFeedback> : 
                        <Image style={[styles.previousNextButtonStyle,{ opacity: 0.3 }]} source={require('./right.png')} />
                    }
                </View>
            <View style={{ height: '35%'}}>
            <FlatList
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            data={this.state.monthList}
            numColumns={3}
            renderItem={({item})=>(
                (parseInt(moment().month(item).format('M'))<= parseInt(moment().format('M'))) ?
                <TouchableOpacity 
                style={{ flex: 1, 
                    borderWidth: 2, 
                    borderColor: '#FFFFFF',
                    height: 50,
                    alignSelf: 'center', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: this.state.selectedMonth === item ? 'blue': '#E8E8E8' , 
                    flexDirection: 'row'}}
                        onPress={()=> this.setSelectedMonth(item)}
                >
                    <Text 
                        style={styles.monthTextStyle}
                    >
                    {item}
                    </Text> 
                </TouchableOpacity> : 
                  (parseInt(this.state.selectedYear) === parseInt(moment().format('YYYY')))?
                  <TouchableOpacity 
                  style={{ flex: 1, 
                      borderWidth: 2, 
                      borderColor: '#FFFFFF',
                      height: 50,
                      alignSelf: 'center', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: '#E8E8E8', 
                      flexDirection: 'row'}}
                    //   onPress={()=> console.warn('selectedMonth', item)}
              >
                 <Text
                  style={[styles.monthTextStyle, { color: '#000000', fontSize: 15, opacity: 0.3 }]}
                 >
                     {item}
                 </Text>
              </TouchableOpacity> : 
              <TouchableOpacity 
                    style={{ flex: 1, 
                        borderWidth: 2, 
                        borderColor: '#FFFFFF',
                        height: 50,
                        alignSelf: 'center', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: this.state.selectedMonth === item ? 'blue': '#E8E8E8' , 
                        flexDirection: 'row'}}
                        onPress={()=> this.setSelectedMonth(item)}
                        // activeOpacity={1}
                >
                {
                <Text 
                style={styles.monthTextStyle}
                >
                {item}
                </Text> 
                }
                </TouchableOpacity>
            )}
          /> 
          </View>
             <View style={styles.cancelDoneButtonContainer}>
              <Text 
                style={styles.cancelTextStyle}
                onPress={() => alert('Cancel')}
              >
                {'Cancel'}
              </Text>
                  <Text 
                    onPress={()=> alert('Done')}
                    style={[styles.modalDoneText,{color: '#4a90e2'}]}
                  >
                    {'Done'}
                  </Text>
          
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
    },
    modalDoneText: {
        fontSize: 14,
        color: '#4a90e2',
        fontWeight: 'bold',
        marginRight: 21
      },
    previousNextButtonStyle:{
        height: 20, 
        width: 20
    },
    topNavBarContainer: {
        height: 50, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    monthTextStyle: {
        color: '#000000',
        fontSize: 15
    },
      monthCellStyle: {
        borderWidth: 2, 
        borderColor: '#FFFFFF',
        height: 50,
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row'
      },
      cancelDoneButtonContainer: {
        flexDirection: 'row', 
        marginTop: 30, 
        alignSelf: 'flex-end'
      },
      cancelTextStyle: {
        fontSize: 14, 
        color: '#4a90e2', 
        fontWeight: 'bold',
        marginRight: 16
      }
})