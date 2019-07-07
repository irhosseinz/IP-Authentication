# Welcome to IP Authentication 👋

## Challenge
Let's assume that you want to add ip authentication to a service on your server, you can handle this by opening specific port of your server to specific IPs, in this case you can run this app on your server and using its API, command it to unblock (& or block) an IP whenever you want.

❔️ For example you have a service running on your server (for example a proxy-server), and because you can't add ip authentication to it, so you can handle users access to that service using this APP

## Requirements
* You need a linux server with [CSF FIREWALL](https://configserver.com/cp/csf.html) Installed
* Close the service (that you want to add authentication to it) port on csf ([this way](#config-firewall-port))
* Install nodejs using NVM or ..
* put files on your server
* On Project folder run: `npm install`
* (Optional) For final usage you can install `pm2` that is used for nodejs process management
* (Optional) Modify index.js and change 2 parameters at the begining
* Open incoming calls to port 1034 (or whatever you set at previous step) on your firewall ([this way](#config-firewall-port))

## Usage
* Run index.js file as root. (you can do this by `pm2 start index.js` using pm2)
* Send a post request with data:`{"ip":users-ip,"user":user-id-of-that-ip}` to `http://YOUR-SERVER-IP:1034/api/CONFIGURED-SECRET/set_ip` (you need to replace __CONFIGURED-SECRET__ with one in __index.js__)


## CONFIG FIREWALL PORT
Open csf.conf file using any text editor.

	`/etc/csf/csf.conf`

Add or Remove the port you wish to open or close.

	# Allow incoming TCP ports
	TCP_IN = "20,443,465,21,22,587,993,25,53,80,110,143,995"
	# Allow outgoing TCP ports
	TCP_OUT = "20,21,443,587,22,25,80,110,43,53"

and restart CSF firewall for the changes to take into effect:
	`csf -r`


## Show your support
Give a ⭐️ if this project helped you!

❤️Donation -> Bitcoin:179CsAFEucLbQG6WDLTxVRX2ax8NBrxcGU


