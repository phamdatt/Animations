import React, {useRef} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  Easing,
} from 'react-native';

const RotationLucky = () => {
  const animated = useRef(new Animated.Value(0)).current;
  let isStopped = useRef(false).current;
  const startImage = () => {
    if (isStopped) {
      animated.setValue(0);
      Animated.timing(animated, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => startImage());
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).stop();
    }
  };
  const rotateData = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Animated.Image
          source={{
            uri: 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
          }}
          style={[
            styles.image,
            {
              transform: [
                {
                  rotate: rotateData,
                },
              ],
            },
          ]}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            isStopped = !isStopped;
            startImage();
          }}>
          <Text style={styles.buttonTextStyle}>Quay</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c8c8c8',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 200,
  },
  button: {
    backgroundColor: 'orange',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default RotationLucky;
