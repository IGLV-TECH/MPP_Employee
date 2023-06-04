package com.example.app;

import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;


public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startRNPage();
    }

    private void startRNPage() {
        Intent intent = new Intent(this, ReactNativeLoadLogin.class);
        startActivity(intent);
        finish();
    }
}