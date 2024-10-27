import mqtt, { MqttClient } from "mqtt";
import deviceModel from "../model/device.model";

const brokerUrl: string = "mqtt://broker.hivemq.com:1883";
const topic: string = "praan/pollutants";

// Define the structure of the data
interface PollutantData {
  deviceId: unknown;
  p1: number;
  p25: number;
  p10: number;
}

const publish = () => {
  // Connect to the MQTT broker
  const client: MqttClient = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log(`Publisher Connected to MQTT broker at ${brokerUrl}`);

    // Publish data every 20 seconds
    setInterval(async () => {
      // Generate randomized values for p1, p25, and p10
      const deviceList = await deviceModel.find();
      const randomdata = {
        p1: Math.floor(Math.random() * 100) + 1,
        p25: Math.floor(Math.random() * 100) + 1,
        p10: Math.floor(Math.random() * 100) + 1,
      };
      const data: PollutantData[] = deviceList.map((ele) => {
        return { deviceId: ele._id, ...randomdata };
      });

      // Publish the data to the MQTT topic as a JSON string
      client.publish(topic, JSON.stringify(data), (error) => {
        if (error) {
          console.error("Publish error:", error);
        } else {
          //   console.log("Published data:", data);
        }
      });
    }, 20000); // 20000 milliseconds = 20 seconds
  });

  // Handle errors
  client.on("error", (error: Error) => {
    console.error("MQTT Client Error:", error);
  });
};

const publisher = { publish };

export default publisher;
