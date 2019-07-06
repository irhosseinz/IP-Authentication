<h1 align="center">Welcome to Firewall-Rules-Maker 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

## Challenge
Let's assume that you want to open specific port of your server to specific Users (of your project) (dynamically), in this case you can run this app on your server and using its API command it to unblock an Ip whenever you want.

❔️ For example you have a service running on your server (for example a proxy-serve), and because you can't add ip authentication to it, so you can handle users access to that service using this APP

## Requirements
<ul>
<li>You need a linux server with <a target="_blank" href="https://configserver.com/cp/csf.html">CSF FIREWALL</a> Installed.</li>
<li>Install nodejs using NVM or ..</li>
<li>put files on your server</li>
<li>On Project folder run: `npm install`</li>
<li>(Optional) For final usage you can install `pm2` that is used for nodejs process management</li>
<li>(Optional) Modify index.js and change 2 parameters at the begining</li>
<li>Open incoming calls to port 1034 (or whatever you set at previous step) on your firewall (<a href="#open-firewall-port">this way</a>)</li>
</ul>

## Usage
<ul>
<li>Run index.js file as root. (you can do this by `pm2 start index.js` using pm2)</li>
<li>Send a post request with data:`{"ip":users-ip,"user":user-id-of-that-ip}` to `http://YOUR-SERVER-IP:1034/api/CONFIGURED-SECRET/set_ip`</li>
</ul>


## OPEN FIREWALL PORT
Open csf.conf file using any text editor.

	`/etc/csf/csf.conf`

Add the port you wish to open.

	# Allow incoming TCP ports
	TCP_IN = "20,443,465,21,22,587,993,25,53,80,110,143,995"
	# Allow outgoing TCP ports
	TCP_OUT = "20,21,443,587,22,25,80,110,43,53"

and restart CSF firewall for the changes to take into effect:
	`csf -r`


## Show your support

Give a ⭐️ if this project helped you!


