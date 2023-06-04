package com.example.app;

import android.content.Intent;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.*;

public class PageChanger extends ReactContextBaseJavaModule {

    public PageChanger(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PageChanger";
    }

    public void writeToFile(String data) {
        try {
            File file = new File(getReactApplicationContext().getFilesDir(), "example.txt");
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter writer = new FileWriter(file);
            writer.append(data);
            writer.flush();
            writer.close();
            Log.i("React Native", "succccccccccccccccccccccccccc");
        } catch (IOException e) {
            Log.e("React Native", "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr: " + e.getMessage());
        }
    }

    @ReactMethod
    public void readFromFile(Callback callback) {
        StringBuilder stringBuilder = new StringBuilder();
        try {
            File file = new File(getReactApplicationContext().getFilesDir(), "example.txt");
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new FileReader(file));
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                }
                reader.close();
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading file" + e.getMessage());
        }
        Log.i("getToken:", stringBuilder.toString());
        callback.invoke(stringBuilder.toString());
    }


    @ReactMethod
    public void changePage(String newPage) {
        Intent intent = new Intent(getReactApplicationContext(), ReactNativeHomeScreen.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        writeToFile("1");
        getReactApplicationContext().startActivity(intent);
    }
}
