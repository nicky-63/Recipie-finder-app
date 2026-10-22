# Recipe Finder (Flutter)
Search recipes by name, view ingredients and instructions. Uses the free TheMealDB API (no key needed).

## Run locally
flutter create . --platforms=android
# add <uses-permission android:name="android.permission.INTERNET"/> in android/app/src/main/AndroidManifest.xml (above <application>)
flutter pub get
flutter run
flutter build apk --release   # output: build/app/outputs/flutter-apk/app-release.apk

## Get APK link via GitHub
Push this project to a GitHub repo (main branch). The "Build APK" workflow builds it and
publishes the APK under Releases -> "latest". Add repo Settings -> Actions -> General ->
Workflow permissions -> "Read and write permissions" first.
