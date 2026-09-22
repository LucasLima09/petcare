import { AuthProvider } from './src/routes/authContext';
import Routes from './src/routes/rootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
