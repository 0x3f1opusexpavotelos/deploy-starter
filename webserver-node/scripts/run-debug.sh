


if ["$SUPPORT_NPM_INSPECT" == "1"]; then
    node --inspect=0.0.0.0 server/server.js
else 
    node --debug=0.0.0.0 server/server.js
fi