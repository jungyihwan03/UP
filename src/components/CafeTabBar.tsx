import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Layout } from '../constants';

// ✨ UI용: 화면에서 던져주는 '현재 탭 이름'만 딱 받습니다.
interface CafeTabBarProps {
  activeTab: string;
}

export default function CafeTabBar({ activeTab }: CafeTabBarProps) {
  const tabs = ['홈', '메뉴', '리뷰', '나의 기록'];

  return (
    <View style={styles.card}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={styles.tab} 
            activeOpacity={1} // ✨ 어차피 지금은 안 누를 거니까 클릭 효과도 껐습니다!
          >
            {/* 글자 색칠하기 */}
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {/* 밑줄 긋기 */}
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 스타일은 아까 그대로 유지!
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radiusLg,
    ...Layout.shadow1,
    overflow: 'hidden', 
  },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '500', color: Colors.text2 },
  tabTextActive: { color: Colors.primary },
  tabIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: Colors.primary, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
});