import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

function Globe() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#3399ff" wireframe />
    </mesh>
  );
}

// This function will format our large numbers
const yAxisFormatter = (tickValue) => {
  // Converts the number to scientific notation like "3e+6"
  return tickValue.toExponential(0);
};

function App() {
  const [airQualityData, setAirQualityData] = useState([]);

  useEffect(() => {
    fetch('/processed_data.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          let entry = {};
          headers.forEach((header, i) => {
            entry[header.trim()] = isNaN(values[i]) ? values[i] : Number(values[i]);
          });
          return entry;
        });
        setAirQualityData(data.filter(d => d.date));
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Terra Vision 25</h1>
        <p>NASA Space Apps Challenge</p>
      </header>
      <div className="main-content">
        <div className="globe-container">
          <Canvas>
            <ambientLight intensity={0.5} />
            <Stars />
            <Globe />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="chart-container">
          <h2>Air Quality (CO Levels)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={airQualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" tickFormatter={yAxisFormatter} />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="co_level" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;