# 📱 Guía para Generar APK de Android

## 🔧 Requisitos Previos

### 1. Instalar Android Studio
- Descarga desde: https://developer.android.com/studio
- Instala Android SDK y herramientas de build
- Configura variables de entorno ANDROID_HOME

### 2. Instalar Java JDK
- Descarga JDK 11 o superior
- Configura JAVA_HOME en variables de entorno

## 🚀 Pasos para Generar APK

### 1. Preparar el proyecto
```bash
# Instalar dependencias
npm install

# Construir la aplicación web
npm run build

# Sincronizar con Capacitor
npx cap sync android
```

### 2. Abrir en Android Studio
```bash
# Abrir proyecto Android
npx cap open android
```

### 3. Configurar la app en Android Studio
- **Cambiar nombre de la app**: `app/src/main/res/values/strings.xml`
- **Cambiar icono**: Reemplazar archivos en `app/src/main/res/mipmap-*/`
- **Configurar permisos**: Verificar `app/src/main/AndroidManifest.xml`

### 4. Generar APK
En Android Studio:
1. **Build** → **Generate Signed Bundle/APK**
2. Seleccionar **APK**
3. Crear nuevo keystore o usar existente
4. Configurar datos del keystore
5. Seleccionar **release**
6. **Finish**

### 5. Ubicación del APK
El APK se generará en:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📋 Configuraciones Importantes

### Permisos en AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE" />
```

### Configurar notificaciones
En `capacitor.config.ts`:
```typescript
plugins: {
  PushNotifications: {
    presentationOptions: ["badge", "sound", "alert"]
  }
}
```

## 🎯 Comandos Rápidos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Sincronizar cambios
npx cap sync

# Abrir en Android Studio
npx cap open android

# Ejecutar en dispositivo
npx cap run android
```

## 📱 Instalación en Dispositivo

### Opción 1: Desde Android Studio
1. Conectar dispositivo Android con USB debugging
2. En Android Studio: **Run** → **Run 'app'**

### Opción 2: APK Manual
1. Transferir APK al dispositivo
2. Habilitar "Fuentes desconocidas" en Configuración
3. Instalar APK manualmente

## 🔧 Solución de Problemas

### Error de SDK
```bash
# Verificar instalación
echo $ANDROID_HOME
echo $JAVA_HOME
```

### Error de build
```bash
# Limpiar y reconstruir
cd android
./gradlew clean
cd ..
npm run build
npx cap sync
```

### Error de permisos
- Verificar AndroidManifest.xml
- Comprobar que todos los permisos estén declarados

## 📊 Optimizaciones

### Reducir tamaño APK
- Habilitar ProGuard en `build.gradle`
- Usar `npm run build` (no `npm run build:dev`)
- Optimizar imágenes antes del build

### Mejorar rendimiento
- Configurar splash screen
- Optimizar carga inicial
- Usar lazy loading para componentes pesados