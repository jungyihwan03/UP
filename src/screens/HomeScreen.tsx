import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; // 🌟 Expo 네이티브 상태바 임포트
import Svg, { Circle as SvgCircle, Path } from 'react-native-svg';
import { Colors, Layout } from '../constants';

// 컴포넌트 임포트
import AppBar from '../components/AppBar';
import { PrimaryButton } from '../components/PrimaryButton';
import AlertCard from '../components/AlertCard';
import TimelineItem from '../components/TimelineItem';
import BottomNavBar from '../components/BottomNavBar';

export default function HomeScreen() {
  const circleCircumference = 2 * Math.PI * 72;
  const progressPercent = 0.5; // 1000/2000 kcal = 50%
  const strokeDashoffset = circleCircumference * (1 - progressPercent);

  // PrimaryButton에 넘길 플러스 아이콘 Svg 정의
  const RecordIcon = (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path d="M9 2v14M2 9h14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );

  return (
    // edges={['top', 'left', 'right']} 를 통해 기기 상단(노치 등) 영역을 자동으로 띄워줍니다.
    <View style={styles.safeArea}>
      {/* 🌟 기기 상태바(시간, 배터리 등)를 어두운 색으로 표시 */}
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        {/* 기존의 가짜 <DeviceStatusBar /> 삭제됨 */}
        <AppBar />

        <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
          {/* 1. 오늘의 섭취 현황 카드 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>오늘의 섭취 현황</Text>
            
            <View style={styles.chartArea}>
              <View style={styles.circularWrap}>
                <View style={{ transform: [{ rotate: '-90deg' }] }}>
                  <Svg width="180" height="180" viewBox="0 0 180 180">
                    <SvgCircle cx="90" cy="90" r="72" stroke={Colors.border} strokeWidth="14" fill="none" />
                    <SvgCircle 
                      cx="90" cy="90" r="72" 
                      stroke={Colors.primary} 
                      strokeWidth="14" 
                      fill="none" 
                      strokeLinecap="round"
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={strokeDashoffset} 
                    />
                  </Svg>
                </View>
                <View style={styles.chartCenter}>
                  <Text style={styles.cLabel}>칼로리 섭취량</Text>
                  <Text style={styles.cValue}>1,000 <Text style={styles.cUnit}>kcal</Text></Text>
                  <Text style={styles.cTotal}>/ 2,000kcal</Text>
                </View>
              </View>
            </View>

            <View style={styles.nutrients}>
              <View style={styles.nutrientItem}>
                <View style={[styles.nDot, { backgroundColor: Colors.warning }]} />
                <Text style={styles.nLabel}>당류</Text>
                <Text style={styles.nVal}>25g</Text>
                <Text style={styles.nTotal}>/ 50g</Text>
              </View>
              <View style={styles.nutrientItem}>
                <View style={[styles.nDot, { backgroundColor: Colors.primary, opacity: 0.5 }]} />
                <Text style={styles.nLabel}>단백질</Text>
                <Text style={styles.nVal}>40g</Text>
                <Text style={styles.nTotal}>/ 60g</Text>
              </View>
            </View>

            <PrimaryButton 
              title="기록하기" 
              leftIcon={RecordIcon} 
              onPress={() => console.log('기록하기 버튼 클릭')} 
            />
          </View>

          {/* 2. 주의 알림 카드 */}
          <AlertCard 
            title="주의 알림"
            bodyMain="권장 섭취량의"
            highlightText="50%"
            bodySub="를 도달했습니다. 늦은 오후에는 고칼로리 디저트 섭취에 유의하세요."
          />

          {/* 3. 섭취 타임라인 */}
          <View style={styles.timelineSection}>
            <Text style={styles.sectionTitle}>섭취 타임라인</Text>
            <View style={styles.timelineList}>
              <TimelineItem name="아메리카노" time="오전 09:30" kcal="120kcal" />
              <TimelineItem name="에스프레소 샷" time="오후 01:15" kcal="30kcal" />
              <TimelineItem name="아이스 카페 라떼" time="오후 02:40" kcal="150kcal" isLast={true} />
            </View>
          </View>
        </ScrollView>

        <BottomNavBar activeTab="홈"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface }, // SafeAreaView 배경을 흰색(surface)으로 주어 상태바 뒤쪽 배경색을 깔끔하게 유지합니다.
  container: { flex: 1, backgroundColor: Colors.bg, position: 'relative' },
  scrollArea: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 104, gap: 24 },
  pageHeader: { flexDirection: 'column', gap: 2 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: Colors.text1, letterSpacing: -0.3, lineHeight: 32 },
  headerDate: { fontSize: 14, fontWeight: '400', color: Colors.text2 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radiusLg,
    padding: 24,
    ...Layout.shadow1,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Colors.text1, lineHeight: 28, marginBottom: 20 },
  chartArea: { alignItems: 'center', marginBottom: 20 },
  circularWrap: { position: 'relative', width: 180, height: 180 },
  chartCenter: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  cLabel: { fontSize: 12, color: Colors.text2, marginBottom: 2 },
  cValue: { fontSize: 28, fontWeight: '700', color: Colors.text1, lineHeight: 32 },
  cUnit: { fontSize: 14, fontWeight: '500', color: Colors.text2 },
  cTotal: { fontSize: 12, color: Colors.text2, marginTop: 4 },
  nutrients: { flexDirection: 'row', gap: 20, justifyContent: 'center', marginBottom: 20 },
  nutrientItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nDot: { width: 10, height: 10, borderRadius: 5 },
  nLabel: { fontSize: 13, color: Colors.text1, fontWeight: '500' },
  nVal: { fontSize: 13, fontWeight: '700', color: Colors.text1, marginLeft: 2 },
  nTotal: { fontSize: 13, color: Colors.text2, fontWeight: '400' },
  timelineSection: { flexDirection: 'column', gap: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text1, lineHeight: 28 },
  timelineList: { flexDirection: 'column', position: 'relative' },
});