import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

import { Colors, Layout } from '../constants'; // 🌟 1. 상수 불러오기
import { CustomInput } from '../components/CustomInput'; // 🌟 2. 인풋 컴포넌트
import { PrimaryButton } from '../components/PrimaryButton'; // 🌟 3. 버튼 컴포넌트

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (userId !== 'test' || password !== '1234') {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
    } else {
      setLoginError('');
      alert('로그인 성공! (다음 화면으로 이동)');
    }
  };

  const clearError = () => setLoginError('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          
          <View style={styles.headerSection}>
            <View style={styles.logoWrap}><Text style={styles.logoText}>☕</Text></View>
            <Text style={styles.appTitle}>로그인</Text>
            <Text style={styles.appSubtitle}>오늘 하루의 에너지를 기록하세요</Text>
          </View>

          <View style={styles.formCard}>
            {/* 👇 복잡했던 코드가 딱 두 줄로 끝납니다! */}
            <CustomInput label="아이디" placeholder="아이디를 입력하세요" value={userId} onChangeText={setUserId} onFocus={clearError} autoCapitalize="none" />
            <CustomInput label="비밀번호" placeholder="비밀번호를 입력하세요" value={password} onChangeText={setPassword} onFocus={clearError} isPassword />

            <View style={styles.findPwWrap}>
              <TouchableOpacity activeOpacity={0.6} style={styles.linkTouch}><Text style={styles.findPwLink}>아이디 찾기</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.linkTouch}><Text style={styles.findPwLink}>비밀번호 찾기</Text></TouchableOpacity>
            </View>

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            
            {/* 👇 버튼도 한 줄로 끝! */}
            <PrimaryButton title="로그인" onPress={handleLogin} />
          </View>

          {/* 소셜 로그인 구분선 및 버튼 (UI만 있어서 그대로 둠) */}
          <View style={styles.dividerSection}>
            <View style={styles.dividerLine} /><Text style={styles.dividerText}>SNS 계정으로 계속하기</Text><View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialBtns}>
            {/* 구글 */}
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.6}>
              <View style={[styles.socialIconCircle, { backgroundColor: Colors.google }]}><Svg width="22" height="22" viewBox="0 0 22 22" fill="none"><Path d="M20.6 11.2c0-.7-.1-1.4-.2-2H11v3.8h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/><Path d="M11 21c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H2.1v2.6A10 10 0 0011 21z" fill="#34A853"/><Path d="M5.4 13c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V6.4H2.1A10 10 0 001 11c0 1.6.4 3.1 1.1 4.5L5.4 13z" fill="#FBBC05"/><Path d="M11 4.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15.9 1.8 13.6 1 11 1A10 10 0 002.1 6.4L5.4 9c.8-2.4 3-4.1 5.6-4.1z" fill="#EA4335"/></Svg></View>
            </TouchableOpacity>
            {/* 네이버 */}
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.6}>
              <View style={[styles.socialIconCircle, { backgroundColor: Colors.naver, borderColor: Colors.naver }]}><Svg width="16" height="16" viewBox="0 0 14 14" fill="none"><Path d="M8.2 7.3L5.6 3.5H3.5v7h2.3V6.7l2.6 3.8H10.5v-7H8.2v3.8z" fill="#fff"/></Svg></View>
            </TouchableOpacity>
            {/* 카카오 */}
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.6}>
              <View style={[styles.socialIconCircle, { backgroundColor: Colors.kakao, borderColor: Colors.kakao }]}><Svg width="22" height="20" viewBox="0 0 20 18" fill="none"><Path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.5 0 0 3.4 0 7.6c0 2.7 1.8 5.1 4.5 6.5l-1.2 4.3 5-3.2c.5.1 1.1.1 1.7.1 5.5 0 10-3.4 10-7.7S15.5 0 10 0z" fill="#3C1E1E"/></Svg></View>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>계정이 없으신가요?</Text>
          <TouchableOpacity activeOpacity={0.6}><Text style={styles.signupLink}>회원가입</Text></TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// 불필요한 인풋/버튼 스타일이 싹 사라져서 아주 가벼워졌습니다!
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  scrollContainer: { flexGrow: 1, backgroundColor: Colors.bg },
  mainContent: { flex: 1 },
  headerSection: { alignItems: 'center', paddingTop: 52, paddingHorizontal: 24, paddingBottom: 36, gap: 8 },
  logoWrap: { width: 80, height: 80, borderRadius: Layout.radiusFull, backgroundColor: Colors.surface, borderColor: Colors.border, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 16, ...Layout.shadow1 },
  logoText: { fontSize: 36 },
  appTitle: { fontSize: 24, fontWeight: '700', color: Colors.primary, lineHeight: 32 },
  appSubtitle: { fontSize: 12, fontWeight: '400', color: Colors.text2, lineHeight: 20, textAlign: 'center' },
  formCard: { marginHorizontal: 24, backgroundColor: Colors.surface, borderRadius: Layout.radiusLg, padding: 24, gap: 16, ...Layout.shadow1 },
  findPwWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -4 },
  linkTouch: { height: 40, justifyContent: 'center', paddingHorizontal: 2 },
  findPwLink: { fontSize: 13, fontWeight: '500', color: Colors.primary },
  errorText: { color: Colors.error, fontSize: 12, marginTop: -12, marginBottom: -8, marginLeft: 2 },
  dividerSection: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontSize: 12, fontWeight: '400', color: Colors.text2 },
  socialBtns: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 24, gap: 20 },
  socialBtn: { width: 52, height: 52, borderRadius: 26 },
  socialIconCircle: { ...StyleSheet.absoluteFillObject, borderRadius: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: Colors.border, ...Layout.shadow1 },
  footer: { marginTop: 'auto', borderTopWidth: 1, borderTopColor: Colors.divider, paddingVertical: 20, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 14, fontWeight: '400', color: Colors.text2 },
  signupLink: { height: 44, textAlignVertical: 'center', paddingHorizontal: 4, fontSize: 14, fontWeight: '700', color: Colors.primary },
});