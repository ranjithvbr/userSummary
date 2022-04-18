import React, { useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { lightBlue } from "./colors";

type labelListParams = {
  key: string,
  text: string
}

type radioButtonParams = {
  radioList: Array<labelListParams>,
  callbackRbValue: (value: string) => void,
  radioValue: string
}

export default function CustomRadioButton({ radioList, callbackRbValue, radioValue }: radioButtonParams) {
  const [value, setValue] = React.useState<string>();
  useEffect(()=>{
    setValue(radioValue);
  },[radioValue, radioList]);
  return (
    <View style={styles.rbContainer}>
      {radioList.map((res: labelListParams) => {
        return (
          <View key={res.key} style={styles.rbWrapper}>
            <TouchableOpacity
              style={styles.rbStyle}
              onPress={() => {
                setValue(res.key);
                callbackRbValue(res.key);
              }}
            >
              {value === res.key && <View style={styles.selected} />}
            </TouchableOpacity>
            <Text style={styles.textStyle}>{res.text}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rbContainer: {
    flexDirection: "row",
    marginRight: 20,
  },
  rbWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  textStyle: {
    marginLeft: 12,
    color: "#1c1c1ead",
    fontWeight: "700",
  },
  rbStyle: {
    height: 24,
    width: 24,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    width: 14,
    height: 14,
    borderRadius: 55,
    backgroundColor: lightBlue,
  },
  result: {
    marginTop: 22,
    color: "white",
    fontWeight: "600",
    backgroundColor: "blue",
  },
});
