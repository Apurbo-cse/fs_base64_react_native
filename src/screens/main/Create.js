import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import axios from 'axios';

import ImagePicker from 'react-native-image-crop-picker';

import RNFS from 'react-native-fs';
import {androidCameraPermission} from '../../../permission';
import ImageCrop from '../ImageCrop';

const Create = ({route}) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [price, setprice] = useState(0);
  const [description, setDescriptoin] = useState('');

  const [imgSrc, setImgSrc] = useState('');

  const onChangeTitle = value => {
    setTitle(value);
  };

  const onChangePrice = value => {
    setprice(value);
  };

  const onChangeDescriptoin = value => {
    setDescriptoin(value);
  };

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



<ImageCrop/>
      <View style={styles.form}>

      <TouchableOpacity
        onPress={onSelectImage}
        activeOpacity={0.8}
        style={{backgroundColor: '#ffaa00', padding: 10}}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
      
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

        <TouchableOpacity
          style={styles.uploadFileBtn}
          onPress={onSelectImage}
        >
          <Entypo name="image" color={'gray'} size={22} />
          <Text style={{color: 'gray', paddingLeft: 8}}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handelSave} style={styles.btnContainer}>
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Create;

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
    
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    color:'gray',
    borderRadius: 10,
  },
});
