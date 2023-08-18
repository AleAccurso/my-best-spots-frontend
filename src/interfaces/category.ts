export interface CategoryDTO {
  id: string;
  category_name: string;
  category_key: string;
}

export interface CategoryCheckboxOption {
  category: CategoryDTO;
  isChecked: boolean;
}

export interface CategoryCheckboxConfig {
  category_key: string;
  isChecked: boolean;
}

export interface CategoryPagingResDTO {
  page: number;
  size: number;
  nbPages: number;
  nbResults: number;
  data: CategoryDTO[];
}

export function isCategory(obj: any): obj is CategoryDTO {
  return (
    "id" in obj &&
    "category_name" in obj &&
    "category_key" in obj &&
    "svg_icon_content" in obj &&
    Object.keys(obj).length == 4
  );
}

export function isCategoryList(obj: any): obj is CategoryDTO[] {
  let check = true;
  if (obj.data) {
    obj.data.foreach((objItem: any) => {
      if (!isCategory(objItem)) {
        check = false;
      }
    });
  }
  return check;
}

export function isCategoryPagingResDTO(obj: any): obj is CategoryPagingResDTO {
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
    Object.keys(obj).length == 5 &&
    isCatList
  );
}
