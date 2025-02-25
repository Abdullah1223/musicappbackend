const { Kafka, logLevel } = require('kafkajs');
const fs = require('fs');

// Ensure that the CA certificate path is correct
const caCert = fs.readFileSync('./KafkaConnection/ca.pem', 'utf-8');

const kafka = new Kafka({
  clientId: 'MusicAppNew',
  brokers: [process.env.KAFKA_BROKER],
  ssl: {
    ca: [caCert], 
  },
  sasl: {
    mechanism: 'SCRAM-SHA-512',
    username:"avnadmin",
    password:"AVNS_9U_F_D6RfJyeUKHzReC"          // Check if Aiven requires SCRAM-SHA-512 instead
    // Your Aiven credentials
  },
  logLevel: logLevel.ERROR,
});

const producer = kafka.producer();

// Connect the producer to Kafka
const connection = async () => {
  try {
    await producer.connect();
    console.log('Producer Connected to Kafka');

    
  } catch (error) {
    console.error('Error connecting producer:', error);
  }
};

module.exports = { producer,  connection, kafka };
