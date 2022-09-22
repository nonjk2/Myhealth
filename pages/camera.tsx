import React, {useCallback, useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
// import {useAppDispatch} from '../store';
import {TabParamList} from '../routes';
import {HEIGHT, WIDTH} from './home';
import {MyButton} from '../utils/myButton';

function CameraPage() {
  // const dispatch = useAppDispatch();
  // const route = useRoute<RouteProp<TabParamList>>();
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();

  /** 이미지 프리뷰 */
  const [preview, setPreview] = useState<{uri: string}>();
  const accessToken = useSelector((state: RootState) => state.user.AccessToken);
  /** 이미지 선택시 이미지 리사이저 */
  const onResponse = useCallback(async (response: any) => {
    console.log(response.width, response.height, response.exif);

    /** 이미지를 base64 text이미지로 변경 */
    setPreview({uri: `data:${response.mime};base64,${response.data}`});

    const orientation = (response.exif as any)?.Orientation;
    console.log('orientation', orientation);

    /** 핸드폰 방향에따른 이미지 리사이저 -정사각형-*/
    return ImageResizer.createResizedImage(
      response.path, //파일의 경로
      600, // 최대 width
      600, // 최대 height
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG', //compressFomMat
      100, //퀄리티
      0 // rotation
    ).then(r => {
      console.log(r.uri, r.name);

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);

  const onTakePhoto = useCallback(() => {
    return ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
      saveToPhotos: true,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onComplete = useCallback(async () => {
    if (!image) {
      Alert.alert('알림', '파일을 업로드해주세요.');
      return;
    }
    /** 이미지는 폼데이터 만들어서 형식갖춰 전송 */
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post(
        `${Config.API_URI}/undongs/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      Alert.alert('알림', '완료처리 되었습니다.');
      setImage(undefined);
      navigation.goBack();
      navigation.navigate('Home');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        console.log('error');
      }
    }
  }, [navigation, image, accessToken]);

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.preview}>
        {preview && <Image style={styles.previewImage} source={preview} />}
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <MyButton
            onPress={() => {
              onTakePhoto();
            }}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {'사진촬영'}
          </MyButton>
        </View>
        <View style={styles.button}>
          <MyButton
            onPress={() => {
              onChangeFile();
            }}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {'사진선택'}
          </MyButton>
        </View>
        <View style={styles.button}>
          <MyButton
            onPress={() => {
              onComplete();
            }}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {'완료'}
          </MyButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#202020',
    flexDirection: 'column-reverse',
  },
  preview: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  previewImage: {
    height: HEIGHT,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
});

export default CameraPage;
