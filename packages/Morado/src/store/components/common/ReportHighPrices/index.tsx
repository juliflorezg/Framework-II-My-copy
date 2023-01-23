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
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Image} from '@my-app/ui';
import {createYupSchema} from '../../Form/utils/buildSchemaValidation';
import {object} from 'yup';
import {parseResponse} from '@my-app/app/src/framework/omni-logic/plugin/hook/use-omni-hook';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StoreFormProvider} from '../../Form/context';
import FormInput from '../../Form/FormInput';
import {SubmitButton} from '../../Form/FormSubmit';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {Product} from '../../../../utils/product';
import {ExitIcon} from '../../icons';
import usePrice from '@vercel/commerce/product/use-price';
type IProps = {
  style?: string;
  skuID?: string | number;
  product?: Product;
};

type StyleProps = {
  wrapHighPrices?: ViewStyle;
  highPricesIcon?: ViewStyle;
  textHighPricesReportedStyles?: TextStyle;
  containerHighPrices?: ViewStyle;
  textHighPricesNotReportedStyles?: TextStyle;
};

type MachineProductConfig = {
  machineName: string;
  pointer?: string;
  machineNameAut: string;
};

const machineConfig: MachineProductConfig = {
  machineName: 'productManager',
  machineNameAut: 'authentication',
};

const ReportHighPrices: FC<IProps> = ({style, skuID, product}) => {
  const [reported, setReported] = useState(false);
  const HighPricesStyles = useStyles(style) as StyleProps;
  const [displayActionSheet, setActionSheet] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {hooks} = useExtension();
  const {StateMachine} = useCommons();
  const [data, setData] = useState({});
  const [email, setEmail] = useState({});
  const [datahook, setDataHook] = useState([]);

  useEffect(() => {
    const machineAut = StateMachine.getData(machineConfig.machineNameAut);
    if (machineAut) {
      const {context} = machineAut;
      setEmail(context);
    }

    if (email?.user?.email) {
      StateMachine.send(machineConfig.machineName, 'SELECTED-PRODUCT', {
        product: {...product, email: email?.user?.email},
      });
      componentDidMount();
      const machine = StateMachine.getData(machineConfig.machineName);

      if (machine) {
        const {context} = machine;
        setData(context);
      }
    }
  }, [product, email, displayActionSheet]);

  const componentDidMount = async () => {
    let input = {};

    if (email?.user?.email)
      input = {...input, _where: `email=${email?.user?.email}`};

    const submit = hooks['useReportPrices'];

    console.log('submit', submit);

    const data = await submit({
      input,
      hooks,
    });

    setDataHook(data['useReportPrices']);
  };

  useEffect(() => {
    if (datahook.length) {
      const filtered = datahook.filter(item => {
        return item.productId === Number(data?.selectedProduct?.id);
      });

      const exist = filtered.length ? true : false;

      setReported(exist);
      console.log('filtered', filtered);
    }
  }, [datahook, displayActionSheet]);

  const schemaValidation = [
    {
      id: 'locationName',
      type: 'text',
      validationType: 'string',
      validations: [
        {
          type: 'required',
          params: ['Este campo es requerido'],
        },
        {
          type: 'max',
          params: [32, 'El nombre no puede ser mayor a 50 caracteres'],
        },
        {
          type: 'matches',
          params: [
            '/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/',
            'El nombre solo puede contener letras',
          ],
        },
      ],
    },
    {
      id: 'otherPrice',
      type: 'text',
      validationType: 'string',
      validations: [
        {
          type: 'required',
          params: ['El código que has ingresado es incorrecto'],
        },
        {
          type: 'matches',
          params: ['/^[0-9]+$/', 'Debe ser solo dígitos'],
        },
      ],
    },
    {
      id: 'isExpensive',
      type: 'text',
      validationType: 'string',
    },
  ];

  const yepSchema = useMemo(
    () => object().shape(schemaValidation?.reduce(createYupSchema, {})),
    [],
  );

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(yepSchema),
    context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });
  const onSubmit = async (formValues: {[x: string]: unknown}) => {
    const parsedResponses = parseResponse(formValues, {
      to: {
        locationName: 'locationName',
        otherPrice: 'otherPrice',
        isExpensive: 'isExpensive',
      },
    });
    const submit = hooks['useAddReportPrices'];

    setLoading(true);
    const response = await submit({
      ...parsedResponses,
      hooks,
    });
    setLoading(false);
  };

  const {price} = usePrice(
    data && {
      amount: Number(data?.selectedProduct?.price?.value),
      currencyCode: "COP",
    },
  );

