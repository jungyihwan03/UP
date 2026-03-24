import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Rect } from 'react-native-svg';

// 🌟 유저님이 완벽하게 만들어두신 상수 및 공통 컴포넌트 임포트!
import { Colors } from '../constants';
import { CustomInput } from '../components/CustomInput'; 
import { PrimaryButton } from '../components/PrimaryButton';

export const BasicInfo = () => {
  const [gender, setGender] = useState<'M' | 'F' | null>(null);
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('56');
  const [age, setAge] = useState('24');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 헤더 영역 */}
        <View style={styles.headerBlock}>
          <Text style={styles.title}>기본 정보를 알려주세요</Text>
          <Text style={styles.subtitle}>정확한 카페인 섭취 가이드를 위해 정보를 입력해 주세요.</Text>
        </View>

        <View style={styles.formSection}>
          
          {/* 1. 성별 선택 */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>성별</Text>
            <View style={styles.rowWrap}>
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'M' && styles.genderBtnActive]}
                activeOpacity={0.7}
                onPress={() => setGender('M')}
              >
                <Text style={[styles.genderText, gender === 'M' && styles.genderTextActive]}>남성</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'F' && styles.genderBtnActive]}
                activeOpacity={0.7}
                onPress={() => setGender('F')}
              >
                <Text style={[styles.genderText, gender === 'F' && styles.genderTextActive]}>여성</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 2. 키 (유저님의 CustomInput 적용!) */}
          <View style={styles.fieldWrap}>
            <CustomInput
              label="키"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              maxLength={3}
              innerRightText="cm"
              innerRightTextColor={Colors.text2}
            />
            {/* 눈금자 시각화 요소 */}
            <View style={styles.visualBox}>
              <View style={styles.rulerContainer}>
                {[...Array(11)].map((_, i) => (
                  <View key={i} style={[styles.rulerLine, i === 5 ? styles.rulerLineCenter : styles.rulerLineNormal]} />
                ))}
              </View>
            </View>
          </View>

          {/* 3. 몸무게 (유저님의 CustomInput 적용!) */}
          <View style={styles.fieldWrap}>
            <CustomInput
              label="몸무게"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              maxLength={3}
              innerRightText="kg"
              innerRightTextColor={Colors.text2}
            />
            {/* 슬라이더 시각화 요소 */}
            <View style={styles.visualBox}>
              <View style={styles.sliderTrackBg}>
                <View style={[styles.sliderTrackActive, { width: '40%' }]} />
                <View style={[styles.sliderThumb, { left: '40%' }]} />
              </View>
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>30kg</Text>
                <Text style={styles.sliderLabelText}>120kg</Text>
              </View>
            </View>
          </View>

          {/* 4. 나이 (CustomInput과 안내창 나란히 배치) */}
          <View style={styles.rowWrap}>
            <View style={{ flex: 1 }}>
              <CustomInput
                label="나이"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                maxLength={3}
                innerRightText="세"
                innerRightTextColor={Colors.text2}
              />
            </View>
            <View style={styles.infoBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2 }}>
                <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill={Colors.primary} />
              </Svg>
              <Text style={styles.infoText}>연령별 권장 섭취량이 달라집니다.</Text>
            </View>
          </View>

        </View>

        {/* 🌟 유저님의 PrimaryButton 컴포넌트 적용! */}
        <PrimaryButton 
          title="다음" 
          onPress={() => console.log('다음 화면으로 이동')} 
        />

        {/* 하단 푸터 */}
        <View style={styles.footerArea}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <Rect x="5" y="10" width="14" height="11" rx="2" stroke={Colors.text2} strokeWidth="2" />
            <Path d="M8 10V7c0-2.21 1.79-4 4-4s4 1.79 4 4v3" stroke={Colors.text2} strokeWidth="2" strokeLinecap="round" />
          </Svg>
          <Text style={styles.footerText}>개인 정보는 기기에만 저장됩니다.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// 불필요한 인풋 스타일이 모두 빠져서 StyleSheet가 훨씬 날씬해졌습니다!
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: Platform.OS === 'ios' ? 40 : 56 },
  headerBlock: { marginBottom: 40, gap: 8 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.primary, lineHeight: 34 },
  subtitle: { fontSize: 14, fontWeight: '400', color: Colors.text2, lineHeight: 22 },
  formSection: { gap: 32, marginBottom: 48 },
  fieldWrap: { gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '500', color: Colors.text1, paddingLeft: 2, marginBottom: -2 },
  
  // 성별 버튼 스타일
  rowWrap: { flexDirection: 'row', gap: 12, alignItems: 'flex-end' },
  genderBtn: { flex: 1, height: 52, backgroundColor: Colors.surface, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  genderBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  genderText: { fontSize: 15, fontWeight: '600', color: Colors.text2 },
  genderTextActive: { color: '#FFFFFF' },
  
  // 시각화 (눈금자/슬라이더) 박스 스타일
  visualBox: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.border, marginTop: 4 },
  rulerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 24 },
  rulerLine: { width: 2, borderRadius: 1 },
  rulerLineNormal: { height: 12, backgroundColor: Colors.border },
  rulerLineCenter: { height: 24, backgroundColor: Colors.primary },
  sliderTrackBg: { height: 6, backgroundColor: Colors.border, borderRadius: 3, position: 'relative', justifyContent: 'center', marginTop: 8, marginBottom: 12 },
  sliderTrackActive: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  sliderThumb: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary, borderWidth: 3, borderColor: '#FFFFFF', transform: [{ translateX: -10 }], shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 4 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabelText: { fontSize: 12, color: Colors.text3, fontWeight: '500' },
  
  // 나이 안내창
  infoBox: { flex: 1.2, height: 52, backgroundColor: '#F8EAEB', borderRadius: 12, paddingHorizontal: 12, flexDirection: 'row', gap: 6, alignItems: 'center' },
  infoText: { flex: 1, fontSize: 11, color: Colors.text1, lineHeight: 16 },
  
  // 푸터
  footerArea: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24 },
  footerText: { fontSize: 12, color: Colors.text2, fontWeight: '400' },
});