#!/bin/bash
function chkFilesInDir # $1=absolute_path
{
	files=$(ls $1 | awk -F " " '{print $1}')
	for file in $files
	do
		absolute_path=$(readlink -f "$1/$file")
		if [[ -d $absolute_path ]];
		then
			chkFilesInDir $absolute_path
		else
			chkIntegrity $absolute_path
		fi
	done
	return 0
}

function chkIntegrity # $1=absolute_path
{
	curHash=$(cat $(cat config) | grep $1 | grep -v "[[:graph:]]$1\|$1[[:graph:]]" | awk -F " " '{print $1}')
	newHash=$(echo $(sha1sum $1) | awk -F " " '{print $1}')
	if [[ -z $curHash ]];
	then
		echo -e "\n[NEW] $1 ($newHash)"
		echo "$newHash $1" >> $(cat config)
	else if [[ $curHash != $newHash ]];
		then
		echo -e "\n[WARN] $1 (old: $curHash, new: $newHash)"
		echo -e "\n=================================================="
		echo -e "\n$1 is changed."
		echo -e "\nDo you want to update the hash of $1 (y|n)?"
		read answer
		if [[ $answer = [yY] ]];
		then
			sed -i "s/$curHash/$newHash/g" "$(cat config)"
			fi
		echo -e "\n=================================================="
		fi
	fi
	return 0
}

if [[ $# == 0 ]];
then
	echo "Usage: $0 [directory]"
	exit 0
else if [[ ! -e $1 ]];
	then
		echo "$1 does not exist"
		exit 0
	fi
fi

if [[ ! -e "config" || -z $(cat config) ]];
then
	echo "config does not exist"
	exit 0
fi

absolute_path=$(readlink -f "$1")
if [[ -d $1 ]];
then
	chkFilesInDir $absolute_path
else
	chkIntegrity $absolute_path
fi

exit 1