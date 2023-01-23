import React, {FC} from 'react';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Image} from '@my-app/ui';
import {Linking, Platform, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  phone: string;
};

const WhatsappChat: FC<BlockComponent<Props>> = ({props}) => {
  const sendWhatsApp = () => {
    const phoneWithCountryCode = props?.phone;

    const mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      const url = 'https://api.whatsapp.com/send?&phone=' + mobile;
      Linking.openURL(url)
        .then(data => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure WhatsApp installed on your device');
        });
    } else {
      alert('Please insert mobile no');
    }
  };
  return (
    <TouchableOpacity style={defaultStyles.container} onPress={sendWhatsApp}>
      <Image
        width={60}
        height={60}
        src={'https://moradoapp.vteximg.com.br/arquivos/whatsapp-logo.png'}
      />
    </TouchableOpacity>
  );
};

export default WhatsappChat;

const defaultStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    bottom: 40,
    right: 20,
  },
});
