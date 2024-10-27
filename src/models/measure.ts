export interface Measure {
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  measure_value: number;
  measure_uuid: string;
}
