import { StyleSheet, Text, View } from 'react-native';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Shop</Text>
      <ProductList />
      <Cart />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  heading: { fontSize: 30, fontWeight: 'bold', marginBottom: 24 },
});