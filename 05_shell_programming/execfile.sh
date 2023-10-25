# 실행 권한이 있는 파일 이름 출력
#!/bin/bash
if [ -z $1 ];
then
	echo "no input"
	exit	
fi
dir="/home/ubuntu/05_shell_programming/"
if [ $1 == "-r"	];
then
	dir=$dir$2
	find $dir -perm 775
else
	dir=$dir$1
	find $dir -perm 775 | sort -n
fi
