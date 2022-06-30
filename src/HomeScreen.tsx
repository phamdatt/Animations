import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 16,
      }}>
      <SafeAreaView />
      <TouchableOpacity
        onPress={() => navigation.navigate('AnimatedScroll3D')}
        style={{
          backgroundColor: '#333',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          Animated Scroll 3D
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AnimatedScrollTranslateX')}
        style={{
          backgroundColor: '#333',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          AnimatedScrollTranslateX
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AnimatedTopTab')}
        style={{
          backgroundColor: '#333',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          AnimatedTopTab
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RotationLucky')}
        style={{
          backgroundColor: '#333',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          Rotation Lucky
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AnimatedCarousel')}
        style={{
          backgroundColor: '#333',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          Image Detail Animated
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
