#!/bin/bash

if [[ -z $1 ]];
then
	echo "Usage: ./script1.sh [big number]"
	exit 0
fi

in=$1
i=${in%%.*}
if [[ $in == *.* ]];
then
	d=${in##*.}
else
	d=""
fi

result=""
while (( `expr $i / 1000` != 0 )) 
do	
	result="`expr $i % 1000`$result"
	if ((`expr $i / 1000` != 0));
	then
		result=",$result"
	fi
	i=`expr $i / 1000`
done
result="$i$result"

if [[ -z $d ]];
then
	result="$result"
else
	result="$result.$d"
fi
echo $result

exit 0


