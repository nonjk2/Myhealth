import React from 'react';
import {Text, View} from 'react-native';

type myborder = {
  title: string;
};

export const Myborder: React.FC<myborder> = ({title}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 2, paddingHorizontal: 10}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#757575'}} />
        <View />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>{title}</Text>
      </View>
      <View style={{flex: 2, paddingHorizontal: 10}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#757575'}} />
        <View />
      </View>
    </View>
  );
};
