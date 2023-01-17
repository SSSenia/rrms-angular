import { EChartsOption } from "echarts";

export interface IArticle {
  header: string;
  content: string;
}

export interface IChartValue {
  value: [Date, number]
}

export interface IStatisticValues {
  realData: {
    temperature: IChartValue[];
    pressure: IChartValue[];
    humidity: IChartValue[];
  },
  prognosisData: {
    temperature: IChartValue[];
    pressure: IChartValue[];
    humidity: IChartValue[];
  }
}

export interface ICurrentValues {
  temperature: number;
  pressure: number;
  humidity: number;
}

export interface IPackageEChartOption {
  temperature: EChartsOption,
  pressure: EChartsOption,
  humidity: EChartsOption
}