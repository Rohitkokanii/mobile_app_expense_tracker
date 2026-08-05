import React from 'react';
import {FlexWidget, TextWidget} from 'react-native-android-widget';

export default function MyWidget({
  total = 0,
  highest = '-',
  investment = 0,
  insight = 'Healthy spending',
}) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-between',
      }}
      clickAction="OPEN_APP">
      <TextWidget
        text="TrackIt Overview"
        style={{fontSize: 14, color: '#94A3B8'}}
      />

      <TextWidget
        text={`₹${total}`}
        style={{fontSize: 28, color: '#FFFFFF', fontWeight: 'bold'}}
      />

      <FlexWidget
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextWidget
          text={`Top: ${highest}`}
          style={{fontSize: 12, color: '#8B5CF6'}}
        />
        <TextWidget
          text={`Invest: ₹${investment}`}
          style={{fontSize: 12, color: '#34D399'}}
        />
      </FlexWidget>

      <TextWidget
        text={`• ${insight}`}
        style={{fontSize: 11, color: '#CBD5E1'}}
      />
    </FlexWidget>
  );
}
