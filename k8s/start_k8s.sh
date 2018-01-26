#!/bin/sh --
OPTIND=1
env_file=''
dir=$PWD
while getopts "e:d:" opt; do
    case "$opt" in
    e)  env_file=$OPTARG
        ;;
    d)  dir=$OPTARG
        ;;
    esac
done

if [ ! -z "$env_file" ]; then
    if [ -e "$env_file" ]; then
	echo "Sourcing $env_file"
	. $env_file
    else
	echo "Env file $env_file not found" 1>&2
	exit 1
    fi
fi

if [ ! -e "$dir" ]; then
    echo "Directory $dir not found" 1>&2
    exit 2
fi

for file in $dir/*.yaml; do
    tmpfile=/tmp/$(basename $file)
    echo "Processing $file to $tmpfile"   
    envsubst < $file > $tmpfile
    kubectl create -f $tmpfile
    #rm -f $tmpfile
done
