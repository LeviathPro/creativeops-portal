plugins {
    id("com.android.application")
    id("com.google.gms.google-services") // Firebase services
}
dependencies {
    implementation(platform("com.google.firebase:firebase-bom:33.0.0"))
    implementation("com.google.firebase:firebase-analytics")
}
