export interface MySector {
  key: number; // Represent hierarchy level
  text: string; // Change 'name' to 'text'
  value: number; // Change 'id' to 'value'
  children?: MySector[]; // Change 'subcategories' to 'children'
}
