export type SelectItem<T = string> = {
  title: string;
  value: T;
};

const emptySelect: SelectItem = {
  title: '--- пустое значение ---',
  value: '',
};

export class SelectHelper {
  static createOptionsIntoStrings = (items: string[]): SelectItem[] =>
    items.map((item) => ({ title: item, value: item }));

  static addClearOption = (options: SelectItem[]): SelectItem[] => [
    emptySelect,
    ...options,
  ];
}
