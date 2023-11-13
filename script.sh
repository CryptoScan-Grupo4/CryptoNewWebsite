#!/bin/bash

sudo apt update
sudo apt upgrade -y

java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')

if [ $? -eq 0 ]; then

  dpkg --compare-versions "$java_version" lt "17" && update_java=true || update_java=false

  if [ "$update_java" = true ]; then

    echo "Java já está instalado: $java_version"

    echo "Atualizando o JDK para a versão 17..."
    sudo apt install openjdk-17-jre -y

  else
    sudo apt install openjdk-17-jre -y
  fi
fi

sudo apt install unzip

wget https://github.com/CryptoScan-Grupo4/CryptoJava/archive/main.zip
unzip main.zip

clear

cd CryptoJava-main
cd monitoramento-crypto-scan
cd monitoramento-crypto-scan
cd out
cd artifacts
cd monitoramento_crypto_scan_jar
java -jar "monitoramento-crypto-scan.jar"
