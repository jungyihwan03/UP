import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// 김민경 작업물
import { Login } from './src/screens/Login';
import { SignUp } from './src/screens/SignUp';
import { FindPassword } from './src/screens/FindPassword';
import { FindId } from './src/screens/FindId';
import { BasicInfo } from './src/screens/BasicInfo';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import BrandSelectScreen from './src/screens/BrandSelectScreen';
import MenuDetailScreen from './src/screens/MenuDetailScreen';
import Map from './src/screens/Map';
import CafeDetailScreen from './src/screens/CafeDetailScreen';
import CafeMenuScreen from './src/screens/CafeMenuScreen';
import BackendTest from './App_backup'; // 백엔드 이환님 작업물 (이름만 BackendTest로 가져옴)

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* 🌟 진짜 방패막(SafeAreaView)을 여기에 칩니다! */}
      {/* edges 속성으로 위(top), 아래(bottom) 모두 보호하라고 확실히 알려줍니다. */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'bottom']}>
        
        {/* <Login /> */}
        {/* <SignUp /> */}
        {/* <FindPassword /> */}
        {/* <FindId /> */}
        {/* <BasicInfo /> */}
        {/* <HomeScreen /> */}
        {/* <SearchScreen /> */}
        {/* <BrandSelectScreen /> */}
        <MenuDetailScreen />
        {/* <Map /> */}
        {/* <CafeDetailScreen /> */}
        {/* <CafeMenuScreen /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );

  // return <BackendTest />;  // 이환님이 기능 테스트하고 샆을 때 이 줄의 주석(//)을 풀고 위를 주석 처리하면 끝!
}