import { Text, View, Button, StyleSheet } from "react-native";
import * as ScreenCapture from "expo-screen-capture";

export default function Index() {
  const testScreenCaptureBug = async () => {
    try {
      console.log("[ScreenCapture Test] Step 1: Calling preventScreenCaptureAsync...");

      await ScreenCapture.preventScreenCaptureAsync("test-key");

      console.log("[ScreenCapture Test] Step 2: preventScreenCaptureAsync completed. Waiting 2 seconds...");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("[ScreenCapture Test] Step 3: Calling allowScreenCaptureAsync...");

      await ScreenCapture.allowScreenCaptureAsync("test-key");

      // This line logs but screen is already black
      console.log("[ScreenCapture Test] Step 4: allowScreenCaptureAsync completed. If you see this, NO black screen!");
    } catch (error) {
      console.error("[ScreenCapture Test] Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-screen-capture Bug Reproduction</Text>
      <Text style={styles.description}>
        Press the button to test the screen capture bug.{"\n"}
        Expected: Nothing should change visually{"\n"}
        Actual: Screen turns black after allowScreenCaptureAsync
      </Text>
      <Button
        title="Test Screen Capture Bug"
        onPress={testScreenCaptureBug}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 24,
  },
});
