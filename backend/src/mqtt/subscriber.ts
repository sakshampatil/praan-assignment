import mqtt, { MqttClient } from "mqtt";
import pollutantModel from "../model/pollutant.model";

export const subscribe = () => {
  const brokerUrl = "mqtt://broker.hivemq.com:1883";
  const topic = "praan/pollutants";

  // Connect to the MQTT broker
  const client: MqttClient = mqtt.connect(brokerUrl);

  // MQTT Connect and Subscribe
  client.on("connect", () => {
    console.log(`Subscriber Connected to MQTT broker at ${brokerUrl}`);
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Subscription error:", err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  // Handle Incoming Messages
  client.on("message", async (topic, message) => {
    // console.log(`Received message on topic ${topic}:`, JSON.parse(message.toString()));
    const polllutants = JSON.parse(message.toString());
    await pollutantModel.insertMany(polllutants);
  });
};

const subscriber = { subscribe };

export default subscriber;
