import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useCallback, useEffect, useState } from 'react';
import firebaseAuth from '@react-native-firebase/auth'
GoogleSignin.configure({
  webClientId:'1064111528518-ph32htjce97rtorcpakfb8ucfe10ae7g.apps.googleusercontent.com',
  iosClientId:'1064111528518-b9mk8dl2sd5npbd9u37iqupgg0o3807r.apps.googleusercontent.com',
  scopes: ['profile', 'email']
})

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);



  const onPressGoogleSignin = useCallback(async()=>{
    // await GoogleSignin.hasPlayServices();
    try{
      const userInfo = await GoogleSignin.signIn();
      setLoadingUser(true);

      console.log(userInfo);
      const { idToken, serverAuthCode } = userInfo;

      const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      
      const result = await firebaseAuth().signInWithCredential(credential);
      console.log('result', result)

      setUser({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      })
      setLoadingUser(false);

    }catch(ex){
        setLoadingUser(false);

        if(ex.code === statusCodes.SIGN_IN_CANCELLED){

        } else if(error.code === statusCodes.IN_PROGRESS){

        } else {
          
        }
    }

  }, [])



  const getCurrentUserInfo =useCallback( async()=>{
    try{
      const userInfo = await GoogleSignin.signInSilently();
      console.log('result', userInfo)
      setLoadingUser(true);

      const credential = firebaseAuth.GoogleAuthProvider.credential(userInfo.idToken);
      
      const result = await firebaseAuth().signInWithCredential(credential);
      console.log('result', result)

      setUser({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      })
      setLoadingUser(false);

      console.log(userInfo);
    }catch(error){
      setLoadingUser(false);
      console.log(error);

      if(error.code === statusCodes.SIGN_IN_REQUIRED){
        setUser(null)
      }
    }
  }, [])

  useEffect(()=>{
    getCurrentUserInfo();

  }, [])

  console.log(user);

  return (
    <View style={styles.container}>
      {loadingUser ? (
        <ActivityIndicator/>
      ) : (user !== null ? ( 
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image source={{uri:user.profileImage}} style={{width:200, height:200, borderRadius:100}} />
            <Text style={{fontSize:32, marginTop:24}}>{user.name}</Text>
          </View>
        ) : (
  
        <GoogleSigninButton onPress={onPressGoogleSignin} />
        )
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
