# 📱 Guía Completa: UMBRAL Android APK

## 🎯 PASOS PRINCIPALES

### 1. **PREPARACIÓN DEL ENTORNO**

#### Instalar Android Studio
```bash
# Descargar desde: https://developer.android.com/studio
# Durante la instalación, asegúrate de incluir:
# - Android SDK
# - Android SDK Platform-Tools  
# - Android SDK Build-Tools
# - Android Emulator
```

#### Configurar Variables de Entorno
```bash
# En Windows (añadir al PATH):
ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11.0.x

# En macOS/Linux (añadir a ~/.bashrc o ~/.zshrc):
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 2. **PREPARAR TU PROYECTO UMBRAL**

```bash
# 1. Instalar dependencias
npm install

# 2. Construir la aplicación para producción
npm run build

# 3. Sincronizar con Capacitor
npx cap sync android

# 4. Abrir en Android Studio
npx cap open android
```

### 3. **CONFIGURAR LA APP EN ANDROID STUDIO**

#### Cambiar Información de la App
1. **Nombre de la app**: 
   - Archivo: `android/app/src/main/res/values/strings.xml`
   - Cambiar: `<string name="app_name">UMBRAL</string>`

2. **ID de la aplicación**:
   - Archivo: `android/app/build.gradle`
   - Cambiar: `applicationId "com.umbral.vapefree"`

3. **Versión**:
   - En el mismo archivo `build.gradle`:
   ```gradle
   versionCode 1
   versionName "1.0.0"
   ```

#### Configurar Icono de la App
1. En Android Studio: `app/src/main/res/mipmap-*/`
2. Reemplazar todos los archivos `ic_launcher.png` con tu icono
3. O usar: **File → New → Image Asset** para generar automáticamente

### 4. **GENERAR APK FIRMADA**

#### Opción A: Desde Android Studio (RECOMENDADO)
1. **Build → Generate Signed Bundle/APK**
2. Seleccionar **APK**
3. **Create new keystore**:
   - Key store path: `umbral-keystore.jks`
   - Password: `[tu-password-seguro]`
   - Key alias: `umbral-key`
   - Validity: 25 años
   - Datos del certificado (nombre, organización, etc.)
4. Seleccionar **release**
5. **Finish**

#### Opción B: Desde Terminal
```bash
# Generar keystore (solo primera vez)
keytool -genkey -v -keystore umbral-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias umbral-key

# Construir APK firmada
cd android
./gradlew assembleRelease

# Firmar APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../umbral-keystore.jks app/build/outputs/apk/release/app-release-unsigned.apk umbral-key

# Alinear APK
zipalign -v 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/UMBRAL-final.apk
```

### 5. **UBICACIÓN DEL APK FINAL**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 🔧 CONFIGURACIONES ESPECÍFICAS PARA UMBRAL

### Permisos Necesarios
Tu app ya tiene configurados los permisos básicos en `AndroidManifest.xml`:
- Internet (para PWA)
- Almacenamiento (para datos locales)
- Notificaciones (para recordatorios)

### Optimizaciones para Rendimiento
```gradle
// En android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 📱 INSTALACIÓN Y DISTRIBUCIÓN

### Instalar en tu Dispositivo
1. **Habilitar "Fuentes desconocidas"** en Configuración → Seguridad
2. **Transferir APK** al dispositivo (USB, email, etc.)
3. **Instalar** tocando el archivo APK

### Para Distribución Amplia
1. **Google Play Store**:
   - Crear cuenta de desarrollador ($25 USD)
   - Subir APK firmada
   - Completar información de la app

2. **Distribución Directa**:
   - Compartir APK por email/web
   - Usuarios deben habilitar "fuentes desconocidas"

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "SDK not found"
```bash
# Verificar instalación
echo $ANDROID_HOME
ls $ANDROID_HOME/platforms
```

### Error: "Gradle build failed"
```bash
# Limpiar y reconstruir
cd android
./gradlew clean
cd ..
npm run build
npx cap sync android
```

### Error: "Java version incompatible"
- Instalar JDK 11 o superior
- Configurar JAVA_HOME correctamente

### APK muy grande
- Usar `npm run build` (no `build:dev`)
- Habilitar ProGuard
- Optimizar imágenes

## 📊 COMANDOS ÚTILES

```bash
# Ver dispositivos conectados
adb devices

# Instalar APK directamente
adb install android/app/build/outputs/apk/release/app-release.apk

# Ver logs de la app
adb logcat | grep UMBRAL

# Desinstalar app
adb uninstall app.lovable.6ec405f34eee4f72af447dc6069909f9
```

## 🎯 CHECKLIST FINAL

- [ ] Android Studio instalado y configurado
- [ ] Variables de entorno configuradas
- [ ] Proyecto construido (`npm run build`)
- [ ] Capacitor sincronizado (`npx cap sync android`)
- [ ] Información de la app configurada
- [ ] Icono personalizado añadido
- [ ] APK firmada generada
- [ ] APK probada en dispositivo real
- [ ] Lista para distribución

## 💡 CONSEJOS ADICIONALES

1. **Prueba siempre** en dispositivo real antes de distribuir
2. **Guarda el keystore** en lugar seguro (necesario para actualizaciones)
3. **Documenta las credenciales** del keystore
4. **Considera usar AAB** (Android App Bundle) para Play Store
5. **Optimiza el tamaño** eliminando dependencias no usadas

¡Tu app UMBRAL estará lista para ayudar a más personas a dejar el vapeo! 🚭✨