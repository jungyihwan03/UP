import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Layout } from '../constants';

interface TimelineItemProps {
  name: string;
  time: string;
  kcal: string;
  isLast?: boolean;
}

export default function TimelineItem({ name, time, kcal, isLast = false }: TimelineItemProps) {
  return (
    <View style={styles.timelineItem}>
      {!isLast && <View style={styles.timelineLine} />}
      <View style={styles.timelineDot} />
      
      <TouchableOpacity activeOpacity={0.6} style={styles.timelineCard}>
        <View>
          <Text style={styles.timelineName}>{name}</Text>
          <Text style={styles.timelineTime}>{time}</Text>
        </View>
        <Text style={styles.timelineKcal}>{kcal}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  timelineItem: { position: 'relative', paddingLeft: 20, marginBottom: 12 },
  timelineLine: { position: 'absolute', left: 5, top: 18, width: 1, height: '100%', backgroundColor: Colors.border, zIndex: -1 },
  timelineDot: { position: 'absolute', left: -1, top: 18, width: 12, height: 12, backgroundColor: Colors.primary, borderRadius: 6, borderWidth: 2, borderColor: '#FFEDD5' },
  timelineCard: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radiusLg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Layout.shadow1,
  },
  timelineName: { fontSize: 14, fontWeight: '700', color: Colors.text1, marginBottom: 3, lineHeight: 20 },
  timelineTime: { fontSize: 12, color: Colors.text2, lineHeight: 16 },
  timelineKcal: { fontSize: 16, fontWeight: '700', color: Colors.primary },
});