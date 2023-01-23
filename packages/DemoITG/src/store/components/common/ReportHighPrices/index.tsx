import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Input} from '@my-app/ui/src';
import {ArrowLeft} from '@my-app/ui/src/icons';
import {useLinkTo, useNavigation} from '@react-navigation/native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Image} from '@my-app/ui';
type IProps = {
  style?: string;
  skuID?: string | number;
};

type StyleProps = {
  wrapHighPrices?: ViewStyle;
  highPricesIcon?: ViewStyle;
  textHighPricesReportedStyles?: TextStyle;
  containerHighPrices?: ViewStyle;
  textHighPricesNotReportedStyles?: TextStyle;
};

const ReportHighPrices: FC<IProps> = ({style, skuID}) => {
  const [reported, setReported] = useState(false);
  const HighPricesStyles = useStyles(style) as StyleProps;

  const onSubmit = () => {
    if (reported) {
      setReported(false);
    } else {
      setReported(true);
    }
  };

  return (
    <View
      style={[
        HighPricesStyles?.containerHighPrices,
        defaultStyles.containerHighPrices,
      ]}>
      {!reported ? (
        <TouchableOpacity onPress={onSubmit}>
          <View
            style={[
              HighPricesStyles?.wrapHighPrices,
              defaultStyles.wrapHighPrices,
            ]}>
            <View
              style={[
                HighPricesStyles?.highPricesIcon,
                defaultStyles.highPricesIcon,
              ]}>
              <Image
                src={
                  'https://moradoapp.vteximg.com.br/arquivos/thermometer-03.png'
                }
                height={24}
                width={20}
              />
            </View>
            <Text
              style={[
                HighPricesStyles?.textHighPricesNotReportedStyles,
                defaultStyles.textHighPricesNotReportedStyles,
              ]}>
              {'Reportar precios altos'}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSubmit}>
          <View
            style={[
              HighPricesStyles?.wrapHighPrices,
              defaultStyles.wrapHighPrices,
            ]}>
            <View
              style={[
                HighPricesStyles?.highPricesIcon,
                defaultStyles.highPricesIcon,
              ]}>
              <Image
                src={'https://moradoapp.vteximg.com.br/arquivos/megaphone.png'}
                height={24}
                width={24}
              />
            </View>
            <Text
              style={[
                HighPricesStyles?.textHighPricesReportedStyles,
                defaultStyles.textHighPricesReportedStyles,
              ]}>
              {'Precio reportado'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReportHighPrices;

const defaultStyles = StyleSheet.create({
  wrapHighPrices: {},
  highPricesIcon: {},
  containerHighPrices: {},
  textHighPricesReportedStyles: {},
  textHighPricesNotReportedStyles: {},
});
