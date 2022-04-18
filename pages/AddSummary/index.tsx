import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "@rneui/themed";
import CustomRadioButton from "../../component/customRadioBtn";
import DatePicker from "../../component/datePicker";
import DropDownPicker from "react-native-dropdown-picker";
import { val, departmentItems, skillItems } from "./sampleItems";
import Loader from "../../component/loader";
import { useDispatch } from "react-redux";
import { POST_USER_SUMMARY, PUT_USER_SUMMARY } from "../../reduxSaga/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { basicFieldParams, AddUserParams, requiredFieldParams } from "../types";
import { lightBlue } from "../../component/colors";

function AddUser({ navigation, route }: AddUserParams) {
  const [fieldValue, setFieldValue] = useState<basicFieldParams>({
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
  });
  const [errorMsg, setErrorMsg] = useState<requiredFieldParams>({
    firstName: "",
    DOB: "",
    gender: "",
    departmentValue: "",
  });
  const [skillsValue, setSkillsValue] = useState<Array<string>>([]);
  const [departmentValue, setDepartmentValue] = useState<string>("");
  const [isOpenSkill, setIsOpenSkill] = useState<boolean>(false);
  const [isOpenDepartment, setIsOpenDepartment] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isloader, setIsLoader] = useState<boolean>(false);

  const dispatch = useDispatch();
  const fieldLabel = ["firstName", "lastName", "DOB", "gender"];
  const editDetails = route?.params?.userDetails;

  useEffect(() => {
    fieldLabel.forEach((label) => {
      setFieldValue((prevState: basicFieldParams) => {
        return {
          ...prevState,
          [label]: (editDetails as any)?.[label] || "",
        };
      });
    });
    setDepartmentValue(editDetails?.department || "");
    setSkillsValue(editDetails?.skills || []);
  }, [editDetails]);

  const handleChange = useCallback((value: string | Date, name: string) => {
    setFieldValue((prevState: basicFieldParams) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  },[]);

  const fieldValidation = useCallback(() => {
    const errorLabel = ["First Name", "DOB", "Gender", "Department"];
    const requiredField = ["firstName", "DOB", "gender", "departmentValue"];
    const fieldRequired: Array<boolean> = [];
    requiredField.forEach((data, index) => {
      if (
        (fieldValue as any)?.[data] === "" ||
        (data === "departmentValue" && departmentValue === "")
      ) {
        setErrorMsg((prevState: requiredFieldParams) => {
          return {
            ...prevState,
            [data]: errorLabel[index] + " is required",
          };
        });
        fieldRequired.push(true);
      } else {
        setErrorMsg((prevState: requiredFieldParams) => {
          return {
            ...prevState,
            [data]: "",
          };
        });
      }
    });
    return fieldRequired;
  },[departmentValue, fieldValue]);

  const submit = async (type: string) => {
    if (fieldValidation().includes(true)) return false;
    setIsLoader(true);
    await dispatch({
      type: type,
      payload: {
        ...fieldValue,
        department: departmentValue,
        skills: skillsValue,
        id: editDetails?.id,
      },
    });
    fieldLabel.forEach((label) => {
      setFieldValue((prevState: basicFieldParams) => {
        return {
          ...prevState,
          [label]: "",
        };
      });
    });
    setIsOpenSkill(false);
    setIsOpenDepartment(false);
    setDepartmentValue("");
    setSkillsValue([]);
    setRefresh(!refresh);
    setIsLoader(false);
    navigation.navigate("Home", { refresh: refresh });
  };

  return (
    <>
      {isloader && <Loader />}
      <SafeAreaView style={styles.formContainer}>
        <View>
          <Text style={styles.firstNamelabel}>
            First Name<Text style={styles.requiredColor}>* </Text>:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(e: string) => handleChange(e, "firstName")}
            value={fieldValue.firstName}
          />
          {errorMsg.firstName ? <Text style={styles.errorMsg}>{errorMsg.firstName}</Text> : <></>}
        </View>
        <View>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e: string) => handleChange(e, "lastName")}
            value={fieldValue.lastName}
          />
        </View>
        <View>
          <Text style={styles.label}>
            DOB<Text style={styles.requiredColor}>* </Text>:{" "}
          </Text>
          <DatePicker
            value={fieldValue.DOB}
            callbackDateValue={(value: string) => handleChange(value, "DOB")}
          />
          {errorMsg.DOB ? <Text style={styles.errorMsg}>{errorMsg.DOB}</Text> : <></>}
        </View>
        <View>
          <Text style={styles.label}>
            Gender<Text style={styles.requiredColor}>* </Text>:{" "}
          </Text>
          <CustomRadioButton
            radioList={val}
            radioValue={fieldValue.gender}
            callbackRbValue={(value: string) => handleChange(value, "gender")}
          />
          {errorMsg.gender ? <Text style={styles.errorMsg}>{errorMsg.gender}</Text> : <></>}
        </View>
        <View>
          <Text style={styles.label}>
            Department<Text style={styles.requiredColor}>* </Text>:{" "}
          </Text>
          <DropDownPicker
            open={isOpenDepartment}
            value={departmentValue}
            items={departmentItems}
            setOpen={setIsOpenDepartment}
            setValue={setDepartmentValue}
            style={styles.departmentDropDown}
            placeholder="Select an department"
            dropDownDirection="TOP"
          />
          {errorMsg.departmentValue ? <Text style={styles.errorMsg}>{errorMsg.departmentValue}</Text> : <></>}
        </View>
        <View>
          <Text style={styles.label}>Skills: </Text>
          <DropDownPicker
            open={isOpenSkill}
            value={skillsValue}
            items={skillItems}
            setOpen={setIsOpenSkill}
            setValue={setSkillsValue}
            style={styles.departmentDropDown}
            placeholder="Select an skills"
            multiple={true}
            mode="BADGE"
            dropDownDirection="TOP"
          />
        </View>
        <View style={styles.buttonContainer}>
        {editDetails && <Button
          buttonStyle={{
            borderRadius: 5,
            marginTop: 30,
            backgroundColor: 'rgba(244, 244, 244, 1)',
          }}
          containerStyle={{
            width: "48%",
          }}
          title={"Cancel"}
          type="outline"
          onPress={() => navigation.navigate("Add Employee")}
        />}
        <Button
          buttonStyle={{
            backgroundColor: lightBlue,
            borderRadius: 5,
            marginTop: 30,
          }}
          containerStyle={{
            width: editDetails ? "48%" : "100%",
          }}
          title={editDetails ? "Update" : "Add"}
          type="solid"
          onPress={() =>
            submit(editDetails ? PUT_USER_SUMMARY : POST_USER_SUMMARY)
          }
        />
      </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  firstNamelabel: {
    marginBottom: 6,
    fontWeight: "bold",
    color: "#1c1c1ead",
  },
  label: {
    marginBottom: 6,
    marginTop: 25,
    fontWeight: "bold",
    color: "#1c1c1ead",

    position: "relative"
  },
  input: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: lightBlue,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "30%",
    borderWidth: 1,
    borderColor: lightBlue,
    backgroundColor: "white",
    height: 40,
  },
  departmentDropDown: {
    borderWidth: 1,
    borderColor: lightBlue,
    borderRadius: 5,
    zIndex: 1000,
  },
  requiredColor: {
    color: "red",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection:"row",
    width: "100%",
    justifyContent: "space-between"
  }
});

export default AddUser;
