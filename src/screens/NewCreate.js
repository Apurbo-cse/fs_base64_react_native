import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Alert,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {androidCameraPermission} from '../../permission';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import VideoPlayer from 'react-native-video-player';

const NewCreate = () => {
  const navigation = useNavigation();

  const [pick, setPick] = React.useState('');
  const [title, setTitle] = useState('');
  const [price, setprice] = useState(0);
  const [description, setDescriptoin] = useState('');

  const [imageData, setImageData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  

  const onChangeTitle = value => {
    setTitle(value);
  };

  const onChangePrice = value => {
    setprice(value);
  };

  const onChangeDescriptoin = value => {
    setDescriptoin(value);
  };

  // Banner
  const cameraOrGallery = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraClick},
        {text: 'Gallery', onPress: choseImage},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

  const onCameraClick = async () => {
    let options = {
      title: 'Video Picker',
      mediaType: 'image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageData({
          uri: response.assets[0].uri,
          data: response.assets[0].base64,
        });
      }
    });
  };

  const choseImage = async () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('+++++++++ Image ++++++++++',response.assets[0].base64);
        setImageData({
          uri: response.assets[0].uri,
          data: response.assets[0].base64,
        });
      }
    });
  };

  const onChooseVideo = async () => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraVideo},
        {text: 'Gallery', onPress: choseVideo},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

  const choseVideo = async () => {
    console.log('Video');

    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'videos',
        mediaType: 'video',
        videoQuality: 'medium',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else {
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => {
          setVideoData({
            uri: response.assets[0].uri,
            data: res,
          });
          console.log('====== Video ========', res);
        });
      }
    });
  };
  const onCameraVideo = async () => {
    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'video',
        videoQuality: 'medium',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => {
          setVideoData({
            uri: response.assets[0].uri,
            data: res,
          });
        });
      }
    });
  };

  const handelSave = () => {
    var data = {
      name: title,
      price: Number(price) || 0,
      description: description,
      image: imageData,
      video: videoData,
      
    };


      axios.post('http://192.168.0.208:81/api_native/public/api/store',data,{
        headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            console.log('Final Data',res.data);
        });
        
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <CustomHeader title="Post" backFunc={() => navigation.goBack()} />

      <ScrollView>
        <View style={styles.form}>
          <Text>Title</Text>
          <TextInput
            value={title}
            style={styles.text_input}
            placeholder="Enter Title"
            onChangeText={onChangeTitle}
          />
          <Text>Price</Text>
          <TextInput
            value={price}
            style={styles.text_input}
            placeholder="Enter Price"
            onChangeText={onChangePrice}
          />
          <Text>Description</Text>
          <TextInput
            value={description}
            style={styles.text_input}
            placeholder="Enter Description"
            onChangeText={onChangeDescriptoin}
          />
          <Text>Banner</Text>
          <View style={styles.uploadFile}>
            {!imageData ? (
              <TouchableOpacity
                style={styles.uploadFileBtn}
                onPress={cameraOrGallery}>
                <Entypo name="image" color={'#ffaa00'} size={15} />
                {pick ? (
                  <Image style={{height: 300, width: 300}} source={pick} />
                ) : (
                  <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                    Upload Image
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <Image
                source={{uri: imageData.uri}}
                style={{
                  height: 130,
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 5,
                }}
              />
            )}
          </View>

          <Text>Video</Text>

          <View style={styles.uploadFile}>
            {videoData ? (
              <View
                style={{
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 5,
                }}>
                <VideoPlayer
                  video={{
                    uri: `${videoData.uri}`,
                  }}
                  videoWidth={100}
                  videoHeight={50}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadFileBtn}
                onPress={onChooseVideo}>
                <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                  Upload Video
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={handelSave} style={styles.btnContainer}>
            <Text style={styles.textButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewCreate;

const styles = StyleSheet.create({
  form: {
    padding: 15,
    backgroundColor: '#e3e3e3',
  },

  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 4,
  },

  btnContainer: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#000',
    marginTop: 20,
  },

  textButton: {
    textAlign: 'center',
    color: '#FFF',
  },
  uploadFileBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    color: 'gray',
    borderRadius: 10,
  },
});
