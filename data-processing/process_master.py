import os
import glob
import h5py
import numpy as np
import pandas as pd
import re

def process_real_air_quality(input_dir, output_dir):
    """
    Processes real MOPITT HDF5 files to extract average CO values.
    """
    print("Starting REAL Air Quality data processing...")
    
    search_path = os.path.join(input_dir, 'mopitt', '*.he5')
    file_paths = glob.glob(search_path)
    
    if not file_paths:
        print(f"Error: No .he5 files found in {os.path.join(input_dir, 'mopitt')}")
        return

    print(f"Found {len(file_paths)} files to process.")
    
    all_data = []

    for file_path in file_paths:
        try:
            match = re.search(r'-(\d{4})(\d{2})-', os.path.basename(file_path))
            if not match:
                print(f"Could not parse date from filename: {os.path.basename(file_path)}")
                continue
            
            year = match.group(1)
            month = match.group(2)
            date_str = f"{year}-{month}-01"

            with h5py.File(file_path, 'r') as hdf_file:
                co_data = hdf_file['/HDFEOS/GRIDS/MOP03/Data Fields/RetrievedCOTotalColumnDay'][:]
                
                fill_value = -9999.0
                co_data[co_data == fill_value] = np.nan
                
                average_co = np.nanmean(co_data)
                
                # CORRECTED: Removed the incorrect scaling factor.
                # The value is now the direct average from the satellite data.
                scaled_co = average_co

                all_data.append({'date': date_str, 'co_level': scaled_co})
                print(f"Processed {date_str}: Average CO = {scaled_co:.2f}")

        except Exception as e:
            print(f"Could not process file {os.path.basename(file_path)}. Error: {e}")

    df = pd.DataFrame(all_data)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values(by='date')
    
    output_path = os.path.join(output_dir, "air_quality")
    os.makedirs(output_path, exist_ok=True)
    csv_path = os.path.join(output_path, "processed_data.csv")
    df.to_csv(csv_path, index=False)
    
    print(f"SUCCESS: Real air quality data processed and saved to {csv_path}")


if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir = os.path.join(base_dir, 'raw')
    processed_dir = os.path.join(base_dir, 'processed')

    process_real_air_quality(raw_dir, processed_dir)
    
    print("Master processing script finished.")
    