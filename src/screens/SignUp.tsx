import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Polyline } from 'react-native-svg';

// 🌟 공통 상수 및 컴포넌트 불러오기
import { Colors, Layout } from '../constants';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { SmallButton } from '../components/SmallButton';
import NavHeader from '../components/NavHeader'; // 👉 분리한 헤더 컴포넌트 임포트!

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(179);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); 

  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [confirmPwError, setConfirmPwError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      if (isCodeSent) setCodeError('입력 시간이 초과되었습니다. 다시 요청해주세요.');
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isCodeSent]);

  const handleSendCode = () => {
    if (!email || !email.includes('@')) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    setEmailError('');
    setCodeError('');
    setIsCodeSent(true);
    setIsTimerRunning(true);
    setTimeLeft(179); 
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const isFormValid = email.includes('@') && code.length === 6 && username.trim().length > 0 && 
                      password.length >= 8 && password === confirmPassword && isTermsChecked;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      {/* 👇 복잡했던 헤더 코드를 단 한 줄로 교체했습니다! */}
      <NavHeader title="회원가입" onBack={() => console.log('뒤로가기 클릭됨')} />

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>간식 섭취 관리를{'\n'}시작해보세요</Text>
          <Text style={styles.heroSub}>이메일로 간편하게 가입하세요.</Text>
        </View>

        <View style={styles.formCard}>
          
          <CustomInput 
            label="이메일" 
            placeholder="example@email.com" 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            onBlur={() => { if (email && !email.includes('@')) setEmailError('올바른 이메일 형식을 입력해주세요.'); else setEmailError(''); }}
            rightAction={<SmallButton title={isCodeSent ? '재전송' : '인증요청'} onPress={handleSendCode} />}
          />

          <CustomInput 
            label="인증번호" 
            placeholder="6자리 숫자 입력" 
            value={code} 
            onChangeText={(text) => { setCode(text); setCodeError(''); }}
            keyboardType="number-pad"
            maxLength={6}
            error={codeError}
            innerRightText={isCodeSent ? formatTime(timeLeft) : undefined}
            innerRightTextColor={timeLeft === 0 ? Colors.error : Colors.primary}
            rightAction={
              <SmallButton 
                title="확인" 
                variant="outlined" 
                onPress={() => { if(code !== '123456') setCodeError('인증번호가 일치하지 않습니다.'); }} 
              />
            }
          />

          <CustomInput 
            label="아이디" 
            placeholder="아이디를 입력해주세요" 
            value={username} 
            onChangeText={setUsername} 
            autoCapitalize="none" 
          />

          <CustomInput 
            label="비밀번호" 
            placeholder="영문, 숫자, 특수문자 조합 8자리 이상" 
            value={password} 
            onChangeText={setPassword} 
            isPassword 
            hint="영문, 숫자, 특수문자 조합 8자리 이상"
          />

          <CustomInput 
            label="비밀번호 확인" 
            placeholder="비밀번호를 한번 더 입력해주세요" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            isPassword 
            error={confirmPwError}
            onBlur={() => { if (confirmPassword && confirmPassword !== password) setConfirmPwError('비밀번호가 일치하지 않습니다.'); else setConfirmPwError(''); }}
          />

        </View>
      </ScrollView>

      {/* 하단 약관 및 버튼 영역 */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.termsRow} activeOpacity={0.7} onPress={() => setIsTermsChecked(!isTermsChecked)}>
          <View style={[styles.checkbox, isTermsChecked && styles.checkboxChecked]}>
            {isTermsChecked && (
              <Svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                <Polyline points="1.5 5 4.5 8 10.5 1.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            )}
          </View>
          <Text style={styles.termsLabel}>
            서비스 이용을 위한 <Text style={styles.linkText}>이용약관</Text> 및 <Text style={styles.linkText}>개인정보처리방침</Text>에 동의합니다.
          </Text>
        </TouchableOpacity>

        <PrimaryButton title="다음" onPress={() => alert('가입 완료!')} disabled={!isFormValid} />
      </View>
    </SafeAreaView>
  );
};

// 💡 appBar 관련 스타일들(appBar, btnBack, appBarTitle, appBarSpacer)이 
// NavHeader 내부로 옮겨갔으므로 StyleSheet가 더욱 가벼워졌습니다!
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface }, // SafeArea 배경은 bg 사용
  scrollArea: { flex: 1, backgroundColor: Colors.bg },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 32 },
  hero: { paddingTop: 28, paddingBottom: 28, gap: 8 },
  heroTitle: { fontSize: 24, fontWeight: '700', color: Colors.primary, lineHeight: 33.6, letterSpacing: -0.3 },
  heroSub: { fontSize: 12, fontWeight: '400', color: Colors.text2, lineHeight: 20 },
  formCard: { backgroundColor: Colors.surface, borderRadius: Layout.radiusLg, padding: 24, gap: 20, ...Layout.shadow1 },
  bottomArea: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: Platform.OS === 'ios' ? 16 : 36, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.divider, ...Layout.shadow4, gap: 16 },
  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48 },
  checkbox: { width: 22, height: 22, borderRadius: 8, borderWidth: 2, borderColor: Colors.border, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  termsLabel: { flex: 1, fontSize: 12, color: Colors.text1, lineHeight: 20 },
  linkText: { color: Colors.primary, fontWeight: '500', textDecorationLine: 'underline' },
});