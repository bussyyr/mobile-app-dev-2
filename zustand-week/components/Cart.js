import { View, Text, Button, StyleSheet } from 'react-native';
import { useCartStore } from '../store/cartStore';
export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    const totalQuantity = cart.reduce(
        (sum, product) => sum + product.quantity,
        0
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart ({totalQuantity})</Text>
            {cart.length === 0 && <Text>Your cart is empty.</Text>}
            {cart.map((product) => (
                <View key={product.id}>
                    <Text>
                        {product.name} × {product.quantity}
                        {' - '}€{(product.price * product.quantity).toFixed(2)}
                    </Text>
                    <View style={styles.actions}>
                        <Button
                            title="Add one"
                            onPress={() => addToCart(product)}
                        />

                        <Button
                            title="Remove one"
                            onPress={() => removeFromCart(product.id)}
                        />
                    </View>
                </View>
            ))}
            <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>
            <Button title="Clear cart" onPress={clearCart} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { marginTop: 28, paddingTop: 18, borderTopWidth: 1 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
    total: { marginTop: 12, fontSize: 18, fontWeight: 'bold' },
    actions: {
        gap: 12,
        marginTop: 8,
        marginBottom: 16,
        flexDirection: 'row',
    }
});