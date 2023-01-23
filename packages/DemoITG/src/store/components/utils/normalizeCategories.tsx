import {
  SearchResponseCategory,
  Category,
} from '../../../utils/category';

const normalizeCategory = (category: Category) => {
  return {
    id: category.id,
    name: category.name.toUpperCase(),
    slug: category.slug,
    hasChildren: category.hasChildren,
    children: category.children,
  };
};

const NormalizeCategories = (
  categories: SearchResponseCategory['categories'],
) => {
  console.log('Categories------', categories);
  return categories.map(category => normalizeCategory(category));
};

export default NormalizeCategories;