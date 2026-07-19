import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ReactPDFBuilder',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['react', 'tailwindcss', 'html2canvas', 'jspdf'],
            output: {
                globals: {
                    react: 'React',
                    'html2canvas': 'html2canvas',
                    'jspdf': 'jspdf'
                }
            }
        }
    },
    server: {
        port: 3000,
        open: '/examples/'
    }
});