console.log("data?.selectedProduct.images[0].src",data?.selectedProduct?.price?.value)
  const children = (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 6,
          shadowOffset: {
            height: 10,
            width: 0,
          },
          shadowOpacity: 0.25,
          elevation: 10,
          height: 600,
          width: 350,
        }}>
        
        <FormProvider {...methods}>
          <StoreFormProvider
            config={{
              onSubmit,
              defaultValues: {},
              submitIsLoading: isLoading,
              schemaValidation,
            }}>
            <>
            
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    height={32}
                    width={32}
                    src={
                      'https://moradoapp.vteximg.com.br/arquivos/megaphone-1.png'
                    }
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      color: '#390052',
                      padding: 10,
                      fontWeight: 'bold',
                    }}>
                    {'Reportar precios'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F5',
                    height: 32,
                    width: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 24,
                    marginRight: 20,
                  }}
                  onPress={() => setActionSheet(false)}>
                  <ExitIcon />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row"}}>
          <Image 
            src={data?.selectedProduct?.images[0].url}
            height={70}
            width={70}
          />
          <View style={{flexDirection:"column"}}>
          <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 14,
              
                  textAlign: 'justify',
                  color: '#390052',
                }}>
                {data?.selectedProduct?.name}
              </Text>

              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
              
                  textAlign: 'justify',
                  color: '#390052',
                }}>
                {price}
              </Text>
            </View>

          
          </View>

          <View
              style={[
                {
                  width: '80%',
                  height: 0.5,
                  backgroundColor: '#C1C1C1',
                  opacity: 0.5,
                  marginLeft: 30,
                },
              ]}
            />
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',

                  fontSize: 18,
                  padding: 10,
                  textAlign: 'justify',
                  color: '#390052',
                }}>
                {'¿Crees que el precio es alto?'}
              </Text>
              <FormInput
                props={{
                  variant: 'select-input',
                  name: 'isExpensive',
                  placeholder: 'Me parece caro',
                  style: 'form-input-default',
                  selectedImg:
                    'https://moradoapp.vteximg.com.br/arquivos/Check-icon.png',
                  unSelectedImg:
                    'https://moradoapp.vteximg.com.br/arquivos/Check-icon-2.png',
                }}
              />

              <FormInput
                props={{
                  name: 'locationName',
                  placeholder: '¿En qué sitio lo viste más barato?',
                  style: 'form-input-default',
                }}
              />
              <FormInput
                props={{
                  name: 'otherPrice',
                  placeholder: 'Escribe el precio que viste',
                  style: 'form-input-default',
                }}
              />
              <SubmitButton
                props={{
                  buttonText: 'Reportar ahora',
                  style: 'submit-button-high-prices',
                }}
              />
            </>
          </StoreFormProvider>
        </FormProvider>
      </View>
    </View>
  );

  const activateActionSheet = () => {
    if (!reported) {
      setActionSheet(true);
    }
  };

  return (
    <>
      <View
        style={[
          HighPricesStyles?.containerHighPrices,
          defaultStyles.containerHighPrices,
        ]}>
        {!reported ? (
          <TouchableOpacity onPress={activateActionSheet}>
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
        )}
      </View>

      {displayActionSheet && (
        <Modal
          animationType="fade"
          visible={displayActionSheet}
          transparent={true}>
          <TouchableWithoutFeedback onPress={() => setActionSheet(false)}>
            {children}
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
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
