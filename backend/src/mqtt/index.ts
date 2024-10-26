import mqtt, { MqttClient } from "mqtt";

export const connect = () => {
  const brokerUrl = "mqtt://broker.hivemq.com:1883";
  const topic = "praan/pollutants";

  // Connect to the MQTT broker
  const client: MqttClient = mqtt.connect(brokerUrl);

  // MQTT Connect and Subscribe
  client.on("connect", () => {
    console.log(`Connected to MQTT broker at ${brokerUrl}`);
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Subscription error:", err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  // Handle Incoming Messages
  client.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}:`, message.toString());
  });
};
