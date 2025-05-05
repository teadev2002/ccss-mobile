import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from "../../const/AppColor";

const AppBarSimple = ({ title }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={Color.gradientDefault}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppBarSimple;
