export default function getType(value) {
    const typeArr = [
        ["weather_cloudy", "type_41"],
        ["weather_sunny", "type_43"],
        ["weather_partly_cloudy", "type_27", "type_28", "type_29", "type_42"],
        ["weather_partly_rainy", "type_4", "type_11", "type_14", "type_26", "type_6"],
        ["weather_rainy", "type_2", "type_20", "type_21", "type_24", "type_9"],
        ["weather_pouring", "type_10", "type_13", "type_25", "type_3", "type_5"],
        ["weather_snowy", "type_1", "type_31", "type_33"],
        ["weather_snowy_rainy", "type_22", "type_32"],
        ["weather_snowy_heavy", "type_34"],
        ["weather_partly_snowy", "type_35"],
        ["weather_partly_snowy_rainy", "type_23"],
        ["weather_fog", "type_12", "type_19", "type_8"],
        ["weather_hail", "type_16", "type_17", "type_40"],
        ["weather_dust", "type_39", "type_7"],
        ["weather_hazy", "type_30"],
        ["weather_lightning_rainy", "type_37"],
        ["weather_lightning", "type_18", "type_38"],
        ["weather_windy", "type_36"],
        ["weather_tornado", "type_15"],
    ]

    const weatherType = typeArr.find((row) => {
        return (row.find((cell) => cell === value ))
    });
    return weatherType[0];
}