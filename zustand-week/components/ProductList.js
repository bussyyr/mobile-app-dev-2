import { View, Text, Button, StyleSheet } from 'react-native';
import { useCartStore } from '../store/cartStore';
const products = [
    { id: 1, name: 'Coffee', price: 4.5 },
    { id: 2, name: 'Tea', price: 3.0 },
    { id: 3, name: 'Chocolate', price: 2.5 },
];
export default function ProductList() {
    const addToCart = useCartStore((state) => state.addToCart);
    return (
        <View>
            <Text style={styles.title}>Products</Text>
            {products.map((product) => (
                <View key={product.id} style={styles.row}>
                    <Text>
                        {product.name} - €{product.price.toFixed(2)}
                    </Text>
                    <Button
                        title="Add to cart"
                        onPress={() => addToCart(product)}
                    />
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
    row: { marginBottom: 16 },
});