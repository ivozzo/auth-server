#!/bin/bash
#
# do not uncomment this - it will spoil the $? handling
#set -e

#ansi colors
#http://www.csc.uvic.ca/~sae/seng265/fall04/tips/s265s047-tips/bash-using-colors.html
blue='\e[0;34m'
red='\e[0;31m'
green='\e[0;32m' # '\e[1;32m' is too bright for white bg.
endColor='\e[0m'

#
# a colored message 
#   params:
#     1: l_color - the color of the message
#     2: l_msg - the message to display
#
color_msg() {
  local l_color="$1"
	local l_msg="$2"
	echo -e "${l_color}$l_msg${endColor}"
}

#
# error
#
#   show an error message and exit
#
#   params:
#     1: l_msg - the message to display
error() {
  local l_msg="$1"
	# use ansi red for error
  color_msg $red "Error: $l_msg" 1>&2
  exit 1
}

#
# show usage
#
usage() {
  echo "authorization server"
  echo "	see PLACEHOLDER"
  echo ""
  echo "options: "
  # -h|--help|usage|show this usage
  echo "       -h|--help             : show this usage"
  echo "   -start|--start            : start the server"
  exit 1
}

#
# start the node server
#
start(){
    color_msg $green "Installing node modules on ${pwd}..."
    npm install
    color_msg $green "Done"
    color_msg $blue "Starting server..."
    npm start
}

#
# Start of Docker Entrypoint
#
# start of script
# check arguments
option=""
# get the hostname
#hostname=`hostname`
hostname=$IMAGEHOSTNAME

while test $# -gt 0
do
  case $1 in
    # -h|--help|usage|show this usage
    -h|--help) 
      usage;;
      
    -start|--start) 
      start;;
      
    *) 
      params="$params $1"
  esac
  shift
done
