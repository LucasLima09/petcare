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
        <TouchableOpacity
            style={[styles.card, selected && styles.cardSelected]}
            onPress={() => { onChange(value), setSelected(!selected) }}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, selected && styles.textSelected]}>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 1.5,
        width: "100%",
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardSelected: {
        borderColor: '#0284C7',
        backgroundColor: '#E0F2FE',
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