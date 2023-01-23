import React, {FC, Fragment, useMemo} from 'react';
import {Icons, Link} from '@my-app/ui';

import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {useRoute} from '@react-navigation/native';
import {Image} from '@my-app/ui';
import {View, Text, StyleSheet} from 'react-native';

type SubCategorySelectorProps = {
  categories:any
}

export const SubCategorySelector: FC<BlockComponent<SubCategorySelectorProps>> = ({props}) => {
  const {params} = useRoute();
 
  if (!params?.department) return;

  const render = useMemo(
    () =>
    props?.categories[params?.department]?.map(item => {
        return (
          <Fragment key={item?.href}>
            <Link href={item?.href} style={defaultStyles.text}>
              <View style={defaultStyles.container}>
                <Image
                  src={item?.value}
                  width={48}
                  height={48}
                  resizeMode={'contain'}
                />
                <Text style={defaultStyles.text}>{item?.text}</Text>
              </View>
            </Link>
          </Fragment>
        );
      }),
    [params?.department],
  );

  return render;
};

const defaultStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    width: 80,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: '#1C1C1C',
    justifyContent:"center",
    textAlign: 'center',
  },
});
