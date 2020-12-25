import React, { useEffect, useState } from 'react';
import { Bar } from "react-native-progress";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { MESSAGE_ATTN, MESSAGE_FOOD, STATUS_FAILED, STATUS_PENDING, STATUS_SUCCESS, TICKS } from "./constants";

export default function App() {
  const [attentionStatus, setAttentionStatus] = useState("");
  const [attentionProgress, setAttentionProgress] = useState(0.0);
  const [foodStatus, setFoodStatus] = useState("");
  const [foodProgress, setFoodProgress] = useState(0.0);
  const [tickStatus, setTickStatus] = useState("");
  const [tickProgress, setTickProgress] = useState(0.0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [error, setError] = useState(false);
  const randomTick = TICKS[Math.floor(Math.random() * TICKS.length)];

  const requestAttention = async () => {
    setAttentionProgress(0.5);
    setAttentionStatus(STATUS_PENDING);
    fetch(`https://attn.herokuapp.com/api/gib/message`, {
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
    setFoodProgress(0.5);
    setFoodStatus(STATUS_PENDING);
    fetch(`https://attn.herokuapp.com/api/gib/message`, {
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

  const sendTick = async () => {
    setTickProgress(0.5);
    setTickStatus(STATUS_PENDING);
    fetch(`https://attn.herokuapp.com/api/gib/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: 5109094568,
        body: randomTick,
      })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        setTickProgress(1.0);
        setTickStatus(STATUS_SUCCESS);
      } else {
        setError(true);
      }
    })
    .catch(err => {
      setTickProgress(0.1);
      setTickStatus(STATUS_FAILED);
      throw err;
    });
  }

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * TICKS.length));
  }, [randomNumber]);

  return (
    <ScrollView style={styles.scrollView}>
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
      <Image
        style={styles.image}      
        source={require("./assets/90DF.gif")}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={sendTick}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Send a tick</Text>
      </TouchableOpacity>
      <Bar
        progress={tickProgress}
        width={300}
        height={10}
        color={"rgb(255,218,185)"}
      />
      <Text>{tickStatus}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "scroll",
  },
  image: {
    height: 200,
    width: 350,
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
  },
  scrollView: {
    marginTop: 48,
  }
});


