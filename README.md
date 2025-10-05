# Terra Vision 25
### NASA Space Apps Challenge - 2025 

[![Deployment](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](https://terra-vision-25-opyexh00i-mohnish-ss-projects-9a00c02c.vercel.app/)

**Live Demo URL:** [https://terra-vision-25-opyexh00i-mohnish-ss-projects-9a00c02c.vercel.app/](https://terra-vision-25-opyexh00i-mohnish-ss-projects-9a00c02c.vercel.app/)

---

## Project Overview

Terra Vision 25 is an interactive data visualization tool built for the NASA Space Apps Challenge 2025. It addresses the "Animation Celebration of Terra Data" challenge by transforming over two decades of complex scientific data from NASA's Terra satellite into an accessible and engaging user experience. The application allows users to explore a 3D model of the Earth and view a dynamic chart showcasing long-term trends in global air quality, specifically focusing on Carbon Monoxide (CO) levels. Our goal is to make the vast and valuable dataset from the Terra mission understandable to a broader audience, highlighting long-term environmental patterns and the satellite's incredible legacy.

![Final Application Screenshot](https://github.com/MohnishVik/terra-vision-25/blob/main/TerraVision25.jpg)


---

## Key Features

* **Interactive 3D Globe:** A visually engaging, rotatable 3D globe built with React Three Fiber, serving as the central user interface.
* **Real NASA Data Visualization:** The application features a complete end-to-end data pipeline that fetches, processes, and displays real scientific data.
* **Time-Series Analysis Chart:** An interactive line chart from Recharts visualizes over 20 years of monthly average Carbon Monoxide data, allowing users to observe trends, seasonal variations, and long-term changes.
* **Automated Data Processing:** A Python backend script automates the processing of raw HDF5 data files from the MOPITT instrument, converting them into a clean, web-friendly CSV format.

---

## Technology Stack

* **Frontend:** React.js, React Three Fiber (for 3D rendering), Recharts (for data charts).
* **Data Processing:** Python, with libraries such as Pandas, NumPy, and H5Py for handling the scientific HDF5 data format.
* **Data Source:** MOPITT (Measurements of Pollution in the Troposphere) Level 3 monthly global CO data, provided by NASA Earthdata.
* **Deployment:** Vercel, with continuous deployment linked to this GitHub repository.

---

## How to Run Locally

1.  Clone the repository: `git clone https://github.com/MohnishVik/terra-vision-25.git`
2.  Navigate to the frontend directory: `cd terra-vision-25/frontend`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm start`
