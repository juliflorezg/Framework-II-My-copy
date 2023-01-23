export const truncate = (data: string, maxCharts: number) =>{
    return data?.length > maxCharts
      ? `${data?.substr(0, maxCharts)}...`
      : data;
  }
 