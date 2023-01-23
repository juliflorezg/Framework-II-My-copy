import {ViewStyle, TextStyle} from 'react-native';

export type CategoryListProps = {
  context?: string;
  redirectTo?: string;
  style: {
    container: ViewStyle;
    title: TextStyle;
    containerCategory: ViewStyle;
    textCategory: TextStyle;
    containerSubcategory: ViewStyle;
    textSubcategory: TextStyle;
  };
};
export type Categories = {
  item: Category
}

export type Category = {
  id: number;
  name: string;
  url: string;
  hasChildren: boolean;
  children: Category[];
  MetaTagDescription: string;
  Title: string;
}

export type ConnectedType = {
    context?: string;
  };