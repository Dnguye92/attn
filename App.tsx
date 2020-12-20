import React, { useState } from 'react';
import { Bar } from "react-native-progress";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { MESSAGE_ATTN, MESSAGE_FOOD, STATUS_FAILED, STATUS_PENDING, STATUS_SUCCESS } from "./constants";

export default function App() {
  const [attentionStatus, setAttentionStatus] = useState("");
  const [attentionProgress, setAttentionProgress] = useState(0.0);
  const [foodStatus, setFoodStatus] = useState("");
  const [foodProgress, setFoodProgress] = useState(0.0);
  const [error, setError] = useState(false);

  const requestAttention = async () => {
    setAttentionProgress(0.0);
    setAttentionStatus(STATUS_PENDING);
    fetch(`https://attn.herokuapp.com/api/gib/attention`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: 5109094568,
        body: MESSAGE_ATTN
      })
    })
    .then(res => {
      setAttentionProgress(0.5);
      return res.json()
    })
    .then(data => {
      if (data.success) {
        setAttentionProgress(1.0);
        setAttentionStatus(STATUS_SUCCESS);
      } else {
        setError(true);
      }
    })
    .catch(err => {
      setAttentionStatus(STATUS_FAILED);
      setAttentionProgress(0.1);
      throw err;
    });
  };

  const requestFood = async () => {
    setFoodProgress(0.0);
    setFoodStatus(STATUS_PENDING);
    fetch(`https://attn.herokuapp.com/api/gib/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: 5109094568,
        body: MESSAGE_FOOD,
      })
    })
    .then(res => {
      setFoodProgress(0.5);
      return res.json()
    })
    .then(data => {
      if (data.success) {
        setFoodProgress(1.0);
        setFoodStatus(STATUS_SUCCESS);
      } else {
        setError(true);
      }
    })
    .catch(err => {
      setFoodProgress(0.1);
      setFoodStatus(STATUS_FAILED);
      throw err;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PEACHY NEED ATTN NOW 🍑</Text>
      <Image
        style={styles.image}      
        source={require("./assets/gib-attn.gif")}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={requestAttention}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Request 1 Attention</Text>
      </TouchableOpacity>
      <Bar
        progress={attentionProgress}
        width={300}
        height={10}
        color={"rgb(255,218,185)"}
      />
      <Text>{attentionStatus}</Text>
      <Image
        style={styles.image}      
        source={require("./assets/gib-food.gif")}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={requestFood}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Tell Him I'm Hungy</Text>
      </TouchableOpacity>
      <Bar
        progress={foodProgress}
        width={300}
        height={10}
        color={"rgb(255,218,185)"}
      />
      <Text>{foodStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 350,
    marginTop: 24,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFDAB9",
    borderRadius: 8,
    padding: 10,
    margin: 24
  },
  buttonText: {
    fontWeight: "bold",
  }
});


