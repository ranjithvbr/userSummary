import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button, FAB } from "@rneui/themed";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_SUMMARY,
  DELETE_USER_SUMMARY,
} from "../../reduxSaga/constants";
import Loader from "../../component/loader";
import { HomeParams, userDetailsParams } from "../types";
import { lightBlue } from "../../component/colors";

function Home({ navigation, route }: HomeParams) {
  const [isloader, setIsLoader] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userSummary = useSelector(
    (state: userDetailsParams) => state?.userSummary?.user?.data
  );
  const deletedUser = useSelector(
    (state: userDetailsParams) => state?.userSummary?.deleterUser
  );
  const refresh = route?.params?.refresh;

  useEffect( () => {
      setIsLoader(true);
      dispatch({ type: GET_USER_SUMMARY });
  }, [refresh, deletedUser, dispatch]);

  useEffect( () => {
    if(userSummary){
      setIsLoader(false);
    }
  }, [userSummary]);

  const deleteRecord = useCallback((id: string) => {
    setIsLoader(true);
    dispatch({
      type: DELETE_USER_SUMMARY,
      payload: {
        id,
      },
    });
  }, [dispatch]);

  return (
    <View style={styles.summaryContainer}>
      {isloader && <Loader />}
      {userSummary?.length === 0 ? <Text style={styles.noDataFound}>Please add the userdetails...</Text> : <></>}
      <ScrollView>
        {userSummary?.map((data: any, index: number) => {
          return (
            <Card
              key={data.id}
              containerStyle={[
                styles.cardContainer,
                userSummary.length === index + 1 && styles.lastCard,
              ]}
            >
              <Card.Title>{data?.firstName + " " + data?.lastName}</Card.Title>
              <Card.Divider />
              <View style={styles.contentContainer}>
                <View>
                  <Text style={styles.label}>DOB</Text>
                  <Text style={styles.label}>Gender</Text>
                  <Text style={styles.label}>Department</Text>
                  {data.skills.length > 0 ? (
                    <Text style={styles.label}>Skills</Text>
                  ) : (
                    <></>
                  )}
                </View>
                <View>
                  <View style={styles.userValue}>
                    <Text style={styles.splitter}>:</Text>
                    <Text>{moment(data.DOB).format("MMM DD, YYYY")}</Text>
                  </View>
                  <View style={styles.userValue}>
                    <Text style={styles.splitter}>:</Text>
                    <Text>{data.gender === "2" ? "Female" : "Male"}</Text>
                  </View>
                  <View style={styles.userValue}>
                    <Text style={styles.splitter}>:</Text>
                    <Text>{data.department}</Text>
                  </View>
                  {data.skills.length > 0 ? (
                    <View style={styles.userValue}>
                      <Text style={styles.splitter}>:</Text>
                      <View style={styles.skills}>
                        {data.skills.map((item: string, index: number) => {
                          return (
                            <Text key={index}>
                              {item +
                                (data.skills.length === index + 1 ? "" : ", ")}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  icon={{
                    name: "pencil",
                    type: "font-awesome",
                    size: 15,
                    color: "white",
                  }}
                  buttonStyle={{
                    backgroundColor: lightBlue,
                    height: 37,
                    marginRight: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("Add Employee", { userDetails: data })
                  }
                />
                <Button
                  icon={{
                    name: "trash",
                    type: "font-awesome",
                    size: 18,
                    color: "white",
                  }}
                  buttonStyle={{
                    backgroundColor: "#c72b62",
                    height: 37,
                  }}
                  onPress={() => deleteRecord(data.id)}
                />
              </View>
            </Card>
          );
        })}
      </ScrollView>
      <FAB
        icon={{ name: "add", color: "white" }}
        style={styles.FABContainer}
        color={lightBlue}
        onPress={() => navigation.navigate("Add Employee")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1
  },
  noDataFound: {
    fontSize: 18,
    margin: 20
  },
  lastCard: {
    marginBottom: 90,
  },
  cardContainer: {
    borderRadius: 4,
  },
  contentContainer: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  splitter: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  userValue: {
    flexDirection: "row",
    marginVertical: 5,
    width: "80%",
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#d4d4d4",
    paddingTop: 7,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  FABContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Home;
