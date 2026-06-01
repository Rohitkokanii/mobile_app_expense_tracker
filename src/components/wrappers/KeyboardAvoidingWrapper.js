import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {RefreshControl} from 'react-native';

const KeyboardAvoidingWrapper = ({
  children,
  loader,
  style,
  loaderFunction,
  extraScrollHeight,
  scrollEnabled,
  scrollViewRef,
}) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl
          enabled={!!loaderFunction}
          refreshing={loader}
          onRefresh={loaderFunction}
        />
      }
      keyboardShouldPersistTaps={'handled'}
      enableAutomaticScroll={true}
      extraScrollHeight={extraScrollHeight || responsiveHeight(5)}
      enableOnAndroid={true}
      scrollEnabled={scrollEnabled}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingWrapper;

// ?? kame sure to set  android:windowSoftInputMode="adjustPan" in android Manifest
