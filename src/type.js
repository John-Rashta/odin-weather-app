export default function getType(value) {
  let userInput;
  if (value.includes(",")) {
    userInput = value.split(",")[0].trim();
  } else {
    userInput = value;
  }
  const typeArr = [
    ["weather-cloudy", "type_41"],
    ["weather-sunny", "type_43"],
    ["weather-partly-cloudy", "type_27", "type_28", "type_29", "type_42"],
    [
      "weather-partly-rainy",
      "type_4",
      "type_11",
      "type_14",
      "type_26",
      "type_6",
    ],
    ["weather-rainy", "type_2", "type_20", "type_21", "type_24", "type_9"],
    ["weather-pouring", "type_10", "type_13", "type_25", "type_3", "type_5"],
    ["weather-snowy", "type_1", "type_31", "type_33"],
    ["weather-snowy-rainy", "type_22", "type_32"],
    ["weather-snowy-heavy", "type_34"],
    ["weather-partly-snowy", "type_35"],
    ["weather-partly-snowy-rainy", "type_23"],
    ["weather-fog", "type_12", "type_19", "type_8"],
    ["weather-hail", "type_16", "type_17", "type_40"],
    ["weather-dust", "type_39", "type_7"],
    ["weather-hazy", "type_30"],
    ["weather-lightning_rainy", "type_37"],
    ["weather-lightning", "type_18", "type_38"],
    ["weather-windy", "type_36"],
    ["weather-tornado", "type_15"],
  ];

  const weatherType = typeArr.find((row) => {
    return row.find((cell) => cell === userInput);
  });
  return weatherType[0];
}
