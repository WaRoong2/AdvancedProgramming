# 좌석예약 스크립트
#!/bin/bash
filename="seats.txt"
newfilename="newseats.txt"
count=1
echo "   1 2 3 4 5 6 7 8"
while read line; do
	echo "$count: $line"
	let count+=1
done < $filename

echo -e "\n좌석을 예약하시겠습니까? (y|n)"
read ans

reserved=0
case $ans in
	[yY])
		while (( ! $reserved )); do
			echo -e "\n좌석을 선택해주세요. (x y)"
			read xy
			x=${xy%% *}
			y=${xy##* }	
			if [ -z $x ] || [ $x -lt 1 ] || [ $x -gt 3 ] ;	
			then
				echo "올바르지 않은 x값 입니다."
				continue
			elif [ -z $y ] || [ $y -lt 1 ] || [ $y -gt 8 ] ;
			then
				echo "올바르지 않은 y값 입니다."
				continue
			else
				echo -e "\n($x, $y) 좌석을 선택하였습니다."
				if [[ -a $newfilename ]] ;
				then
					rm $newfilename
				fi
				while read line; do
					x=`expr $x - 1`
					if (( $x == 0 ));
					then
						for row in $line
						do
							y=`expr $y - 1`
							if (( $y == 0 ));
							then
								if (( $row == 0 ));
								then
									echo -n "예약되었습니다."
									reserved=1
								else
									echo "해당 좌석은 이미 예약된 자리입니다."
									break
								fi
								echo -n "1 " >> $newfilename 
							else
								echo -n "$row " >> $newfilename
							fi
						done	
						echo " " >> $newfilename
					else
						echo $line >> $newfilename
					fi
				done < $filename
				echo " "
			fi
		done
		;;
	[nN])
		echo "좌석 예약을 취소합니다."
		;;
	*)
		echo "잘못된 입력입니다."
		;;
esac

if (( $reserved ));
then
	mv $newfilename $filename
elif [[ -a $newfilename ]];
then	
	rm $newfilename
fi

exit 0
