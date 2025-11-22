#!/bin/bash

echo "Starting CPU stress test..."
echo "Duration: 5 minutes"
echo "CPU cores: 8"

stress --cpu 8 --timeout 300

echo "Stress test completed!"