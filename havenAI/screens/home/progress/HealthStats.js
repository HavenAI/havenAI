import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useUser } from "../../../context/UserContext";
import { API_BASE_URL } from "@env";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function HealthStatsScreen() {
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);
    const {token} = useUser();

    useEffect(() => {
        const fetchHealthStats = async () => {
          try {
            
            const res = await fetch(`${API_BASE_URL}/health-score/get`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(res)
            const data = await res.json();
            console.log(data)
    
            if (data?.data?.initialized === false) {
           
              const postRes = await fetch(`${API_BASE_URL}/health-score/save/initial`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(postRes)
              const postData = await postRes.json();
              console.log(postData)
              setScores({
                lung: postData.data.lung_functionality / 100,
                heart: postData.data.heart_health / 100,
                mental: postData.data.mental_health / 100,
              });
            } else {
          
              const putRes = await fetch(`${API_BASE_URL}/health-score/update/latest`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(putRes)
              const updatedData = await putRes.json();
              console.log("hello")
              console.log(updatedData)
              if (!putRes.ok || !updatedData?.data) {
                const initialData = data.data;
                const fallback = initialData?.latest_healthscore;
                
                console.log(fallback)
                if (fallback) {
                  setScores({
                    lung: fallback.latest_lung_functionality / 100,
                    heart: fallback.latest_heart_health / 100,
                    mental: fallback.latest_mental_health / 100,
                  });
                } else {
                    console.error("Unexpected backend error:", updatedData);
                  setScores(null); 
                }
              } else {
                setScores({
                  lung: updatedData.data.latest_lung_functionality / 100,
                  heart: updatedData.data.latest_heart_health / 100,
                  mental: updatedData.data.latest_mental_health / 100,
                });
            }
        }
          } catch (error) {
            console.error("Failed to fetch health scores:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchHealthStats();
      }, []);

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Your health stats</Text>
      
          {loading ? (
            <ActivityIndicator size="large" color="#8AF0DC" style={{ marginTop: 50 }} />
          ) : scores ? (
            <>
              <View style={styles.circleRow}>
                <HealthCircle label="Lung Functionality" value={scores.lung ?? 0} />
                <HealthCircle label="Heart Health" value={scores.heart ?? 0} />
              </View>
      
              <View style={styles.circleRow}>
                <HealthCircle label="Mental Health" value={scores.mental ?? 0} />
              </View>
            </>
          ) : (
            <Text style={{ color: "#fff", marginTop: 20 }}>No health stats available.</Text>
          )}
        </View>
      );
    }      

function HealthCircle({ label, value }) {
    const percentage = Math.round(value * 100);
  const data = {
    data: [value],
  };
  return (
    <View style={styles.circleContainer}>
       <AnimatedCircularProgress
        size={80}
        width={8}
        fill={percentage}
        tintColor="#8AF0DC"
        backgroundColor="#173D3F"
        arcSweepAngle={270}
        rotation={225}
        lineCap="round"
      >
        {
          () => (
            <Text style={styles.circleText}>
              {percentage}%
            </Text>
          )
        }
      </AnimatedCircularProgress>
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