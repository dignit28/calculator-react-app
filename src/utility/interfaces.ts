export interface CalculatorButton {
  id: string;
  text: string | (string | JSX.Element)[];
  value: string;
}
