import React, { useState } from 'react';
// 💡 StatusBar 임포트 추가!
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants'; // 경로 확인
import NavHeader from '../components/NavHeader';
import BottomNavBar from '../components/BottomNavBar'; 
import CafeHeroCard from '../components/CafeHeroCard';
import CafeTabBar from '../components/CafeTabBar';
import CafePhotoGallery from '../components/CafePhotoGallery';
import CafeDetailInfo from '../components/CafeDetailInfo';

export default function CafeDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  const HeartButton = (
    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
      <Ionicons 
        name={isFavorite ? "heart" : "heart-outline"} 
        size={24} 
        color={isFavorite ? Colors.error : Colors.text1} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 💡 상태바 배경을 흰색, 아이콘/글씨는 어둡게 고정 */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      <NavHeader 
        title="카페 상세" 
        onBack={() => console.log('뒤로 가기 버튼 클릭됨!')} 
        rightAction={HeartButton} 
      />

      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CafeHeroCard />
        <CafeTabBar activeTab='홈'/>
        <CafePhotoGallery />
        <CafeDetailInfo />
      </ScrollView>

      <BottomNavBar activeTab="지도" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
    paddingBottom: 100, // 바텀 네비게이션 여백
  },
});