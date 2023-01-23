export interface SearchResponseCategory {
categories: Category[];
}

export interface Category {
slug: string;
id: string;
name: string;
hasChildren: boolean;
children: SubCategory[];
}
export interface SubCategory {
    id: string;
    name: string;
    slug: string;
  }



