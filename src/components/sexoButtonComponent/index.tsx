import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SexoPet = 'Macho' | 'Fêmea';

interface Props {
    value: SexoPet;
    onChange: (value: SexoPet) => void;
}

export function SexoSelector({ value, onChange }: Props) {

    const [selected, setSelected] = useState<boolean>(false);

    return (
        <View>
            <TouchableOpacity
                style={selected && styles.cardSelected}
                onPress={() => { onChange(value), setSelected(!selected) }}
                activeOpacity={0.8}
            >
                <Text>{value}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        marginVertical: 8,
    },
    card: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardSelected: {
        borderColor: '#0284C7', // Cor de destaque (Ex: Azul/Tema do app)
        backgroundColor: '#E0F2FE', // Fundo levemente colorido
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
    },
    textSelected: {
        color: '#0369A1',
    },
});