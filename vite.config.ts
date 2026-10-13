import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        specialities: path.resolve(__dirname, 'specialities.html'),
        facilities: path.resolve(__dirname, 'facilities.html'),
        obstetrics: path.resolve(__dirname, 'obstetrics-maternity.html'),
        gynecology: path.resolve(__dirname, 'gynecology-surgery.html'),
        sicu: path.resolve(__dirname, 'surgical-icu.html'),
        ayurveda: path.resolve(__dirname, 'ayurvedic-care.html'),
        inpatient: path.resolve(__dirname, 'inpatient-wards.html'),
        opd: path.resolve(__dirname, 'opd-consultations.html'),
      },
    },
  },
});
