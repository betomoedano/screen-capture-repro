# expo-screen-capture Black Screen Bug Reproduction

Minimal reproduction for the iOS black screen issue with `expo-screen-capture` package.

## Bug Description

When calling `allowScreenCaptureAsync()` after `preventScreenCaptureAsync()`, the screen turns completely black on iOS. The black screen persists until the app is force-quit and restarted.

## Environment

- Package: `expo-screen-capture` ~8.0.9
- Platform: iOS (recent versions)
- Expo SDK: ~54

## Steps to Reproduce

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server and run on iOS:
   ```bash
   npm run ios
   ```

3. Once the app loads, press the "Test Screen Capture Bug" button

4. Observe the behavior:
   - Console logs show all 4 steps completing successfully
   - Screen turns black after `allowScreenCaptureAsync()` is called
   - Black screen persists until app is force-quit

## Expected Behavior

The screen should remain normal after calling `allowScreenCaptureAsync()`. Screen capture prevention should be lifted without any visual changes.

## Actual Behavior

The screen turns completely black after `allowScreenCaptureAsync()` is called, requiring an app restart to recover.

## Test Code

The reproduction uses the exact test code from the bug report:

```typescript
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
```
