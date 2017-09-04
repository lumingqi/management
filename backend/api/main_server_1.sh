#!/bin/sh
echo 'connect ssh' 
##ssh root@120.27.144.69

auto_login_ssh(){
	expect -c "set timeout -1;
	spawn -noecho ssh -o StrictHostKeyChecking=no $2; 
	expect *assword:*;
	send "$1\\r";
	interact;";
}

auto_login_ssh YeKR2\?g\# root@114.55.7.22
