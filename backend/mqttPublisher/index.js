const mqtt = require("mqtt");

const brokerUrl = "mqtt://broker.hivemq.com:1883";
const topic = "praan/pollutants";

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Publish data every 20 seconds
  setInterval(() => {
    // Generate randomized values for p1, p25, and p10
    const data = {
      p1: Math.floor(Math.random() * 100) + 1,
      p25: Math.floor(Math.random() * 100) + 1,
      p10: Math.floor(Math.random() * 100) + 1,
    };

    // Publish the data to the MQTT topic as a JSON string
    client.publish(topic, JSON.stringify(data), (error) => {
      if (error) {
        console.error("Publish error:", error);
      } else {
        console.log("Published data:", data);
      }
    });
  }, 20000); // 20000 milliseconds = 20 seconds
});

// Handle errors
client.on("error", (error) => {
  console.error("MQTT Client Error:", error);
});
