package com.calculator

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalculatorModule(reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalculatorModule"

    @ReactMethod
    fun executeCalc(action:String, numberA:Double, numberB:Double, promise: Promise){
        Log.v("CalculatorTag", "give action is "+ action)
        if(action == "plus"){
            promise.resolve(numberA + numberB);
            return;
        }

        if(action == "minus"){
            promise.resolve(numberA - numberB);
            return;
        }

        if(action == "multiply"){
            promise.resolve(numberA * numberB);
            return;
        }

        if(action == "divide"){
            promise.resolve(numberA/numberB);
            return;
        }


        promise.reject("Unexpected action type" + action)
    }
}