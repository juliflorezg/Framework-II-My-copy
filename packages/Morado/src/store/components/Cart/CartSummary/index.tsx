import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import {Text} from 'react-native';
import {ProgressBar, TouchableOpacity} from 'react-native-ui-lib';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {ChevronDown, ChevronUp} from '@my-app/ui/src/icons';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {Image} from '@my-app/ui/src';
import usePrice from '@vercel/commerce/product/use-price';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

const MachineConfig = {
  machineName: 'cartManager',
  pointer: 'products',
};

interface StyleProps {
  showDetails?: ViewStyle;
  textShowDetails?: TextStyle;
  wrapperIconShowDetail?: ViewStyle;
  wrapperPurchaseDetail?: ViewStyle;
  wrapperPurchaseDetailText?: TextStyle;
  textProductsDetails?: TextStyle;
  textTaxDetails?: TextStyle;
  textDiscountsDetails?: TextStyle;
  wrapperTextTermometer?: ViewStyle;
  textTermometer?: TextStyle;
  textTermometerBold?: TextStyle;
}

export const CartSummary: FC<BlockComponent<any>> = ({props}) => {
  const bodyRef = useAnimatedRef<Animated.View>();
  const {height} = useWindowDimensions();
  const [data, setData] = useState({
    TotalPrice: 0,
    TotalDiscount: 0,
    TotalPorcentage: 0,
  });
  const [expanded, setExpanded] = useState(false);
  const heightPosition = height - 298;
  const y = useSharedValue(heightPosition);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  }, [y]);

  const cartSummaryStyles = useStyles(props?.style) as StyleProps;

  const {StateMachine} = useCommons();
  const machines = useGlobalState();
  const [{context}] = machines[MachineConfig.machineName]?.actor;

  useEffect(() => {

   
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;

      const totalizer = context[MachineConfig.pointer].reduce(
        (accum, currentValue) => {
     
          accum = {
            price:
              accum.price != undefined
                ? Number(accum.price) + (Number(currentValue.price.value) * currentValue.quantity)
                : (Number(currentValue.price.value) * currentValue.quantity),
            discount:
              accum.discount != undefined
                ? Number(accum.discount) +
                  Number(currentValue.price.discountPercentage)
                : Number(currentValue.price.discountPercentage),
          };
        
          return accum;
        },
        {},
      );

      const totalValue = 100000;
      const percentage = Math.round((totalizer.price / totalValue) * 100);

      setData({
        TotalPrice: totalizer.price || 0,
        TotalDiscount: totalizer.discount || 0,
        TotalPorcentage: percentage || 0,
      });
    }
  }, [context.products ]);

  const onClick = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      // @ts-ignore
      y.value = withTiming(heightPosition - 100, {duration: 500});
    } else {
      if (y.value !== heightPosition) {
        y.value = withTiming(heightPosition, {duration: 500});
      }
    }
  }, [bodyRef, expanded, heightPosition]);

 

  const tax = data?.TotalPrice * 0.19;

  const discount = data?.TotalPrice * data?.TotalDiscount;

  const {price: SubTotal} = usePrice({
    amount: data?.TotalPrice,
    currencyCode: 'COP',
  });

  const {price: SubTotalTax} = usePrice({
    amount: tax,
    currencyCode: 'COP',
  });

  const {price: DiscountPrice} = usePrice({
    amount: discount,
    currencyCode: 'COP',
  });
 
  return (
    <>
    {data?.TotalPrice > 0 && 
      <Animated.View
        style={[
          {
            width: '100%',
            height: height - 298,
            position: 'absolute',
            backgroundColor: 'white',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <TouchableOpacity onPress={onClick}>
          {!expanded ? (
            <View
              style={[
                defaultStyles.showDetails,
                cartSummaryStyles.showDetails,
              ]}>
              <Text
                style={[
                  defaultStyles.textShowDetails,
                  cartSummaryStyles.textShowDetails,
                ]}>
                {'Ver detalle de compra'}
              </Text>
              <View
                style={[
                  defaultStyles.wrapperIconShowDetail,
                  cartSummaryStyles.wrapperIconShowDetail,
                ]}>
                <ChevronUp width={18} height={18} stroke={'#fff'} />
              </View>
            </View>
          ) : (
            <>
              <View
                style={[
                  defaultStyles.showDetails,
                  cartSummaryStyles.showDetails,
                ]}>
                <Text
                  style={[
                    defaultStyles.textShowDetails,
                    cartSummaryStyles.textShowDetails,
                  ]}>
                  {'Ocultar detalle de compra'}
                </Text>
                <View
                  style={[
                    defaultStyles.wrapperIconShowDetail,
                    cartSummaryStyles.wrapperIconShowDetail,
                  ]}>
                  <ChevronDown width={18} height={18} stroke={'#fff'} />
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>

        <View
          style={[
            defaultStyles.wrapperPurchaseDetail,
            cartSummaryStyles.wrapperPurchaseDetail,
          ]}>
          {expanded && (
            <View>
              <View
                style={[
                  defaultStyles.wrapperPurchaseDetailText,
                  cartSummaryStyles.wrapperPurchaseDetailText,
                ]}>
                <Text
                  style={[
                    defaultStyles.textProductsDetails,
                    cartSummaryStyles.textProductsDetails,
                  ]}>
                  {'Precio de los productos'}
                </Text>
                <Text
                  style={[
                    defaultStyles.textProductsDetails,
                    cartSummaryStyles.textProductsDetails,
                  ]}>
                  {SubTotal}
                </Text>
              </View>

              <View
                style={[
                  defaultStyles.wrapperPurchaseDetailText,
                  cartSummaryStyles.wrapperPurchaseDetailText,
                ]}>
                <Text
                  style={[
                    defaultStyles.textTaxDetails,
                    cartSummaryStyles.textTaxDetails,
                  ]}>
                  {'Impuestos'}
                </Text>
                <Text
                  style={[
                    defaultStyles.textTaxDetails,
                    ,
                    cartSummaryStyles.textTaxDetails,
                  ]}>
                  {SubTotalTax}
                </Text>
              </View>

              <View
                style={[
                  defaultStyles.wrapperPurchaseDetailText,
                  cartSummaryStyles.wrapperPurchaseDetailText,
                ]}>
                <Text
                  style={[
                    defaultStyles.textDiscountsDetails,
                    ,
                    cartSummaryStyles.textDiscountsDetails,
                  ]}>
                  {'Descuentos'}
                </Text>
                <Text
                  style={[
                    defaultStyles.textDiscountsDetails,
                    cartSummaryStyles.textDiscountsDetails,
                  ]}>
                  {DiscountPrice}
                </Text>
              </View>

              <View
                style={[
                  {
                    width: '100%',
                    height: 0.5,
                    backgroundColor: '#000',
                    opacity: 0.5,
                    marginVertical: 20,
                  },
                ]}
              />
            </View>
          )}
          <ProgressBar
            progress={
              data.TotalPorcentage > 100 ? 100 : data.TotalPorcentage || 0
            }
            style={{height: 10, backgroundColor: 'rgba(38, 198, 92, 0.2)'}}
            progressColor={'#26C65C'}
          />
          <View
            style={[
              defaultStyles.wrapperTextTermometer,
              cartSummaryStyles.wrapperTextTermometer,
            ]}>
            <Image
              width={32}
              height={32}
              src={
                'https://moradoapp.vteximg.com.br/arquivos/3d-electricity-sign2x.png'
              }
            />
            {data.TotalPorcentage < 100 ? (
              <Text
                style={{
                  color: '#390052',
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                }}>
                {'¡Envío gratuito luego de $100.000!'}
              </Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    defaultStyles.textTermometer,
                    cartSummaryStyles.textTermometer,
                  ]}>
                  {'¡Ahora tu envío es '}
                </Text>
                <Text
                  style={[
                    defaultStyles.textTermometerBold,
                    cartSummaryStyles.textTermometerBold,
                  ]}>
                  {'gratis!'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
      }
    </>
  );
};

const defaultStyles = StyleSheet.create({
  showDetails: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textShowDetails: {
    color: '#390052',
    fontSize: 18,
  },
  wrapperIconShowDetail: {
    backgroundColor: '#390052',
    height: 18,
    width: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperPurchaseDetail: {
    marginTop: 10,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  wrapperPurchaseDetailText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProductsDetails: {
    color: 'rgba(57, 0, 82, 0.5)',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  textTaxDetails: {
    color: '#DD1E2F',
    fontSize: 14,
  },
  textDiscountsDetails: {
    color: '#26C65C',
    fontSize: 14,
  },
  wrapperTextTermometer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTermometer: {
    color: '#390052',
    fontSize: 14,
  },
  textTermometerBold: {
    color: '#390052',
    fontSize: 14,
  },
});
