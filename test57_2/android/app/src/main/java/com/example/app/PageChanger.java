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

    public void writeToFile(String key, String data) {
        try {
            File file = new File(getReactApplicationContext().getFilesDir(), key + "_value.txt");
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter writer = new FileWriter(file);
            writer.append(data);
            writer.flush();
            writer.close();
            Log.i("React Native Write to file", key);
            //throw new RuntimeException("Write to file " + key);
        } catch (IOException e) {
            Log.e("React Native Write to file", key);
            //throw new RuntimeException("Write to file " + key);
        }

    }

    @ReactMethod
    public void readFromFile(String key, Callback callback) {
        StringBuilder stringBuilder = new StringBuilder();
        try {
            File file = new File(getReactApplicationContext().getFilesDir(), key + "_value.txt");
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
        Log.i("get:" + key, stringBuilder.toString());
        callback.invoke(stringBuilder.toString());
    }

    @ReactMethod
    public void loadQRScanner(String token, String idEmployee) {
        Log.i("React native ", "loadQRScanner");
        Intent intent = new Intent(getReactApplicationContext(), ReactNativeQRScanner.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        writeToFile("token", token);
        writeToFile("idEmployee", idEmployee);
        getReactApplicationContext().startActivity(intent);
    }

    @ReactMethod
    public void loadHomeScreen(String idClient, String category) {
        Intent intent = new Intent(getReactApplicationContext(), ReactNativeHomeScreen.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        writeToFile("idClient", idClient);
        writeToFile("category", category);
        getReactApplicationContext().startActivity(intent);
    }

    @ReactMethod
    public void loadLoginScreen() {
        Intent intent = new Intent(getReactApplicationContext(), ReactNativeLoadLogin.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }

}
