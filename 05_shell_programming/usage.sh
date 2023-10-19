#사용자별 리소스 사용량 측정
#!/bin/bash
echo "			%CPU	%MEM"
if [ -z $1 ];
then
	users=""
	cat /etc/passwd | awk -F ":" '{print $1}' | sort > users
	for user in $(<users)
	do
		ps u $(pgrep -u $user) | awk -v name=$user '{arr[1] += $3; arr[2] += $4} END {printf("%-20s	%.1f	%.1f\n"), name, arr[1], arr[2]}'
	done
else	
	ps u $(pgrep -u $1) | awk -v name=$1 '{arr[1] += $3; arr[2] += $4} END {printf("%-20s	%.1f	%.1f\n"), name, arr[1], arr[2]}'
fi
