import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dialog } from "@rneui/themed";
import { lightBlue } from "./colors";

type datePickerParams = {
  callbackDateValue: (value: any)=>void,
  value: any,
}

type timeStampParams = {
  nativeEvent: {
    timestamp: Date
  }
}

export default function DatePicker({ callbackDateValue, value }: datePickerParams) {
  const [isPickerShow, setIsPickerShow] = useState<boolean>(false);
  const [date, setDate] = useState<any>();

  useEffect(()=>{
    setDate(value ? new Date(value) : value);
  }, [value])

  const onChange = (event: timeStampParams, value: Date ) => {
    const timestamp = Platform.OS === "ios" ? value : event?.nativeEvent?.timestamp
    if(timestamp) {
    setDate(timestamp);
    callbackDateValue(timestamp)
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  }
  };

  const datePicker = () => {
    return (
      <DateTimePicker
        value={date || new Date(Date.now())}
        mode={"date"}
        display={Platform.OS === "ios" ? "spinner" : "spinner"}
        is24Hour={true}
        onChange={Platform.OS === "ios" ? onChange : (e: any)=>onChange(e, value)}
        maximumDate={new Date()}
      />
    );
  };

  const selectDate = () => {
    setDate(date || new Date());
    callbackDateValue(date || new Date());
    setIsPickerShow(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickedDateContainer}
        onPress={() => setIsPickerShow(!isPickerShow)}
      >
        {date ? (
          <Text style={styles.pickedDate}>
            {moment(date).format("MMM D, YYYY")}
          </Text>
        ) : (
          <Text style={styles.datePlaceholder}>DD/MM/YYYY</Text>
        )}
      </TouchableOpacity>
      {isPickerShow && Platform.OS === "ios" ? (
        <Dialog
          isVisible={isPickerShow}
          onBackdropPress={() => setIsPickerShow(false)}
        >
          {datePicker()}
          <Button onPress={selectDate} title="ok"></Button>
        </Dialog>
      ) : isPickerShow ? datePicker() : <View />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  pickedDateContainer: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: lightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  pickedDate: {
    paddingLeft: 10,
    color: "black",
  },
  datePlaceholder: {
    paddingLeft: 10,
    color: "#555",
  },
  closeText: {
    color: lightBlue,
    paddingRight: 10,
  },
});
