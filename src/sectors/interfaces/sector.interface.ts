export interface MySector {
  id: number;
  name: string;
  parentId: number;
  subcategories?: MySector[];
}
