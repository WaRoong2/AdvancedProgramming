#!/bin/bash
if [ -z $* ]
then
	echo "no arguments found"
	exit
fi
for i in {1..9}
do
	echo "$1 * $i = `expr $1 \* $i`"
done
