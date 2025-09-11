#!/bin/bash

echo "🔍 Verificando si 'psql' está disponible..."

if ! command -v psql &> /dev/null; then
  echo "⚠️ 'psql' no está instalado. Intentando instalarlo..."

  OS=$(uname -s)

  case "$OS" in
    Linux)
      if command -v apt &> /dev/null; then
        sudo apt update && sudo apt install -y postgresql-client
      elif command -v yum &> /dev/null; then
        sudo yum install -y postgresql
      else
        echo "❌ Gestor de paquetes no soportado. Instala 'psql' manualmente."
        exit 1
      fi
      ;;
    Darwin)
      if command -v brew &> /dev/null; then
        brew install libpq && brew link --force libpq
      else
        echo "❌ Homebrew no está instalado. Instala 'psql' manualmente."
        exit 1
      fi
      ;;
    *)
      echo "❌ Sistema operativo no soportado para instalación automática."
      exit 1
      ;;
  esac

  echo "✅ 'psql' instalado correctamente."
else
  echo "✅ 'psql' ya está disponible."
fi

echo "🚀 Ejecutando init.sql contra la base de datos..."

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Variable DATABASE_URL no definida. Exportala o colócala en .env.local."
  exit 1
fi

psql "$DATABASE_URL" -f ./sql/init.sql

if [ $? -ne 0 ]; then
  echo "❌ Error al ejecutar init.sql. Abortando."
  exit 1
fi

echo "🎯 SQL ejecutado correctamente. Listo para deploy."

echo "📦 Lanzando deploy a Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
  echo "❌ Error en el deploy de Vercel."
  exit 1
fi

echo "🎉 Deploy completado exitosamente."
