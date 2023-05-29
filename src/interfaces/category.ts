export interface Category {
  id: string;
  category_name: string;
  category_key: string;
  icon_url: string;
}

export interface CategoryCheckboxOption {
  category: Category;
  isChecked: boolean;
}

export interface CategoryListPagingRes {
  page: number;
  size: number;
  nbPages: number;
  nbResults: number;
  data: Category[];
}

export function isCategory(obj: any): obj is Category {
  return (
    "id" in obj &&
    "category_name" in obj &&
    "category_key" in obj &&
    "icon_url" in obj
  );
}

export function isCategoryList(obj: any): obj is Category[] {
  let check = true;
  if (obj.data) {
    obj.Data.foreach((objItem: any) => {
      if (!isCategory(objItem)) {
        check = false;
      }
    });
  }
  return check;
}

export function isCategoryListPagingRes(
  obj: any
): obj is CategoryListPagingRes {
  let isCatList = false;
  if (obj.data) {
    isCatList = isCategoryList(obj.data);
  }
  return (
    "page" in obj &&
    "size" in obj &&
    "nb_pages" in obj &&
    "nb_results" in obj &&
    "data" in obj &&
    isCatList
  );
}
