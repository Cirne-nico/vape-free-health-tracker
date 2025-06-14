# 📱 Guía: De ZIP Exportado a APK de Android

## 🎯 PROCESO COMPLETO

### 1. **EXPORTAR Y PREPARAR EL PROYECTO**

#### Exportar desde Bolt
1. **Exportar como ZIP** desde la interfaz de Bolt
2. **Descomprimir** en tu ordenador
3. **Abrir terminal** en la carpeta del proyecto

#### Verificar el Proyecto
```bash
# Navegar a la carpeta del proyecto
cd ruta/a/tu/proyecto-umbral

# Verificar que tienes los archivos necesarios
ls -la
# Deberías ver: package.json, src/, public/, capacitor.config.ts, etc.

# Instalar dependencias
npm install
```

### 2. **CONFIGURAR CAPACITOR PARA ANDROID**

```bash
# Verificar que Capacitor está configurado
npx cap doctor

# Si no existe la carpeta android, añadir la plataforma
npx cap add android

# Construir la aplicación web
npm run build

# Sincronizar con Capacitor
npx cap sync android
```

### 3. **PREPARAR ENTORNO DE DESARROLLO**

#### Instalar Android Studio
- **Descargar**: https://developer.android.com/studio
- **Instalar** con SDK Tools incluidos
- **Configurar** variables de entorno:

```bash
# Windows (añadir al PATH del sistema):
ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11.0.x

# macOS/Linux (añadir a ~/.bashrc o ~/.zshrc):
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. **ABRIR PROYECTO EN ANDROID STUDIO**

```bash
# Desde la carpeta del proyecto
npx cap open android
```

### 5. **CONFIGURAR LA APP**

#### Cambiar Información Básica
1. **Nombre de la app**:
   - Archivo: `android/app/src/main/res/values/strings.xml`
   - Cambiar: `<string name="app_name">UMBRAL - Libre de Vapeo</string>`

2. **ID de aplicación**:
   - Archivo: `android/app/build.gradle`
   - Verificar: `applicationId "com.umbral.vapefree"`

3. **Versión**:
   ```gradle
   versionCode 1
   versionName "1.0.0"
   ```

#### Configurar Icono (Opcional)
- En Android Studio: **File → New → Image Asset**
- O reemplazar manualmente en `app/src/main/res/mipmap-*/`

### 6. **GENERAR APK FIRMADA**

#### Método Recomendado (Android Studio)
1. **Build → Generate Signed Bundle/APK**
2. Seleccionar **APK**
3. **Create new keystore**:
   - Ubicación: `umbral-keystore.jks`
   - Password seguro
   - Alias: `umbral-key`
   - Validez: 25 años
4. Completar datos del certificado
5. Seleccionar **release**
6. **Finish**

#### Método Alternativo (Terminal)
```bash
# Generar keystore (solo primera vez)
keytool -genkey -v -keystore umbral-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias umbral-key

# Construir APK
cd android
./gradlew assembleRelease
```

### 7. **UBICACIÓN DEL APK FINAL**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 🔧 VERIFICACIONES IMPORTANTES

### Antes de Generar APK
```bash
# Verificar que todo está sincronizado
npm run build
npx cap sync android

# Verificar configuración
npx cap doctor
```

### Probar la App
```bash
# Ejecutar en emulador/dispositivo
npx cap run android
```

## 📱 INSTALACIÓN Y DISTRIBUCIÓN

### En tu Dispositivo
1. **Habilitar "Fuentes desconocidas"** en Configuración
2. **Transferir APK** al dispositivo
3. **Instalar** tocando el archivo

### Distribución
- **Directa**: Compartir APK por email/web
- **Play Store**: Subir a Google Play Console

## 🚨 SOLUCIÓN DE PROBLEMAS

### Error: "Command not found: npx"
```bash
# Instalar Node.js desde: https://nodejs.org
# Verificar instalación
node --version
npm --version
```

### Error: "Android SDK not found"
```bash
# Verificar variables de entorno
echo $ANDROID_HOME
# Reinstalar Android Studio si es necesario
```

### Error: "Gradle build failed"
```bash
# Limpiar proyecto
cd android
./gradlew clean
cd ..
npm run build
npx cap sync android
```

### APK no se instala
- Verificar que está firmada correctamente
- Comprobar permisos de "fuentes desconocidas"
- Desinstalar versión anterior si existe

## 📋 CHECKLIST COMPLETO

- [ ] Proyecto exportado y descomprimido
- [ ] Node.js y npm instalados
- [ ] Dependencias instaladas (`npm install`)
- [ ] Android Studio instalado y configurado
- [ ] Variables de entorno configuradas
- [ ] Proyecto construido (`npm run build`)
- [ ] Capacitor sincronizado (`npx cap sync android`)
- [ ] Proyecto abierto en Android Studio
- [ ] Información de la app configurada
- [ ] APK firmada generada
- [ ] APK probada en dispositivo
- [ ] Lista para distribución

## 💡 CONSEJOS FINALES

1. **Guarda el keystore** en lugar seguro (necesario para actualizaciones)
2. **Documenta las credenciales** del keystore
3. **Prueba siempre** en dispositivo real antes de distribuir
4. **Considera el tamaño** del APK (debería ser ~10-20MB)
5. **Verifica permisos** en AndroidManifest.xml

¡Tu app UMBRAL estará lista para ayudar a más personas a dejar el vapeo! 🚭✨

## 🎯 RESUMEN RÁPIDO

```bash
# 1. Preparar proyecto
npm install
npm run build
npx cap sync android

# 2. Abrir en Android Studio
npx cap open android

# 3. En Android Studio: Build → Generate Signed Bundle/APK
# 4. Seleccionar APK → Create keystore → Release → Finish
# 5. APK estará en: android/app/build/outputs/apk/release/
```