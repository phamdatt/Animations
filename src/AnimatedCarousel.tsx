import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];
const {width, height} = Dimensions.get('screen');
export const AnimatedCarouselChild = (props: any) => {
  const {visible, onChange,activeIndexImage} = props;
  const [activeIndex, setActiveIndex] = useState<number>(activeIndexImage);

  const refFlastListParent = useRef<FlatList>(null);
  const refFlastListChild = useRef<FlatList>(null);
  const onScroll = (index: number) => {
    refFlastListParent?.current?.scrollToIndex({
      animated: true,
      index: activeIndex,
    });
  };

  const onScrollItemChild = (index: number) => {
    refFlastListChild?.current?.scrollToIndex({
      animated: true,
      index: activeIndex,
    });
  };
  return (
    <Modal visible={visible} animationType="fade" style={{flex: 1}}>
      <FlatList
        ref={refFlastListParent}
        horizontal
        onScroll={e => {
          setActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width));
          onScrollItemChild(Math.floor(e.nativeEvent.contentOffset.x / width));
        }}
        initialScrollIndex={activeIndex}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={data}
        keyExtractor={item => item}
        renderItem={({item}) => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width,
                  height: height / 2,
                }}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
            </View>
          );
        }}
      />
      <FlatList
        style={{
          position: 'absolute',
          bottom: 70,
        }}
        ref={refFlastListChild}
        initialScrollIndex={activeIndex}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={data}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                marginLeft: 12,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: activeIndex == index ? '#c4c4c4' : 'transparent',
              }}
              onPress={() => {
                onScrollItemChild(index);
                onScroll(index);
              }}>
              <Image
                source={{uri: item}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
        }}>
        <TouchableOpacity onPress={onChange}>
          <Image
            source={require('../assets/close.png')}
            style={{
              width: 16,
              height: 16,
              tintColor: 'black',
            }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

function AnimatedCarousel() {
  const [visible, setVisible] = useState<boolean>(false);
  const [activeIndexImage, setActiveIndexImage] = useState<boolean>(false);
  const onChange = () => {
    setVisible(!visible);
  };
  return (
    <View>
      <FlatList
        horizontal
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={data}
        keyExtractor={item => item}
        renderItem={({item,index}) => {
          return (
            <TouchableOpacity
              style={{
                width,
                height: height / 2,
              }}
              onPress={() => {
                setActiveIndexImage(index)
                setVisible(true);
              }}>
              <Image
                source={{uri: item}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      {visible && (
        <AnimatedCarouselChild onChange={onChange} visible={visible} activeIndexImage={activeIndexImage}/>
      )}
    </View>
  );
}

export default AnimatedCarousel;
