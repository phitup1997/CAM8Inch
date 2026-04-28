package com.rnbaseproj

import com.facebook.fbreact.specs.NativeMyModuleSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise

class MyModule(reactContext: ReactApplicationContext) : NativeMyModuleSpec(reactContext) {

    override fun getName(): String = NAME

    override fun getDeviceName(): String {
        return android.os.Build.MODEL
    }

    override fun multiply(a: Double, b: Double, promise: Promise) {
        promise.resolve(a * b)
    }

    companion object {
        const val NAME = "MyModule"
    }
}