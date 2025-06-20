import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export default function HealthStatsScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your health stats</Text>

      <View style={styles.circleRow}>
        <HealthCircle label="Lung Functionality" value={0.5} />
        <HealthCircle label="Blood Pressure" value={0.35} />
      </View>

      <View style={styles.circleRow}>
        <HealthCircle label="Mental Health" value={0.39} />
      </View>
    </View>
  );
}

function HealthCircle({ label, value }) {
  const data = {
    data: [value], // must be wrapped in an array
  };
  return (
    <View style={styles.circleContainer}>
      <ProgressChart
        data={data}
        width={80}
        height={80}
        strokeWidth={8}
        radius={32}
        chartConfig={{
          backgroundColor: "#2A6D74",
          backgroundGradientFrom: "#2A6D74",
          backgroundGradientTo: "#2A6D74",
          color: () => "#8AF0DC",
        }}
        hideLegend={true}
        style={styles.progressCircle}
      />
      <Text style={styles.circleText}>{Math.round(value * 100)}%</Text>
      <Text style={styles.circleLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A6D74",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    marginBottom:20
  },
  circleRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 30,
  },
  circleContainer: {
    alignItems: "center",
    width: Dimensions.get("window").width / 3,
  },
  progressCircle: {
    height: 80,
    width: 80,
    marginBottom: 10,
  },
  circleText: {
    position: "absolute",
    top: 30,
    fontSize: 16,
    color: "#8AF0DC",
    fontFamily: "Poppins-SemiBold",
  },
  circleLabel: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins",
    marginTop: 5,
  },
  dotIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
  },
});
