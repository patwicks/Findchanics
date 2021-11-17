import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';

const   ProfileImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
}


export default ProfileImagePicker;