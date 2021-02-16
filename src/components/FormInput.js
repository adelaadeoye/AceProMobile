import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Image, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { v_scale, scale } from 'sm/utils/StylesConst';

export default function Input({ onBlur, labelText, value, containerStyles, inputStyles, placeholderTextColor, required, noMargin, widthFull,
  errorMessage, isValid, hideInput, type, place_holder, custStyles, eventUsed, compDate, goalSty, ...props }) {

  handleBlur = () => {
    if (onBlur) onBlur();
  }

  return (
    <View style={[!custStyles && styles.wrapper, widthFull && { width: '100%' }, custStyles?.container]}>
      {!eventUsed && <Text style={[!custStyles && styles.label]}>{labelText}</Text>}
      <View style={[styles.inputContainerStyle, noMargin && styles.noMargin, containerStyles, widthFull && { width: '100%', borderColor: 'grey' },
      (required && isValid === false) && styles.errorStyle, custStyles && { borderWidth: 0, width: '100%' }, goalSty &&
      { borderWidth: 0, borderBottomWidth: 1, borderColor: Colors.AmberRed }]}>
        <View style={styles.inputWrapper}>
          {!hideInput ? <TextInput
            {...props}
            value={value}
            autoCapitalize={(type === 'email') ? 'none' : 'words'}
            style={[styles.input, (required && isValid === false && errorMessage) && styles.inputError, inputStyles]}
            placeholderTextColor={(placeholderTextColor) ? placeholderTextColor : Colors.Pink}
            onBlur={handleBlur}
          /> : ((compDate || Platform.OS === 'ios') ? compDate : <Text style={[styles.input, !value && { color: Colors.Pink }]}
            onPress={hideInput}>{value || place_holder}</Text>)}
          {
            (required && isValid === false && errorMessage) ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : <View />
          }
        </View>
        <View style={[styles.iconWrapper, !isValid && styles.errorIcon, (required && isValid !== null) && styles.showIcon]}>
          <Icon name={!isValid ? 'exclamation' : 'check'}
            size={15} color="#fff" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: Textsizes.Regular,
    lineHeight: v_scale(20),
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: Colors.AmberRed,
  },
  inputError: {
    height: v_scale(18),
  },
  showIcon: {
    opacity: 1
  },
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
    borderWidth: scale(1),
    borderColor: '#f09386',
    paddingVertical: Platform.OS === 'ios' ? v_scale(16) : v_scale(13.2),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
  },
  label: {
    fontSize: Textsizes.Medium,
    color: Colors.AmberRed,
    fontWeight: 'bold'
  },
  errorStyle: {
    borderColor: Colors.AmberRed
  },
  placeholder: {
    color: Colors.AmberRed
  },
  noMargin: {
    marginBottom: 0
  },
  iconWrapper: {
    width: scale(24),
    height: scale(24),
    marginLeft: scale(16),
    backgroundColor: 'green',
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0
  },
  errorIcon: {
    backgroundColor: Colors.AmberRed
  },
  errorText: {
    fontSize: Textsizes.Small,
    color: Colors.AmberRed,
    marginBottom: -8
  }
})