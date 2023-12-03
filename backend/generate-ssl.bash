#!/usr/bin/env bash

mkdir ./ssl

# Set the TLD domain we want to use
BASE_DOMAIN="server"

# Days for the cert to live
DAYS=1095

# A blank passphrase
PASSPHRASE=""

# Generated configuration file
CONFIG_FILE="config.txt"

cat > ./ssl/$CONFIG_FILE <<-EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
x509_extensions = v3_req
distinguished_name = dn

[dn]
C = CA
ST = BC
L = Vancouver
O = Example Corp
OU = Testing Domain
emailAddress = webmaster@$BASE_DOMAIN
CN = $BASE_DOMAIN

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = *.$BASE_DOMAIN
DNS.2 = $BASE_DOMAIN
EOF


# The file name can be anything
FILE_NAME="$BASE_DOMAIN"

# Remove previous keys
echo "Removing existing certs like ./ssl/$FILE_NAME.*"
chmod 770 ./ssl/$FILE_NAME.*
rm ./ssl/$FILE_NAME.*

echo "Generating certs for $BASE_DOMAIN"

# Generate our Private Key, CSR and Certificate
# Use SHA-2 as SHA-1 is unsupported from Jan 1, 2017

openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout ./ssl/"$FILE_NAME.key" -days $DAYS -out ./ssl/"$FILE_NAME.crt" -passin pass:$PASSPHRASE -config ./ssl/"$CONFIG_FILE"

# OPTIONAL - write an info to see the details of the generated crt
openssl x509 -noout -fingerprint -text < ./ssl/"$FILE_NAME.crt" > ./ssl/"$FILE_NAME.info"

# Protect the key
chmod 400 ./ssl/"$FILE_NAME.key"
