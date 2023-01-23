import React, {FC, Fragment} from 'react';
import {Link} from '@my-app/ui';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Image} from '@my-app/ui';
import {View, Text, StyleSheet} from 'react-native';
type FeaturedCategoriesProps = {
  categories: CategoryProps,
}
type CategoryProps = {
    children?: React.ReactNode | null;
}
type ItemProps = {
    text: string,
    value: string,
    href: string,
}
const FeaturedCategories: FC<BlockComponent<FeaturedCategoriesProps>> = ({props}) => {
  return(
    props?.categories?.map((item: ItemProps) => {
        return (
          <Fragment key={item?.href}>
            <Link href={item?.href} style={defaultStyles.text}>
              <View style={defaultStyles.container}>
                <Image
                  src={item?.value}
                  width={90}
                  height={90}
                  resizeMode={'contain'}
                />
                <Text style={defaultStyles.text}>{item?.text}</Text>
              </View>
            </Link>
          </Fragment>
        );
      })
  )
};
export default FeaturedCategories

const defaultStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    width: 140,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 20,
    color: '#390052',
    justifyContent:"center",
    textAlign: 'center',
  },
});
