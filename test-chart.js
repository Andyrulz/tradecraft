// Simple test to understand lightweight-charts API
import { createChart } from 'lightweight-charts';

// Create a temporary div element
const container = document.createElement('div');
const chart = createChart(container);

// Check available methods
console.log('Chart methods:', Object.getOwnPropertyNames(chart));
console.log('Chart prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(chart)));
