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
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../permission';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const CreatePost = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [price, setprice] = useState(0);
  const [description, setDescriptoin] = useState('');

  const [imgSrc, setImgSrc] = useState('');

  const [videoSrc, setVideoSrc] = useState('');

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
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImgSrc(image.path);
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('selected Image', image.path);
      setImgSrc(image.path);
    });
  };
  RNFS.readFile(imgSrc, 'base64').then(res => {
    console.log('========>baseData', res);
  });


// Video

  const onSelectVideo = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Video', 'Choose an option', [
        {text: 'Camera', onPress: onVideo},
        {text: 'Gallery', onPress: onVideoGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onVideo = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(video => {
      console.log(video.path);
      setImgSrc(video.path);
    });
  };

  const onVideoGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(video => {
      console.log('selected video', video.path);
      setVideoSrc(video.path);
    });
  };
  RNFS.readFile(videoSrc, 'base64').then(res => {
    console.log('========>baseData', res);
  });

  const handelSave = () => {
    var data = {
      name: title,
      price: Number(price) || 0,
      description: description,
    };

    axios({
      url: 'http://192.168.0.208:81/api_native/public/api/store',
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <CustomHeader title="Post" backFunc={() => navigation.goBack()} />

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

        {imgSrc ? (
          <Image
            source={{
              uri: imgSrc ? imgSrc : 'https://picsum.photos/200',
              width: '100%',
              height: 100,
            }}
            style={{marginTop: 5,marginBottom:10 }}
          />
        ) : 
        
        <TouchableOpacity style={styles.uploadFileBtn} onPress={onSelectImage}>
          <Entypo name="image" color={'gray'} size={22} />
          <Text style={{color: 'gray', paddingLeft: 8}}>Upload Banner</Text>
        </TouchableOpacity>}

        <Text>Video</Text>

        {imgSrc ? (
          <Image
            source={{
              uri: imgSrc ? imgSrc : 'https://picsum.photos/200',
              width: '100%',
              height: 100,
            }}
            style={{marginTop: 5, marginBottom:10 }}
          />
        ) : 
        <TouchableOpacity style={styles.uploadFileBtn} onPress={onSelectVideo}>
          <Entypo name="image" color={'gray'} size={22} />
          <Text style={{color: 'gray', paddingLeft: 8}}>Upload Video</Text>
        </TouchableOpacity>}


        <TouchableOpacity onPress={handelSave} style={styles.btnContainer}>
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

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
