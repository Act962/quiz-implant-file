import { TextInput, type TextInputProps } from 'react-native';

import { maskPhone } from '@/lib/phone-mask';

type MaskedPhoneInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  value: string;
  onChangeText: (masked: string) => void;
};

export function MaskedPhoneInput({
  value,
  onChangeText,
  style,
  ...rest
}: MaskedPhoneInputProps) {
  return (
    <TextInput
      value={maskPhone(value)}
      onChangeText={(text) => onChangeText(maskPhone(text))}
      keyboardType="phone-pad"
      placeholder="(86) 99999-9999"
      maxLength={16}
      style={style}
      {...rest}
    />
  );
}
