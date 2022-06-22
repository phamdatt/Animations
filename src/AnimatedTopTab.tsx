import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const images: any = {
  a: 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  b: 'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  c: 'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  d: 'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
};
const data = Object.keys(images).map((i: any) => ({
  key: [i],
  title: i,
  image: images[i],
  ref: React.createRef(),
}));
const {width, height} = Dimensions.get('window');

const Indicator = ({meansures, scrollX}: any) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX?.interpolate({
    inputRange,
    outputRange: meansures.map((ms: any) => ms.width),
  });
  const translateX = scrollX?.interpolate({
    inputRange,
    outputRange: meansures.map((ms: any) => ms.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        width: indicatorWidth,
        backgroundColor: 'white',
        bottom: -10,
        left: 0,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};
const Tab = React.forwardRef(({item, onpressItem}: any, ref: any) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onpressItem}>
      <View ref={ref}>
        <Text
          style={{
            color: 'white',
            fontSize: 84 / data.length,
            fontWeight: '800',
            textTransform: 'uppercase',
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Tabs = ({data, scrollX, onpressItem}: any) => {
  const containerRef: any = useRef();
  const [meansure, setMeansure] = useState<any[]>([]);
  React.useEffect(() => {
    const m: any[] = [];
    data.forEach((item: any) => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeansure(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={{position: 'absolute', top: 50, width}}>
      <View
        ref={containerRef}
        style={{
          justifyContent: 'space-evenly',
          flex: 1,
          flexDirection: 'row',
        }}>
        {data.map((item: any, index: number) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onpressItem={() => {
                onpressItem(index);
              }}
            />
          );
        })}
      </View>
      {meansure.length > 0 && (
        <Indicator meansures={meansure} scrollX={scrollX} />
      )}
    </View>
  );
};

const AnimatedTopTab = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let ref = useRef<FlatList>(null);
  const onpressItem = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.key.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri:item.image}}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  },
                ]}></View>
            </View>
          );
        }}
      />

      <Tabs data={data} scrollX={scrollX} onpressItem={onpressItem} />
    </View>
  );
};

export default AnimatedTopTab;
