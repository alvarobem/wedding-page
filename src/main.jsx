import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'

const theme = {
    token: {
        fontFamily: "'Abel', roboto", 
       
    },
    components: {
        Typography: {
            textAlign: 'justify',
            algorithm: true,
        }
    }
};

createRoot(document.getElementById('root')).render(
  
    <StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
        
    </StrictMode>,
)
