import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {useStyleguide} from '@my-app/app/src/framework/styleguide/context';
import React, {FC} from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import {Link, Icons} from '@my-app/ui';
import useStyles from '../../../../../app/src/framework/styleguide/hooks/useStyles';
type WalkthroughViewProps = {
  google?: boolean;
  googleUrl?: string;
  facebook?: boolean;
  facebookUrl?: string;
  apple?: boolean;
  classic?: boolean;
  classicUrl?: string;
  signup?: boolean;
  signupUrl?: string;
  continue?: boolean;
  continueUrl?: string;
  style?: string;
};

type StylesProps = {
  wrapper?: ViewStyle
}

const WalkthroughView: FC<BlockComponent<WalkthroughViewProps>> = ({props}) => {
  const {
    theme: {palette, spacing},
  } = useStyleguide();

  const styles = useStyles(props?.style) as StylesProps;

  const continueWithEmail = () => {
    if (props?.continue && props?.continueUrl?.length) {
      return (
        <Link
          style={{container: defaultStyles.continueLink}}
          href={props.continueUrl}>
          <Text style={[defaultStyles.continueLinkText]}>
            Iniciar con código
          </Text>
        </Link>
      );
    }
  };

  const facebookView = () => {
    if (props?.facebook && props?.facebookUrl?.length) {
      return (
        <Link
          style={{container: defaultStyles.facebookLink}}
          href={props.facebookUrl}>
          <Icons.FacebookIcon />
          <Text style={[defaultStyles.facebookLinkText]}>
            Continuar con Facebook
          </Text>
        </Link>
      );
    }
  };

  const googleView = () => {
    if (props?.google && props?.googleUrl?.length) {
      return (
        <Link
          style={{container: defaultStyles.googleLink}}
          href={props?.googleUrl}>
          <Icons.GoogleIcon />
          <Text style={[defaultStyles.googleLinkText]}>
            Continuar con Google
          </Text>
        </Link>
      );
    }
  };

  const signupView = () => {
    if (props?.signup && props?.signupUrl?.length) {
      return (
        <Link
          style={{container: defaultStyles.signupLink}}
          href={props?.signupUrl}>
          <Text style={[defaultStyles.signupLinkText]}>Registrarme</Text>
        </Link>
      );
    }
  };

  return (
    <View style={[[defaultStyles.container], [styles.wrapper]]}>
      {continueWithEmail()}
      {facebookView()}
      {googleView()}
      {signupView()}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  //
  // Continue
  continueLink: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 3,
    borderWidth: 1.3,
    borderColor: '#1C1C1C',
    marginBottom: 15,
    flexDirection: 'row',
  },
  continueLinkText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
    marginRight: 8,
  },
  //
  //
  // Signup
  signupLink: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 24,
  },
  signupLinkText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  //
  // Google
  classicLink: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 24,
  },
  classicLinkText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  // Google
  googleLink: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 24,
    elevation: 5,

    flexDirection: 'row',
  },
  googleLinkText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  //
  // Facebook
  facebookLink: {
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 24,
    elevation: 5,
    flexDirection: 'row',
  },
  facebookLinkText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  //
  container: {
    position: 'absolute',
    height: '40%',
    width: '100%',
    bottom: 0,
    paddingHorizontal: 24,
  },
});

export default WalkthroughView;