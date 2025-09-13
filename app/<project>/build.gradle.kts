plugins {
    id("com.android.application")
    id("com.google.gms.google-services") // Firebase services
    // add any other plugins you use here
}

android {
    namespace = "com.creativedeckfence.creativeopsportal"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.creativedeckfence.creativeopsportal"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:33.0.0"))
    implementation("com.google.firebase:firebase-analytics")
}
