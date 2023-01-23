import React, {FC, useState} from 'react';
import {ImageBackgroundComponent, Image} from '@my-app/ui';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {View, Text, StyleSheet} from 'react-native';
import {Button, PageControl} from 'react-native-ui-lib';

type StateProps = {
  currentPage: number;
  limitShownPages?: false;
  numberOfPagesShown: number;
};

const TutorialComponent: FC<BlockComponent> = ({children, props}) => {
  const [state, setState] = useState<StateProps>({
    currentPage: 0,
    limitShownPages: false,
    numberOfPagesShown: 3,
  });

  const prevPageFN = () => {
    if (state.currentPage > 0) {
    }
    setState({
      currentPage: state.currentPage - 1,
      numberOfPagesShown: state.numberOfPagesShown,
    });
  };

  const nextPageFN = () => {
    if (state.currentPage >= 0) {
      setState({
        currentPage: state.currentPage + 1,
        numberOfPagesShown: state.numberOfPagesShown,
      });
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFEEED'}}>
        <Image
          src={'https://moradoapp.vteximg.com.br/arquivos/Tutorial-1.png'}
          width={props?.width}
          height={props?.height}
          resizeMode={props?.resizeMode}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 350,
          bottom: 0,
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
        }}>
        {state.currentPage === 0 && (
          <View>
            <Text style={defaultStyles.titleStyles}>
              Navega entre nuestras marcas y categorías
            </Text>

            <Text style={defaultStyles.subtitleStyles}>
              Tenemos más de 300 marcas listas con los mejores productos,
              presionando en el botón inferior accedes a todas en un instante.
            </Text>
          </View>
        )}
        {state.currentPage === 1 && (
          <View>
            <Text style={defaultStyles.titleStyles}>
              Accede a ofertas especiales para ti cada día
            </Text>

            <Text style={defaultStyles.subtitleStyles}>
              Descubre las ofertas que Morado prepara cada mañana para tu
              negocio, ahorra dinero, tiempo, y recibe los mejores productos
              para tu negocio de belleza.
            </Text>
          </View>
        )}
        {state.currentPage === 2 && (
          <View>
            <Text style={defaultStyles.titleStyles}>
              Gestiona tu cuenta cuando lo necesites
            </Text>

            <Text style={defaultStyles.subtitleStyles}>
              Creamos un menu que te permita usar y editar tus datos,
              direcciones, pedidos, acceder a tus productos favoritos y más.
            </Text>
          </View>
        )}

        <PageControl
          containerStyle={{alignItems: 'center', padding: 20}}
          numOfPages={state.numberOfPagesShown}
          currentPage={state.currentPage}
          color={'#AA26C6'}
          size={8}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {state.currentPage >= 0 &&
            state.currentPage < state.numberOfPagesShown - 1 && (
              <Button
                label={'Siguiente'}
                style={{backgroundColor: '#AA26C6', width: '100%', margin: 10}}
                onPress={nextPageFN}
              />
            )}

          {state.currentPage > 0 && (
            <Button
              label={'Anterior'}
              style={{backgroundColor: '#AA26C6', width: '100%'}}
              onPress={prevPageFN}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default TutorialComponent;

const defaultStyles = StyleSheet.create({
  titleStyles: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#390052',
    marginHorizontal: 30,
    marginTop: 24,
  },
  subtitleStyles: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: '#390052',
    marginHorizontal: 10,
    marginTop: 24,
  },
});
