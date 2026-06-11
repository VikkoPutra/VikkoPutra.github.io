import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        'data-transformation': resolve(__dirname, 'projects/data-transformation.html'),
        'interactive-dashboard': resolve(__dirname, 'projects/interactive-dashboard.html'),
        'predictive-model': resolve(__dirname, 'projects/predictive-model.html'),
        'autonomous-agent': resolve(__dirname, 'projects/autonomous-agent.html'),
        'your-brain-on-chatgpt': resolve(__dirname, 'articles/your-brain-on-chatgpt.html'),
        'future-ai-agents': resolve(__dirname, 'articles/future-ai-agents.html'),
        'executive-dashboards': resolve(__dirname, 'articles/executive-dashboards.html')
      }
    }
  }
});
