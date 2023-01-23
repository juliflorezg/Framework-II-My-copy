import { useExtension } from '@my-app/app/src/framework/engine/extension/context';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Dimensions } from 'react-native';
import { ConnectedType } from '../../../RichText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ArrowLeft } from '@my-app/ui/src/icons';
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useNavigation } from '@react-navigation/native';


type ItemProps = {
  item: { term: string };
};

type IProps = {
  text?: string;
  style?: string;
  redirectTo: string;
  context: string;
};

type StyleProps = {
  container?: ViewStyle;
  containerModal?: ViewStyle;
  wrapperModal?: ViewStyle;
  wrapperModalInput?: ViewStyle;
  searchIcon?: ViewStyle;
  modalInput?: TextStyle;
  textStyles?: TextStyle;
  modalTextSubtitle?: TextStyle;
  modalListStyles?: ViewStyle;
};


const useSharedValue = ({ context }: ConnectedType) => {
  if (!context) return null;
  const { hooks } = useExtension();
  //@ts-ignore
  const fn = hooks[context];
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (typeof fn !== 'function') return;
    fn().then((res: any) => setResponse(res));
  }, []);

  return response;
};

const SearchAddressInputComponent: FC<BlockComponent<IProps>> = ({ props }) => {
  const context = props?.context;
  const sharedValue = useSharedValue({ context });
  const SearchInputStyles = useStyles(props?.style) as StyleProps
  const { hooks } = useExtension();
  const getGeoData = hooks['useGeocode'];
  const { StateMachine } = useCommons();
  const navigation = useNavigation()
  const onSelectAddress = async (data: any) => {
    if (data?.place_id) {
      const response = await getGeoData({
        id: data?.place_id,
        hooks
      })
      console.log(response)
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }

  }



  return (
    <View style={{
      height: "100%",
      paddingTop: 32
    }}>
      <GooglePlacesAutocomplete
        styles={autoComplete}
        placeholder='Busca una dirección'
        renderLeftButton={() => {
          return (
            <TouchableOpacity style={{ alignSelf: "center", marginRight: 8 }} onPress={() => { }}>
              <ArrowLeft width={30} height={30} color="#000" />
            </TouchableOpacity>
          )
        }}
        onPress={(data, details = null) => {
          onSelectAddress(data)
        }}
        query={{
          key: 'AIzaSyAei5DATnb2DY4UgmHgkuac96Fqgfn4mE8',
          language: 'es',
          components: 'country:co',
        }}
      />
    </View>
  );
};

export default SearchAddressInputComponent;

const defaultStyles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Light',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
    color: '#390052',
  }
});


const width = Dimensions.get('screen').width

const autoComplete = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    height: 44,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 13,
    width: width - 64,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    marginVertical: 16,
    backgroundColor: '#fff',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
}